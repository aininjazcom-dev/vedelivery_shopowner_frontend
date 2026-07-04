import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Database, User, RefreshCw, Layers, Plus, CheckCircle } from 'lucide-react';
import type { Order } from '../data/initialDummyData';

interface DeveloperSidebarProps {
  currentScreenId: number;
  setCurrentScreenId: (id: number) => void;
}

export const DeveloperSidebar = ({
  currentScreenId,
  setCurrentScreenId
}: DeveloperSidebarProps) => {
  const { isDemo, resetToDefault, updateState } = useApp();
  const [searchTerm, setSearchTerm] = useState('');


  const screenGroups = [
    {
      title: "1. Auth & Onboarding",
      screens: [
        { id: 1, name: "01. Splash Screen" },
        { id: 2, name: "02. Login Screen" },
        { id: 3, name: "03. Sign Up Screen" },
        { id: 4, name: "04. OTP Verification" },
        { id: 5, name: "05. Store Setup" },
        { id: 6, name: "06. Store Timings" },
        { id: 7, name: "07. Store Location" },
      ]
    },
    {
      title: "2. Dashboard & Orders",
      screens: [
        { id: 8, name: "08. Dashboard" },
        { id: 9, name: "09. Orders List" },
        { id: 10, name: "10. Order Details (New)" },
        { id: 11, name: "11. Preparing Order" },
        { id: 12, name: "12. Order Ready" },
        { id: 13, name: "13. Order Completed" },
      ]
    },
    {
      title: "3. Menu & Categories",
      screens: [
        { id: 14, name: "14. Menu List" },
        { id: 15, name: "15. Add Menu Item" },
        { id: 16, name: "16. Menu Item Detail" },
        { id: 29, name: "29. Categories" },
        { id: 30, name: "30. Add Category" },
      ]
    },
    {
      title: "4. Earnings & Insights",
      screens: [
        { id: 17, name: "17. Earnings Overview" },
        { id: 18, name: "18. Earnings History" },
        { id: 19, name: "19. Reviews" },
        { id: 20, name: "20. Customers" },
        { id: 21, name: "21. Reports" },
      ]
    },
    {
      title: "5. Settings & Staff",
      screens: [
        { id: 22, name: "22. Store Settings" },
        { id: 23, name: "23. Bank Details" },
        { id: 24, name: "24. Notifications" },
        { id: 25, name: "25. Printer Settings" },
        { id: 26, name: "26. Manage Staff" },
        { id: 27, name: "27. Staff Detail" },
        { id: 28, name: "28. Add Staff Member" },
        { id: 31, name: "31. App Preferences" },
        { id: 32, name: "32. Store Information" },
        { id: 33, name: "33. Edit Bank Details" },
        { id: 34, name: "34. Subscription / Plan" },
        { id: 35, name: "35. Help & Support" },
        { id: 36, name: "36. Logout Confirmation" },
      ]
    }
  ];

  const handleSimulateOrder = () => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
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
      status: 'new',
      paymentMethod: 'digital_wallet',
      paymentStatus: 'completed'
    };

    updateState(prev => {
      // Add order to beginning of orders list
      const updatedOrders = [newOrder, ...prev.orders];
      
      // Add notification
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

    // Jump to dashboard or order details
    setCurrentScreenId(10); // Order Details of new order
  };

  const filteredGroups = screenGroups.map(group => ({
    ...group,
    screens: group.screens.filter(screen => 
      screen.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.screens.length > 0);

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-800 text-slate-200 flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="p-5 border-b border-slate-800 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Layers className="text-brand-orange w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight text-white font-sans">Shop Owner Simulator</h1>
        </div>
        <p className="text-xs text-slate-400">VE Delivery - Business App Flow</p>
      </div>

      {/* State / DB panel */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex flex-col gap-3">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Database Connection</div>
        
        <div className="flex items-center gap-2 text-xs">
          <Database className="w-4 h-4 text-emerald-500" />
          <span className="text-slate-300">Supabase Connected:</span>
          <span className="font-semibold text-emerald-400">OK</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <User className="w-4 h-4 text-brand-orange" />
          <span className="text-slate-300">Active Mode:</span>
          <span className="font-semibold text-brand-orange">
            {isDemo ? "Simulated Demo" : "Real Auth Sync"}
          </span>
        </div>

        <div className="flex gap-2 mt-1">
          <button
            onClick={resetToDefault}
            className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-800 rounded text-slate-300 hover:text-white transition flex items-center justify-center gap-1.5 text-xs font-medium border border-slate-700/50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Data
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-b border-slate-800 flex flex-col gap-2">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Simulation Triggers</div>
        <button
          onClick={handleSimulateOrder}
          className="w-full py-2 px-3 bg-brand-orange hover:bg-brand-orangeHover active:scale-[0.98] rounded text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          Simulate New Order
        </button>
      </div>

      {/* Search Screens */}
      <div className="p-4 border-b border-slate-800">
        <input
          type="text"
          placeholder="Search screens (1-36)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-1.5 px-3 bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-brand-orange"
        />
      </div>

      {/* Screen Navigator List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
        {filteredGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="flex flex-col gap-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 mb-1 font-sans">{group.title}</h2>
            {group.screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setCurrentScreenId(screen.id)}
                className={`w-full text-left py-1.5 px-2.5 rounded text-xs transition font-medium flex items-center justify-between ${
                  currentScreenId === screen.id
                    ? "bg-slate-800 text-white border-l-2 border-brand-orange font-semibold"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <span>{screen.name}</span>
                {currentScreenId === screen.id && (
                  <CheckCircle className="w-3.5 h-3.5 text-brand-orange" />
                )}
              </button>
            ))}
          </div>
        ))}
        {filteredGroups.length === 0 && (
          <div className="text-center text-xs text-slate-500 py-4">No screens match your search.</div>
        )}
      </div>
    </div>
  );
};
