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
    name: "",
    type: "Restaurant",
    cuisine: "Indian",
    address: "",
    contactNumber: "",
    isOpen: true,
  },
  storeTimings: {
    openingTime: "08:00 AM",
    closingTime: "11:00 PM",
    openAllDays: true,
    customDays: ["M", "T", "W", "T", "F", "S", "S"],
  },
  storeLocation: {
    address: "",
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
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
  },
  subscription: {
    planName: "Premium Plan",
    isActive: true,
    validTill: "24 Jun 2027",
    benefits: [
      "Zero commission on orders",
      "Advanced reports",
      "Priority support",
      "Unlimited menu items",
      "Marketing tools"
    ]
  },
  staff: [],
  categories: [],
  menu: [],
  orders: [],
  earningsOverview: {
    totalEarnings: 0,
    percentageChange: "0% vs yesterday",
    orderEarnings: 0,
    deliveryCharges: 0,
    taxes: 0,
    chartData: []
  },
  earningsHistory: [],
  reviews: [],
  customers: [],
  notifications: []
};
