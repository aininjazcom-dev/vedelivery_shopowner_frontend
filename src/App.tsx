import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Outlet, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { Home, ShoppingBag, Utensils, TrendingUp, Settings, LogOut, Bell, Menu, X, Terminal, Database, RefreshCw } from 'lucide-react';

// Import Screens
import { SplashScreen } from './screens/01_SplashScreen';
import { LoginScreen } from './screens/02_LoginScreen';
import { SignUpScreen } from './screens/03_SignUpScreen';
import { OTPVerificationScreen } from './screens/04_OTPVerificationScreen';
import { StoreSetupScreen } from './screens/05_StoreSetupScreen';
import { StoreTimingsScreen } from './screens/06_StoreTimingsScreen';
import { StoreLocationScreen } from './screens/07_StoreLocationScreen';
import { DashboardScreen } from './screens/08_DashboardScreen';
import { OrdersListScreen } from './screens/09_OrdersListScreen';
import { OrderDetailsNewScreen } from './screens/10_OrderDetailsNewScreen';
import { PreparingOrderScreen } from './screens/11_PreparingOrderScreen';
import { OrderReadyScreen } from './screens/12_OrderReadyScreen';
import { OrderCompletedScreen } from './screens/13_OrderCompletedScreen';
import { MenuListScreen } from './screens/14_MenuListScreen';
import { AddMenuItemScreen } from './screens/15_AddMenuItemScreen';
import { MenuItemDetailScreen } from './screens/16_MenuItemDetailScreen';
import { EarningsOverviewScreen } from './screens/17_EarningsOverviewScreen';
import { EarningsHistoryScreen } from './screens/18_EarningsHistoryScreen';
import { ReviewsScreen } from './screens/19_ReviewsScreen';
import { CustomersScreen } from './screens/20_CustomersScreen';
import { ReportsScreen } from './screens/21_ReportsScreen';
import { StoreSettingsScreen } from './screens/22_StoreSettingsScreen';
import { BankDetailsScreen } from './screens/23_BankDetailsScreen';
import { NotificationsScreen } from './screens/24_NotificationsScreen';
import { PrinterSettingsScreen } from './screens/25_PrinterSettingsScreen';
import { ManageStaffScreen } from './screens/26_ManageStaffScreen';
import { StaffDetailScreen } from './screens/27_StaffDetailScreen';
import { AddStaffMemberScreen } from './screens/28_AddStaffMemberScreen';
import { CategoriesScreen } from './screens/29_CategoriesScreen';
import { AddCategoryScreen } from './screens/30_AddCategoryScreen';
import { AppPreferencesScreen } from './screens/31_AppPreferencesScreen';
import { StoreInformationScreen } from './screens/32_StoreInformationScreen';
import { EditBankDetailsScreen } from './screens/33_EditBankDetailsScreen';
import { SubscriptionPlanScreen } from './screens/34_SubscriptionPlanScreen';
import { HelpSupportScreen } from './screens/35_HelpSupportScreen';
import { LogoutConfirmationScreen } from './screens/36_LogoutConfirmationScreen';

// Screen ID to Path Configuration Map
const SCREEN_ID_TO_PATH: Record<number, string> = {
  1: '/',
  2: '/login',
  3: '/signup',
  4: '/verify-otp',
  5: '/store-setup',
  6: '/store-timings',
  7: '/store-location',
  8: '/dashboard',
  9: '/orders',
  10: '/orders/details',
  11: '/orders/preparing',
  12: '/orders/ready',
  13: '/orders/completed',
  14: '/menu',
  15: '/menu/add',
  16: '/menu/detail',
  17: '/earnings',
  18: '/earnings/history',
  19: '/reviews',
  20: '/customers',
  21: '/reports',
  22: '/settings',
  23: '/settings/bank',
  24: '/notifications',
  25: '/settings/printer',
  26: '/settings/staff',
  27: '/settings/staff/detail',
  28: '/settings/staff/add',
  29: '/menu/categories',
  30: '/menu/categories/add',
  31: '/settings/preferences',
  32: '/settings/store-info',
  33: '/settings/bank/edit',
  34: '/settings/subscription',
  35: '/settings/support',
  36: '/logout'
};

function App() {
  const { loading, state, updateState, resetToDefault, user } = useApp();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Navigation parameters state
  const [selectedOrderId, setSelectedOrderId] = useState<string>('#1258');
  const [selectedItemId, setSelectedItemId] = useState<string>('item-1');
  const [selectedStaffId, setSelectedStaffId] = useState<string>('staff-1');
  const [phoneData, setPhoneData] = useState({ phone: '+91 98765 43210', name: "John's Kitchen" });

  // Refs to handle instant value access during navigation and avoid stale closures
  const latestSelectedOrderId = useRef(selectedOrderId);
  const latestSelectedItemId = useRef(selectedItemId);
  const latestSelectedStaffId = useRef(selectedStaffId);
  const latestPhoneData = useRef(phoneData);

  // Sync state values with refs
  useEffect(() => { latestSelectedOrderId.current = selectedOrderId; }, [selectedOrderId]);
  useEffect(() => { latestSelectedItemId.current = selectedItemId; }, [selectedItemId]);
  useEffect(() => { latestSelectedStaffId.current = selectedStaffId; }, [selectedStaffId]);
  useEffect(() => { latestPhoneData.current = phoneData; }, [phoneData]);

  // Mobile sidebar menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Dev drawer toggle
  const [isDevDrawerOpen, setIsDevDrawerOpen] = useState(false);

  // Auto route to Dashboard if user is logged in and on onboarding/auth pages
  useEffect(() => {
    if (user && (pathname === '/' || pathname === '/login' || pathname === '/signup' || pathname === '/verify-otp')) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, pathname, navigate]);

  // Unified parameter setters
  const handleSetSelectedOrderId = (id: string) => {
    setSelectedOrderId(id);
    latestSelectedOrderId.current = id;
  };
  const handleSetSelectedItemId = (id: string) => {
    setSelectedItemId(id);
    latestSelectedItemId.current = id;
  };
  const handleSetSelectedStaffId = (id: string) => {
    setSelectedStaffId(id);
    latestSelectedStaffId.current = id;
  };
  const handleSetPhoneData = (data: typeof phoneData) => {
    setPhoneData(data);
    latestPhoneData.current = data;
  };

  // Intercept onNext callback and route dynamically
  const handleNext = (nextId: number) => {
    if (nextId === 10) {
      navigate(`/orders/details/${latestSelectedOrderId.current}`);
    } else if (nextId === 11) {
      navigate(`/orders/preparing/${latestSelectedOrderId.current}`);
    } else if (nextId === 12) {
      navigate(`/orders/ready/${latestSelectedOrderId.current}`);
    } else if (nextId === 13) {
      navigate(`/orders/completed/${latestSelectedOrderId.current}`);
    } else if (nextId === 16) {
      navigate(`/menu/detail/${latestSelectedItemId.current}`);
    } else if (nextId === 27) {
      navigate(`/settings/staff/detail/${latestSelectedStaffId.current}`);
    } else {
      const path = SCREEN_ID_TO_PATH[nextId];
      if (path) {
        navigate(path);
      }
    }
  };

  const handleSimulateOrder = () => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: `#${orderNum}`,
      customerName: "Venkatesh Prasad",
      customerPhone: "+91 94488 12345",
      deliveryAddress: "456, 17th Cross, HSR Layout Sector 3, Bangalore 560102",
      distance: "2.1 km away",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [
        { name: "Chicken Biryani", quantity: 2, price: 220 },
        { name: "Gulab Jamun", quantity: 1, price: 80 }
      ],
      subtotal: 520,
      deliveryFee: 30,
      taxAmount: 26,
      totalAmount: 520,
      status: 'new' as const,
      paymentMethod: 'digital_wallet',
      paymentStatus: 'completed' as const
    };

    updateState(prev => {
      const updatedOrders = [newOrder, ...prev.orders];
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: "New order received",
        message: `#${orderNum}`,
        time: "Just now",
        isRead: false,
        type: 'order' as const
      };
      return {
        ...prev,
        orders: updatedOrders,
        notifications: [newNotif, ...prev.notifications]
      };
    });

    handleSetSelectedOrderId(newOrder.id);
    navigate(`/orders/details/${newOrder.id}`);
    setIsDevDrawerOpen(false);
  };

  const getUnreadNotificationsCount = () => {
    return state.notifications.filter(n => !n.isRead).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Loading App State...</span>
        </div>
      </div>
    );
  }

  // Wrapper routes mapping url params to props
  const LoginRoute = () => <LoginScreen onNext={handleNext} setPhoneData={handleSetPhoneData} />;
  const SignUpRoute = () => <SignUpScreen onNext={handleNext} setPhoneData={handleSetPhoneData} />;
  const OTPVerificationRoute = () => <OTPVerificationScreen onNext={handleNext} phoneData={phoneData} />;

  const DashboardRoute = () => <DashboardScreen onNext={handleNext} setSelectedOrderId={handleSetSelectedOrderId} />;
  const OrdersListRoute = () => <OrdersListScreen onNext={handleNext} setSelectedOrderId={handleSetSelectedOrderId} />;
  const MenuListRoute = () => <MenuListScreen onNext={handleNext} setSelectedItemId={handleSetSelectedItemId} />;
  const ManageStaffRoute = () => <ManageStaffScreen onNext={handleNext} setSelectedStaffId={handleSetSelectedStaffId} />;

  const OrderDetailsNewRoute = () => {
    const { orderId } = useParams();
    useEffect(() => { if (orderId) handleSetSelectedOrderId(orderId); }, [orderId]);
    return <OrderDetailsNewScreen onNext={handleNext} selectedOrderId={orderId || selectedOrderId} />;
  };

  const PreparingOrderRoute = () => {
    const { orderId } = useParams();
    useEffect(() => { if (orderId) handleSetSelectedOrderId(orderId); }, [orderId]);
    return <PreparingOrderScreen onNext={handleNext} selectedOrderId={orderId || selectedOrderId} />;
  };

  const OrderReadyRoute = () => {
    const { orderId } = useParams();
    useEffect(() => { if (orderId) handleSetSelectedOrderId(orderId); }, [orderId]);
    return <OrderReadyScreen onNext={handleNext} selectedOrderId={orderId || selectedOrderId} />;
  };

  const OrderCompletedRoute = () => {
    const { orderId } = useParams();
    useEffect(() => { if (orderId) handleSetSelectedOrderId(orderId); }, [orderId]);
    return <OrderCompletedScreen onNext={handleNext} selectedOrderId={orderId || selectedOrderId} />;
  };

  const MenuItemDetailRoute = () => {
    const { itemId } = useParams();
    useEffect(() => { if (itemId) handleSetSelectedItemId(itemId); }, [itemId]);
    return <MenuItemDetailScreen onNext={handleNext} selectedItemId={itemId || selectedItemId} />;
  };

  const StaffDetailRoute = () => {
    const { staffId } = useParams();
    useEffect(() => { if (staffId) handleSetSelectedStaffId(staffId); }, [staffId]);
    return <StaffDetailScreen onNext={handleNext} selectedStaffId={staffId || selectedStaffId} />;
  };

  // Auth Layout (mockup container)
  const AuthLayout = () => (
    <div className="h-screen w-screen bg-slate-100 flex items-center justify-center p-0 md:p-6 overflow-hidden">
      <div className="w-full h-full md:w-[410px] md:h-[840px] md:max-h-[90vh] md:rounded-[40px] md:border-[8px] md:border-slate-800 md:shadow-2xl overflow-hidden flex flex-col bg-white ring-1 ring-slate-700/50">
        <Outlet />
      </div>
    </div>
  );

  // Dashboard Layout (main web application container)
  const DashboardLayout = () => {
    const isDashboardActive = pathname === '/dashboard';
    const isOrdersActive = pathname.startsWith('/orders');
    const isMenuActive = pathname.startsWith('/menu');
    const isEarningsActive = pathname.startsWith('/earnings') || pathname === '/reviews' || pathname === '/customers' || pathname === '/reports';
    const isSettingsActive = pathname.startsWith('/settings') || pathname === '/notifications' || pathname === '/logout';

    return (
      <div className="h-screen w-screen flex bg-slate-50 overflow-hidden font-sans relative">
        
        {/* 1. Desktop Sidebar Navigation */}
        <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 text-slate-200 flex-col justify-between shrink-0">
          <div className="flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center gap-3 select-none">
              <div className="w-9 h-9 bg-brand-orange rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/10">
                <span className="text-white text-base">🍲</span>
              </div>
              <div>
                <h1 className="text-sm font-black text-white font-sans tracking-tight">{state.storeInfo.name || "My Store"}</h1>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Shop Owner App</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 flex flex-col gap-1.5">
              <button
                onClick={() => navigate('/dashboard')}
                className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition ${
                  isDashboardActive ? 'bg-brand-orange text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Home className="w-4 h-4" />
                Dashboard
              </button>

              <button
                onClick={() => navigate('/orders')}
                className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-xs font-bold transition ${
                  isOrdersActive ? 'bg-brand-orange text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4" />
                  Orders
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-extrabold px-2 py-0.5 rounded-full">
                  {state.orders.filter(o => o.status === 'new').length}
                </span>
              </button>

              <button
                onClick={() => navigate('/menu')}
                className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition ${
                  isMenuActive ? 'bg-brand-orange text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Utensils className="w-4 h-4" />
                Menu Items
              </button>

              <button
                onClick={() => navigate('/earnings')}
                className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition ${
                  isEarningsActive ? 'bg-brand-orange text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Earnings
              </button>

              <button
                onClick={() => navigate('/settings')}
                className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition ${
                  isSettingsActive ? 'bg-brand-orange text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </nav>
          </div>

          {/* Footer Logout */}
          <div className="p-4 border-t border-slate-800">
            <button
              onClick={() => navigate('/logout')}
              className="w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-950/20 transition text-left"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* 2. Main Page Layout (Responsive Area) */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
          
          {/* Desktop Top Header Bar */}
          <header className="hidden md:flex h-16 bg-white border-b border-slate-100 items-center justify-between px-6 shrink-0 z-10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Store:</span>
              <span className="text-xs font-extrabold text-slate-800 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1">
                {state.storeInfo.name}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button
                onClick={() => navigate('/notifications')}
                className="relative p-2 hover:bg-slate-50 rounded-full transition"
              >
                <Bell className="w-5 h-5 text-slate-500" />
                {getUnreadNotificationsCount() > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand-orange text-white text-[8px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                    {getUnreadNotificationsCount()}
                  </span>
                )}
              </button>

              {/* Profile */}
              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-100 select-none">
                <div className="w-8 h-8 bg-slate-100 text-xs rounded-full flex items-center justify-center shrink-0 font-bold border border-slate-200">👤</div>
                <div>
                  <span className="text-2xs font-extrabold text-slate-700 block">Owner Panel</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{user?.email || 'owner@vedelivery.com'}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Header Bar */}
          <header className="flex md:hidden h-14 bg-white border-b border-slate-100 items-center justify-between px-4 shrink-0 z-10 select-none">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1 hover:bg-slate-50 rounded"
              >
                <Menu className="w-5 h-5 text-slate-700" />
              </button>
              <span className="text-sm font-bold text-slate-800 leading-tight">{state.storeInfo.name || "My Store"}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/notifications')}
                className="relative p-1 hover:bg-slate-50 rounded-full"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                {getUnreadNotificationsCount() > 0 && (
                  <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-brand-orange text-white text-[8px] font-black rounded-full flex items-center justify-center ring-1 ring-white">
                    {getUnreadNotificationsCount()}
                  </span>
                )}
              </button>
            </div>
          </header>

          {/* Mobile Side Drawer overlay */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 flex select-none">
              {/* Backdrop */}
              <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-slate-950/40 backdrop-blur-3xs"></div>
              {/* Drawer */}
              <div className="relative w-64 bg-slate-900 h-full flex flex-col justify-between p-5 text-slate-200">
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <h2 className="text-sm font-black text-white">{state.storeInfo.name || "My Store"}</h2>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="flex flex-col gap-2">
                    <button
                      onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                    >
                      <Home className="w-4 h-4" /> Dashboard
                    </button>
                    <button
                      onClick={() => { navigate('/orders'); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                    >
                      <ShoppingBag className="w-4 h-4" /> Orders
                    </button>
                    <button
                      onClick={() => { navigate('/menu'); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                    >
                      <Utensils className="w-4 h-4" /> Menu Items
                    </button>
                    <button
                      onClick={() => { navigate('/earnings'); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                    >
                      <TrendingUp className="w-4 h-4" /> Earnings
                    </button>
                    <button
                      onClick={() => { navigate('/settings'); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                  </nav>
                </div>

                <button
                  onClick={() => { navigate('/logout'); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-950/20 text-left"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          )}

          {/* Screen Content Wrapper */}
          <div className="flex-1 overflow-hidden relative flex flex-col">
            <div className="flex-1 flex justify-center overflow-hidden">
              <div className="w-full md:max-w-2xl bg-white md:shadow-sm md:m-6 md:rounded-2xl border-x md:border border-slate-100 overflow-hidden flex flex-col">
                <Outlet />
              </div>
            </div>
          </div>

        </div>

        {/* 3. Floating Developer Control Trigger Button */}
        <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40">
          <button
            onClick={() => setIsDevDrawerOpen(!isDevDrawerOpen)}
            className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg border border-slate-700/50 active:scale-95 transition"
          >
            <Terminal className="w-5 h-5 text-brand-orange" />
          </button>
        </div>

        {/* Developer Control popout dialog */}
        {isDevDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
            <div onClick={() => setIsDevDrawerOpen(false)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-3xs"></div>
            
            <div className="relative w-80 bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-brand-orange" /> Dev control triggers
                </h2>
                <button onClick={() => setIsDevDrawerOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="text-2xs font-semibold text-slate-500 uppercase tracking-widest pl-0.5">Database</div>
                
                <div className="flex items-center gap-2 text-2xs bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <Database className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-slate-300">Supabase Connected:</span>
                  <span className="font-semibold text-emerald-400 ml-auto">YES (Relational tables)</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={async () => { await resetToDefault(); setIsDevDrawerOpen(false); }}
                    className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-2xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700/50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset Tables Data
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
                <div className="text-2xs font-semibold text-slate-500 uppercase tracking-widest pl-0.5">Simulation</div>
                <button
                  onClick={handleSimulateOrder}
                  className="w-full py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white rounded-lg text-xs font-bold active:scale-95 transition shadow-sm"
                >
                  Simulate Incoming Order
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  };

  return (
    <Routes>
      {/* Onboarding & Auth Layout (phone mock frame) */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<SplashScreen onNext={handleNext} />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/signup" element={<SignUpRoute />} />
        <Route path="/verify-otp" element={<OTPVerificationRoute />} />
        <Route path="/store-setup" element={<StoreSetupScreen onNext={handleNext} />} />
        <Route path="/store-timings" element={<StoreTimingsScreen onNext={handleNext} />} />
        <Route path="/store-location" element={<StoreLocationScreen onNext={handleNext} />} />
      </Route>

      {/* Main App Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardRoute />} />
        <Route path="/orders" element={<OrdersListRoute />} />
        <Route path="/orders/details/:orderId" element={<OrderDetailsNewRoute />} />
        <Route path="/orders/preparing/:orderId" element={<PreparingOrderRoute />} />
        <Route path="/orders/ready/:orderId" element={<OrderReadyRoute />} />
        <Route path="/orders/completed/:orderId" element={<OrderCompletedRoute />} />
        
        <Route path="/menu" element={<MenuListRoute />} />
        <Route path="/menu/add" element={<AddMenuItemScreen onNext={handleNext} />} />
        <Route path="/menu/detail/:itemId" element={<MenuItemDetailRoute />} />
        <Route path="/menu/categories" element={<CategoriesScreen onNext={handleNext} />} />
        <Route path="/menu/categories/add" element={<AddCategoryScreen onNext={handleNext} />} />

        <Route path="/earnings" element={<EarningsOverviewScreen onNext={handleNext} />} />
        <Route path="/earnings/history" element={<EarningsHistoryScreen onNext={handleNext} />} />
        <Route path="/reviews" element={<ReviewsScreen onNext={handleNext} />} />
        <Route path="/customers" element={<CustomersScreen onNext={handleNext} />} />
        <Route path="/reports" element={<ReportsScreen onNext={handleNext} />} />

        <Route path="/settings" element={<StoreSettingsScreen onNext={handleNext} />} />
        <Route path="/settings/bank" element={<BankDetailsScreen onNext={handleNext} />} />
        <Route path="/settings/bank/edit" element={<EditBankDetailsScreen onNext={handleNext} />} />
        <Route path="/settings/printer" element={<PrinterSettingsScreen onNext={handleNext} />} />
        <Route path="/settings/staff" element={<ManageStaffRoute />} />
        <Route path="/settings/staff/add" element={<AddStaffMemberScreen onNext={handleNext} />} />
        <Route path="/settings/staff/detail/:staffId" element={<StaffDetailRoute />} />
        <Route path="/settings/preferences" element={<AppPreferencesScreen onNext={handleNext} />} />
        <Route path="/settings/store-info" element={<StoreInformationScreen onNext={handleNext} />} />
        <Route path="/settings/subscription" element={<SubscriptionPlanScreen onNext={handleNext} />} />
        <Route path="/settings/support" element={<HelpSupportScreen onNext={handleNext} />} />

        <Route path="/notifications" element={<NotificationsScreen onNext={handleNext} />} />
        <Route path="/logout" element={<LogoutConfirmationScreen onNext={handleNext} />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
