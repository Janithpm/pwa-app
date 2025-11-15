import { NavGroup, NavMainItem } from "@/types/navigation";
import {
    LayoutDashboard,
    BarChart3,
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
