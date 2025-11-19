import { NavGroup, NavMainItem } from '@/types/navigation'
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  CircleHelp,
  SquareArrowUpRight,
  Car,
  Banknote,
  CalendarCheck,
  CreditCard,
  FileSignature,
  PieChart,
  Scroll,
  ShieldCheck,
  UserCog,
  Users,
  Wrench,
  Bell,
} from 'lucide-react'

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: 'Overview',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Analytics',
        url: '/dashboard/analytics',
        icon: BarChart3,
        subItems: [
          { title: 'Revenue', url: '/dashboard/analytics/revenue' },
          { title: 'Fleet Usage', url: '/dashboard/analytics/fleet' },
          { title: 'Bookings', url: '/dashboard/analytics/bookings' },
        ],
      },
    ],
  },

  {
    id: 2,
    label: 'Fleet Management',
    items: [
      {
        title: 'Vehicles',
        url: '/dashboard/vehicles',
        icon: Car,
        subItems: [
          { title: 'All Vehicles', url: '/dashboard/vehicles' },
          { title: 'Add Vehicle', url: '/dashboard/vehicles/add' },
          { title: 'Vehicle Types', url: '/dashboard/vehicles/types' },
          { title: 'Documents', url: '/dashboard/vehicles/documents' },
        ],
      },
      {
        title: 'Maintenance',
        url: '/dashboard/maintenance',
        icon: Wrench,
        subItems: [
          { title: 'Tasks', url: '/dashboard/maintenance' },
          { title: 'Service History', url: '/dashboard/maintenance/history' },
          { title: 'Expense Log', url: '/dashboard/maintenance/expenses' },
        ],
      },
    ],
  },

  {
    id: 3,
    label: 'Bookings',
    items: [
      {
        title: 'Bookings',
        url: '/dashboard/bookings',
        icon: CalendarCheck,
        subItems: [
          { title: 'All Bookings', url: '/dashboard/bookings' },
          { title: 'Create Booking', url: '/dashboard/bookings/create' },
          { title: 'Calendar View', url: '/dashboard/bookings/calendar' },
        ],
      },
      {
        title: 'Payments',
        url: '/dashboard/payments',
        icon: CreditCard,
        subItems: [
          { title: 'All Payments', url: '/dashboard/payments' },
          { title: 'Pending', url: '/dashboard/payments/pending' },
          { title: 'Refunds', url: '/dashboard/payments/refunds' },
        ],
      },
      {
        title: 'Agreements',
        url: '/dashboard/agreements',
        icon: FileSignature,
        subItems: [
          { title: 'All Agreements', url: '/dashboard/agreements' },
          { title: 'Templates', url: '/dashboard/agreements/templates' },
        ],
      },
    ],
  },

  {
    id: 4,
    label: 'Customers',
    items: [
      {
        title: 'Customers',
        url: '/dashboard/customers',
        icon: Users,
        subItems: [
          { title: 'All Customers', url: '/dashboard/customers' },
          { title: 'Add Customer', url: '/dashboard/customers/add' },
          { title: 'Blacklist', url: '/dashboard/customers/blacklist' },
        ],
      },
    ],
  },

  {
    id: 5,
    label: 'Staff & Roles',
    items: [
      {
        title: 'Staff',
        url: '/dashboard/staff',
        icon: UserCog,
        subItems: [
          { title: 'All Staff', url: '/dashboard/staff' },
          { title: 'Invite Staff', url: '/dashboard/staff/invite' },
        ],
      },
      {
        title: 'Roles & Permissions',
        url: '/dashboard/roles',
        icon: ShieldCheck,
        subItems: [
          { title: 'Roles', url: '/dashboard/roles' },
          { title: 'Permissions', url: '/dashboard/roles/permissions' },
        ],
      },
    ],
  },

  {
    id: 6,
    label: 'Finance',
    items: [
      {
        title: 'Invoices',
        url: '/dashboard/invoices',
        icon: Scroll,
        subItems: [
          { title: 'All Invoices', url: '/dashboard/invoices' },
          { title: 'Overdue', url: '/dashboard/invoices/overdue' },
        ],
      },
      {
        title: 'Transactions',
        url: '/dashboard/transactions',
        icon: Banknote,
        subItems: [
          { title: 'All Transactions', url: '/dashboard/transactions' },
          { title: 'Payouts', url: '/dashboard/transactions/payouts' },
        ],
      },
      {
        title: 'Reports',
        url: '/dashboard/reports',
        icon: PieChart,
        subItems: [
          { title: 'Financial', url: '/dashboard/reports/financial' },
          { title: 'Fleet Performance', url: '/dashboard/reports/fleet' },
          { title: 'Customer Insights', url: '/dashboard/reports/customers' },
        ],
      },
    ],
  },
]

export const secondaryNavItems: NavMainItem[] = [
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
  {
    title: 'Get Help',
    url: '/dashboard/help',
    icon: CircleHelp,
  },
  {
    title: 'Integrations',
    url: '/dashboard/integrations',
    icon: SquareArrowUpRight,
  },
]

export const accountDropdownItems: NavMainItem[] = [
  {
    title: 'Account',
    url: '/dashboard/account',
    icon: ShieldCheck,
  },
  {
    title: 'Notifications',
    url: '/dashboard/notifications',
    icon: Bell,
  },
]
