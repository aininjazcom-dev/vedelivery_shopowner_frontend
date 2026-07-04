export interface StoreInfo {
  name: string;
  type: string;
  cuisine: string;
  address: string;
  contactNumber: string;
  logoUrl?: string;
  isOpen: boolean;
}

export interface StoreTimings {
  openingTime: string;
  closingTime: string;
  openAllDays: boolean;
  customDays: string[]; // M, T, W, T, F, S, S
}

export interface StoreLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface PrinterSettings {
  selectPrinter: string;
  paperSize: string;
  printAutomatically: boolean;
}

export interface AppPreferences {
  orderSound: boolean;
  notificationSound: boolean;
  vibration: boolean;
  language: string;
  theme: string;
}

export interface BankDetails {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
}

export interface Subscription {
  planName: string;
  isActive: boolean;
  validTill: string;
  benefits: string[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive';
  phone: string;
  email: string;
  permissions: string[];
  joinedOn: string;
  photoUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  itemCount: number;
  iconName?: string;
  displayOrder: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  isBestseller: boolean;
  isAvailable: boolean;
  description: string;
  imageUrl?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string; // e.g. #1258
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  distance: string;
  time: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  taxAmount: number;
  totalAmount: number;
  status: 'new' | 'preparing' | 'ready' | 'completed' | 'rejected';
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  deliveredAt?: string;
}

export interface EarningHistoryItem {
  date: string;
  amount: number;
}

export interface EarningOverview {
  totalEarnings: number;
  percentageChange: string;
  orderEarnings: number;
  deliveryCharges: number;
  taxes: number;
  chartData: { time: string; amount: number }[];
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  avatarUrl?: string;
}

export interface Customer {
  id: string;
  name: string;
  totalOrders: number;
  totalSpend: number;
  avatarUrl?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'order' | 'payment' | 'stock' | 'report';
}

export interface BusinessOwnerState {
  storeInfo: StoreInfo;
  storeTimings: StoreTimings;
  storeLocation: StoreLocation;
  printerSettings: PrinterSettings;
  appPreferences: AppPreferences;
  bankDetails: BankDetails;
  subscription: Subscription;
  staff: StaffMember[];
  categories: Category[];
  menu: MenuItem[];
  orders: Order[];
  earningsOverview: EarningOverview;
  earningsHistory: EarningHistoryItem[];
  reviews: Review[];
  customers: Customer[];
  notifications: AppNotification[];
}

export const initialDummyData: BusinessOwnerState = {
  storeInfo: {
    name: "John's Kitchen",
    type: "Restaurant",
    cuisine: "Indian",
    address: "123, 5th Cross, Koramangala, Bangalore 560038",
    contactNumber: "+91 98765 43210",
    isOpen: true,
  },
  storeTimings: {
    openingTime: "08:00 AM",
    closingTime: "11:00 PM",
    openAllDays: true,
    customDays: ["M", "T", "W", "T", "F", "S", "S"],
  },
  storeLocation: {
    address: "123, 2nd Main, Koramangala, Bangalore 560034",
    lat: 12.9352,
    lng: 77.6244,
  },
  printerSettings: {
    selectPrinter: "Kitchen Printer",
    paperSize: "80 mm",
    printAutomatically: true,
  },
  appPreferences: {
    orderSound: true,
    notificationSound: true,
    vibration: true,
    language: "English",
    theme: "Light",
  },
  bankDetails: {
    accountHolderName: "John's Kitchen",
    bankName: "HDFC Bank",
    accountNumber: "XXXX XXXX 5678",
    ifscCode: "HDFC0001234",
    upiId: "johnskitchen@okicici",
  },
  subscription: {
    planName: "Premium Plan",
    isActive: true,
    validTill: "24 Jun 2025",
    benefits: [
      "Zero commission on orders",
      "Advanced reports",
      "Priority support",
      "Unlimited menu items",
      "Marketing tools"
    ]
  },
  staff: [
    {
      id: "staff-1",
      name: "Rohit Sharma",
      role: "Manager",
      status: "active",
      phone: "+91 98765 43211",
      email: "rohit@gmail.com",
      permissions: ["Manage Orders", "Menu", "Earnings", "Reports"],
      joinedOn: "12 May 2024, 10:30 AM",
    },
    {
      id: "staff-2",
      name: "Sunita Reddy",
      role: "Chef",
      status: "active",
      phone: "+91 98765 43212",
      email: "sunita@gmail.com",
      permissions: ["Menu"],
      joinedOn: "14 May 2024, 09:15 AM",
    },
    {
      id: "staff-3",
      name: "Mohammad Ali",
      role: "Delivery Manager",
      status: "active",
      phone: "+91 98765 43213",
      email: "ali@gmail.com",
      permissions: ["Manage Orders"],
      joinedOn: "18 May 2024, 11:45 AM",
    },
    {
      id: "staff-4",
      name: "Karan Patel",
      role: "Cashier",
      status: "active",
      phone: "+91 98765 43214",
      email: "karan@gmail.com",
      permissions: ["Manage Orders", "Earnings"],
      joinedOn: "20 May 2024, 02:30 PM",
    }
  ],
  categories: [
    { id: "cat-1", name: "Biryani", itemCount: 12, iconName: "🍲", displayOrder: 1 },
    { id: "cat-2", name: "Pizza", itemCount: 15, iconName: "🍕", displayOrder: 2 },
    { id: "cat-3", name: "Burgers", itemCount: 10, iconName: "🍔", displayOrder: 3 },
    { id: "cat-4", name: "Desserts", itemCount: 8, iconName: "🧁", displayOrder: 4 },
    { id: "cat-5", name: "Beverages", itemCount: 20, iconName: "🥤", displayOrder: 5 }
  ],
  menu: [
    {
      id: "item-1",
      name: "Veg Biryani",
      price: 180,
      category: "Biryani",
      isBestseller: true,
      isAvailable: true,
      description: "Aromatic basmati rice cooked with garden fresh vegetables and spices."
    },
    {
      id: "item-2",
      name: "Paneer Butter Masala",
      price: 200,
      category: "Main Course",
      isBestseller: false,
      isAvailable: true,
      description: "Cottage cheese cooked in rich tomato and cream based gravy."
    },
    {
      id: "item-3",
      name: "Masala Dosa",
      price: 160,
      category: "Starters",
      isBestseller: false,
      isAvailable: true,
      description: "Crispy rice crepe stuffed with potato masala served with sambar and chutney."
    },
    {
      id: "item-4",
      name: "Gulab Jamun",
      price: 80,
      category: "Desserts",
      isBestseller: false,
      isAvailable: true,
      description: "Warm milk-solid dumplings dipped in sugar syrup."
    },
    {
      id: "item-5",
      name: "Veg Sandwich",
      price: 120,
      category: "Starters",
      isBestseller: false,
      isAvailable: true,
      description: "Fresh vegetables layered between bread slices with butter and green chutney."
    },
    {
      id: "item-6",
      name: "Chicken Biryani",
      price: 220,
      category: "Biryani",
      isBestseller: true,
      isAvailable: true,
      description: "Aromatic basmati rice cooked with chicken and spices."
    }
  ],
  orders: [
    {
      id: "#1258",
      customerName: "Rahul Kumar",
      customerPhone: "+91 98765 43210",
      deliveryAddress: "123, 5th Cross, Koramangala, Bangalore 560038",
      distance: "1.2 km away",
      time: "10:30 AM",
      items: [
        { name: "Chicken Biryani", quantity: 1, price: 220 },
        { name: "Cucumber Raita", quantity: 1, price: 60 },
        { name: "Pepsi", quantity: 1, price: 40 }
      ],
      subtotal: 320,
      deliveryFee: 30,
      taxAmount: 18,
      totalAmount: 320, // matching screenshot which shows ₹320 total
      status: "new",
      paymentMethod: "digital_wallet",
      paymentStatus: "completed"
    },
    {
      id: "#1257",
      customerName: "Priya Sharma",
      customerPhone: "+91 98765 43212",
      deliveryAddress: "456, 12th Main, HSR Layout, Bangalore 560102",
      distance: "2.5 km away",
      time: "10:20 AM",
      items: [
        { name: "Paneer Butter Masala", quantity: 2, price: 200 },
        { name: "Garlic Naan", quantity: 1, price: 50 }
      ],
      subtotal: 450,
      deliveryFee: 30,
      taxAmount: 22,
      totalAmount: 450, // matching screenshot which shows ₹450 total
      status: "new",
      paymentMethod: "card",
      paymentStatus: "completed"
    },
    {
      id: "#1256",
      customerName: "Amit Verma",
      customerPhone: "+91 98765 43213",
      deliveryAddress: "789, 4th Block, Jayanagar, Bangalore 560011",
      distance: "1.1 km away",
      time: "10:25 AM",
      items: [
        { name: "Masala Dosa", quantity: 1, price: 160 },
        { name: "Filter Coffee", quantity: 1, price: 90 }
      ],
      subtotal: 250,
      deliveryFee: 20,
      taxAmount: 12,
      totalAmount: 250,
      status: "new",
      paymentMethod: "cash",
      paymentStatus: "pending"
    },
    {
      id: "#1255",
      customerName: "Neha Iyer",
      customerPhone: "+91 98765 43214",
      deliveryAddress: "321, 8th Main, Indiranagar, Bangalore 560038",
      distance: "3.0 km away",
      time: "10:20 AM",
      items: [
        { name: "Veg Sandwich", quantity: 2, price: 120 },
        { name: "Pepsi", quantity: 1, price: 40 }
      ],
      subtotal: 280,
      deliveryFee: 35,
      taxAmount: 14,
      totalAmount: 180, // matches dashboard recent orders list: #1255 - ₹180
      status: "preparing",
      paymentMethod: "digital_wallet",
      paymentStatus: "completed"
    },
    {
      id: "#1254",
      customerName: "Suresh Rao",
      customerPhone: "+91 98765 43215",
      deliveryAddress: "654, 1st Cross, BTM Layout, Bangalore 560076",
      distance: "0.5 km away",
      time: "10:15 AM",
      items: [
        { name: "Gulab Jamun", quantity: 1, price: 80 }
      ],
      subtotal: 80,
      deliveryFee: 15,
      taxAmount: 4,
      totalAmount: 80,
      status: "ready",
      paymentMethod: "cash",
      paymentStatus: "pending"
    },
    {
      id: "#1253",
      customerName: "Rajesh Gupta",
      customerPhone: "+91 98765 43216",
      deliveryAddress: "111, 7th Cross, Koramangala, Bangalore 560034",
      distance: "1.5 km away",
      time: "10:00 AM",
      items: [
        { name: "Veg Biryani", quantity: 1, price: 180 }
      ],
      subtotal: 180,
      deliveryFee: 20,
      taxAmount: 9,
      totalAmount: 180,
      status: "completed",
      paymentMethod: "digital_wallet",
      paymentStatus: "completed",
      deliveredAt: "10:15 AM"
    }
  ],
  earningsOverview: {
    totalEarnings: 8450,
    percentageChange: "+ 12.5% vs yesterday",
    orderEarnings: 7860,
    deliveryCharges: 590,
    taxes: 0,
    chartData: [
      { time: "12 AM", amount: 1000 },
      { time: "6 AM", amount: 1200 },
      { time: "12 PM", amount: 4500 },
      { time: "6 PM", amount: 6800 },
      { time: "11 PM", amount: 8450 },
    ]
  },
  earningsHistory: [
    { date: "24 May 2024", amount: 8450 },
    { date: "23 May 2024", amount: 7200 },
    { date: "22 May 2024", amount: 6980 },
    { date: "21 May 2024", amount: 5430 },
    { date: "20 May 2024", amount: 8120 },
    { date: "19 May 2024", amount: 4890 },
  ],
  reviews: [
    {
      id: "rev-1",
      customerName: "Rahul Kumar",
      rating: 5,
      date: "24 May",
      comment: "Great food and fast delivery!"
    },
    {
      id: "rev-2",
      customerName: "Priya Sharma",
      rating: 4,
      date: "23 May",
      comment: "Good taste. Will order again."
    },
    {
      id: "rev-3",
      customerName: "Amit Verma",
      rating: 5,
      date: "23 May",
      comment: "Best biryani in the city!"
    }
  ],
  customers: [
    { id: "cust-1", name: "Rahul Kumar", totalOrders: 5, totalSpend: 1250 },
    { id: "cust-2", name: "Priya Sharma", totalOrders: 8, totalSpend: 2350 },
    { id: "cust-3", name: "Amit Verma", totalOrders: 3, totalSpend: 680 },
    { id: "cust-4", name: "Neha Iyer", totalOrders: 6, totalSpend: 1890 },
    { id: "cust-5", name: "Suresh Rao", totalOrders: 4, totalSpend: 960 }
  ],
  notifications: [
    {
      id: "notif-1",
      title: "New order received",
      message: "#1258",
      time: "10:30 AM",
      isRead: false,
      type: "order"
    },
    {
      id: "notif-2",
      title: "Order picked up",
      message: "#1257 has been picked up",
      time: "10:00 AM",
      isRead: false,
      type: "order"
    },
    {
      id: "notif-3",
      title: "Payment received",
      message: "₹320 for order #1258",
      time: "10:45 AM",
      isRead: false,
      type: "payment"
    },
    {
      id: "notif-4",
      title: "Low stock alert",
      message: "Paneer is running low",
      time: "Yesterday",
      isRead: true,
      type: "stock"
    },
    {
      id: "notif-5",
      title: "Weekly report",
      message: "Your weekly report is ready",
      time: "Yesterday",
      isRead: true,
      type: "report"
    }
  ]
};
