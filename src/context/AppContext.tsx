import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { initialDummyData, type BusinessOwnerState } from '../data/initialDummyData';

const BACKEND_URL = 'http://localhost:5000';

interface AppContextType {
  user: { id: string; email: string } | null;
  state: BusinessOwnerState;
  loading: boolean;
  isDemo: boolean;
  login: (emailOrPhone: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  verifyOtp: (phone: string, code: string) => Promise<boolean>;
  logout: () => void;
  updateState: (newState: Partial<BusinessOwnerState> | ((prev: BusinessOwnerState) => BusinessOwnerState)) => Promise<void>;
  resetToDefault: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [state, setState] = useState<BusinessOwnerState>(initialDummyData);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(true);

  // Helper for authenticated fetch headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('business_owner_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  };

  // Verify token on reload
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('business_owner_token');
      if (!token) {
        setLoading(false);
        loadLocalCache();
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser({ id: data.user.sub, email: data.user.email });
          setIsDemo(false);
          await fetchStoreDataFromBackend(token);
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (err) {
        console.warn('Backend server unreachable, falling back to cached demo mode.');
        setIsDemo(true);
        loadLocalCache();
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const loadLocalCache = () => {
    const cached = localStorage.getItem('business_owner_demo_state');
    if (cached) {
      try {
        setState(JSON.parse(cached));
      } catch (e) {
        setState(initialDummyData);
      }
    } else {
      setState(initialDummyData);
    }
  };

  // Fetch full store data from database via backend
  const fetchStoreDataFromBackend = async (token: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/owner/store`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.state) {
          setState(data.state);
        }
      }
    } catch (err) {
      console.error('Failed to load store data from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const login = async (emailOrPhone: string, password: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('business_owner_token', data.token);
        setUser({ id: data.user.id, email: data.user.email });
        setIsDemo(false);
        await fetchStoreDataFromBackend(data.token);
        return true;
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Invalid credentials');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const signup = async (name: string, email: string, phone: string, password: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          firstName: name.split(' ')[0] || 'Store',
          lastName: name.split(' ')[1] || 'Owner',
          phone
        })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('business_owner_token', data.token);
        setUser({ id: data.user.id, email: data.user.email });
        setIsDemo(false);
        
        // Initialize store details via PUT after auth success
        await fetch(`${BACKEND_URL}/api/owner/store`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
          },
          body: JSON.stringify({
            name,
            type: 'Restaurant',
            cuisine: 'Indian',
            address: 'Enter store address',
            contactNumber: phone
          })
        });

        await fetchStoreDataFromBackend(data.token);
        return true;
      }
    } catch (err) {
      console.warn('Backend unreachable. Registering in simulated demo mode.');
    }

    // Simulated signup fallback
    const dummyUser = { id: `simulated-${email.replace('@', '-')}`, email };
    setUser(dummyUser);
    setIsDemo(true);
    const newInitial = {
      ...initialDummyData,
      storeInfo: {
        ...initialDummyData.storeInfo,
        name: name,
        contactNumber: phone,
      }
    };
    setState(newInitial);
    localStorage.setItem('business_owner_demo_state', JSON.stringify(newInitial));
    setLoading(false);
    return true;
  };

  // OTP Verification
  const verifyOtp = async (_phone: string, code: string) => {
    if (code.length === 6) {
      return true;
    }
    return false;
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setIsDemo(true);
    setState(initialDummyData);
    localStorage.removeItem('business_owner_token');
    localStorage.removeItem('business_owner_demo_state');
  };

  // Sync state modifications back to API
  const updateState = async (
    newState: Partial<BusinessOwnerState> | ((prev: BusinessOwnerState) => BusinessOwnerState)
  ) => {
    setState((prev) => {
      const resolved = typeof newState === 'function' ? newState(prev) : { ...prev, ...newState };
      
      // Save local cache for offline backups
      localStorage.setItem('business_owner_demo_state', JSON.stringify(resolved));

      // If connected to a real backend session, write changes incrementally
      if (user && !isDemo) {
        // Find which areas changed and make appropriate PUT requests to backend
        
        // 1. Check Store Info changes
        if (JSON.stringify(resolved.storeInfo) !== JSON.stringify(prev.storeInfo)) {
          fetch(`${BACKEND_URL}/api/owner/store`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(resolved.storeInfo)
          });
        }
        
        // 2. Check Timings changes
        if (JSON.stringify(resolved.storeTimings) !== JSON.stringify(prev.storeTimings)) {
          fetch(`${BACKEND_URL}/api/owner/timings`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(resolved.storeTimings)
          });
        }

        // 3. Check Location changes
        if (JSON.stringify(resolved.storeLocation) !== JSON.stringify(prev.storeLocation)) {
          fetch(`${BACKEND_URL}/api/owner/location`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(resolved.storeLocation)
          });
        }

        // 4. Check Bank details
        if (JSON.stringify(resolved.bankDetails) !== JSON.stringify(prev.bankDetails)) {
          fetch(`${BACKEND_URL}/api/owner/bank`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(resolved.bankDetails)
          });
        }

        // 5. Check Printer settings
        if (JSON.stringify(resolved.printerSettings) !== JSON.stringify(prev.printerSettings)) {
          fetch(`${BACKEND_URL}/api/owner/printer`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(resolved.printerSettings)
          });
        }

        // 6. Check App preferences
        if (JSON.stringify(resolved.appPreferences) !== JSON.stringify(prev.appPreferences)) {
          fetch(`${BACKEND_URL}/api/owner/preferences`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(resolved.appPreferences)
          });
        }

        // 7. Check menu item availability or updates
        if (JSON.stringify(resolved.menu) !== JSON.stringify(prev.menu)) {
          // Find updated item
          resolved.menu.forEach(item => {
            const old = prev.menu.find(m => m.id === item.id);
            if (old && JSON.stringify(item) !== JSON.stringify(old)) {
              // Update availability/bestseller
              fetch(`${BACKEND_URL}/api/owner/menu/${item.id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                  available: item.isAvailable,
                  isBestseller: item.isBestseller,
                  price: item.price,
                  name: item.name,
                  description: item.description
                })
              });
            }
          });
          
          // Check for additions
          if (resolved.menu.length > prev.menu.length) {
            const added = resolved.menu.find(m => !prev.menu.some(o => o.id === m.id));
            if (added && added.id.startsWith('item-')) {
              fetch(`${BACKEND_URL}/api/owner/menu`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                  name: added.name,
                  price: added.price,
                  category: added.category,
                  description: added.description,
                  available: added.isAvailable
                })
              }).then(() => fetchStoreDataFromBackend(localStorage.getItem('business_owner_token') || ''));
            }
          }
        }

        // 8. Check category additions
        if (resolved.categories.length > prev.categories.length) {
          const added = resolved.categories.find(c => !prev.categories.some(o => o.id === c.id));
          if (added && added.id.startsWith('cat-')) {
            fetch(`${BACKEND_URL}/api/owner/categories`, {
              method: 'POST',
              headers: getAuthHeaders(),
              body: JSON.stringify({
                name: added.name,
                iconName: added.iconName,
                displayOrder: added.displayOrder
              })
            }).then(() => fetchStoreDataFromBackend(localStorage.getItem('business_owner_token') || ''));
          }
        }

        // 9. Check Order updates (accept/reject/prepare/ready/complete status transitions)
        if (JSON.stringify(resolved.orders) !== JSON.stringify(prev.orders)) {
          resolved.orders.forEach(order => {
            const old = prev.orders.find(o => o.id === order.id);
            if (old && order.status !== old.status) {
              fetch(`${BACKEND_URL}/api/owner/orders/${order.id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({ status: order.status })
              });
            }
          });
        }

        // 10. Check Staff additions
        if (resolved.staff.length > prev.staff.length) {
          const added = resolved.staff.find(s => !prev.staff.some(o => o.id === s.id));
          if (added && added.id.startsWith('staff-')) {
            fetch(`${BACKEND_URL}/api/owner/staff`, {
              method: 'POST',
              headers: getAuthHeaders(),
              body: JSON.stringify({
                name: added.name,
                role: added.role,
                phone: added.phone,
                email: added.email,
                permissions: added.permissions
              })
            }).then(() => fetchStoreDataFromBackend(localStorage.getItem('business_owner_token') || ''));
          }
        }

        // 11. Check Staff deletions
        if (resolved.staff.length < prev.staff.length) {
          const deleted = prev.staff.find(s => !resolved.staff.some(o => o.id === s.id));
          if (deleted && !deleted.id.startsWith('staff-')) {
            fetch(`${BACKEND_URL}/api/owner/staff/${deleted.id}`, {
              method: 'DELETE',
              headers: getAuthHeaders()
            });
          }
        }

        // 12. Check notification reading
        if (JSON.stringify(resolved.notifications) !== JSON.stringify(prev.notifications)) {
          const justRead = resolved.notifications.some((n, idx) => !n.isRead && prev.notifications[idx]?.isRead === false);
          if (justRead) {
            fetch(`${BACKEND_URL}/api/owner/notifications/read-all`, {
              method: 'PUT',
              headers: getAuthHeaders()
            });
          }
        }
      }

      return resolved;
    });
  };

  // Reset to default
  const resetToDefault = async () => {
    setState(initialDummyData);
    localStorage.setItem('business_owner_demo_state', JSON.stringify(initialDummyData));
    
    if (user && !isDemo) {
      // For testing, we can trigger simulated orders or categories reloading from the backend
      try {
        await fetch(`${BACKEND_URL}/api/owner/store`, {
          method: 'GET', // reloading state repopulates database tables since the tables will get re-initialized on backend getStoreData
          headers: getAuthHeaders()
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        state,
        loading,
        isDemo,
        login,
        signup,
        verifyOtp,
        logout,
        updateState,
        resetToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
