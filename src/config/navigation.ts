import { NavGroup, NavMainItem } from "@/types/navigation";
import {
    ShoppingBag,
    Users,
    LayoutDashboard,
    BarChart3,
    Package,
    Truck,
    Tag,
    Megaphone,
    Gift,
    CreditCard,
    FileText,
    ShieldCheck,
    Settings,
    CircleHelp,
    SquareArrowUpRight,
} from "lucide-react";

export const sidebarItems: NavGroup[] = [
    {
        id: 1,
        label: "Overview",
        items: [
            {
                title: "Dashboard",
                url: "/seller/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Analytics",
                url: "/seller/dashboard/analytics",
                icon: BarChart3,
            },
        ],
    },
    {
        id: 2,
        label: "Rental Management",
        items: [
            {
                title: "Products",
                url: "/seller/dashboard/products",
                icon: Package,
                subItems: [
                    { title: "All Products", url: "/seller/dashboard/products" },
                    { title: "Add Product", url: "/seller/dashboard/products/new" },
                    { title: "Categories", url: "/seller/dashboard/categories" },
                    { title: "Inventory", url: "/seller/dashboard/inventory" },
                ],
            },
            {
                title: "Orders",
                url: "/seller/dashboard/orders",
                icon: ShoppingBag,
            },
            {
                title: "Customers",
                url: "/seller/dashboard/customers",
                icon: Users,
                subItems: [
                    { title: "Customer List", url: "/seller/dashboard/customers" },
                    { title: "Segments", url: "/seller/dashboard/customers/segments" },
                    { title: "Reviews", url: "/seller/dashboard/customers/reviews" },
                ],
            },
            {
                title: "Shipments",
                url: "/seller/dashboard/shipments",
                icon: Truck,
            },
        ],
    },
    {
        id: 3,
        label: "Sales & Marketing",
        items: [
            {
                title: "Promotions",
                url: "/seller/dashboard/promotions",
                icon: Tag,
                subItems: [
                    { title: "Discounts", url: "/seller/dashboard/promotions/discounts" },
                    { title: "Coupons", url: "/seller/dashboard/promotions/coupons" },
                    { title: "Gift Cards", url: "/seller/dashboard/promotions/gift-cards" },
                ],
            },
            {
                title: "Campaigns",
                url: "/seller/dashboard/marketing",
                icon: Megaphone,
            },
            {
                title: "Loyalty Program",
                url: "/seller/dashboard/loyalty",
                icon: Gift,
            },
        ],
    },
    {
        id: 4,
        label: "Finance",
        items: [
            {
                title: "Transactions",
                url: "/seller/dashboard/finance/transactions",
                icon: CreditCard,
            },
            {
                title: "Invoices",
                url: "/seller/dashboard/finance/invoices",
                icon: FileText,
            },
            {
                title: "Payouts",
                url: "/seller/dashboard/finance/payouts",
                icon: ShieldCheck,
            },
        ],
    },
];

export const secondaryNavItems: NavMainItem[] = [
    {
        title: "Settings",
        url: "/seller/dashboard/settings",
        icon: Settings,
    },
    {
        title: "Get Help",
        url: "/seller/dashboard/help",
        icon: CircleHelp,
    },
    {
        title: "Integrations",
        url: "/seller/dashboard/integrations",
        icon: SquareArrowUpRight,
    },
]
