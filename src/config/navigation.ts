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
                url: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Analytics",
                url: "/dashboard/analytics",
                icon: BarChart3,
            },
        ],
    },
];

export const secondaryNavItems: NavMainItem[] = [
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
    {
        title: "Get Help",
        url: "/dashboard/help",
        icon: CircleHelp,
    },
    {
        title: "Integrations",
        url: "/dashboard/integrations",
        icon: SquareArrowUpRight,
    },
]
