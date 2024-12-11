import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronDown, Home, LayoutGrid, ShoppingCart } from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const menuData = [
    {
        icon: Home,
        label: "Dashboard",
        href: "/dashboard",
        subItems: [
            { label: "Overview", href: "/dashboard/overview" },
            { label: "Analytics", href: "/dashboard/analytics" },
            { label: "Reports", href: "/dashboard/reports" }
        ],
        defaultOpen: true
    },
    {
        icon: LayoutGrid,
        label: "Analysis",
        href: "/analysis",
        subItems: [
            { label: "Performance", href: "/analysis/performance" },
            { label: "Trends", href: "/analysis/trends" }
        ]
    },
    {
        icon: ShoppingCart,
        label: "eCommerce",
        subItems: [
            { label: "Products", href: "/ecommerce/products" },
            { label: "Orders", href: "/ecommerce/orders" },
            { label: "Customers", href: "/ecommerce/customers" }
        ]
    },
    {
        icon: LayoutGrid,
        label: "Widgets",
        href: "/widgets"
    }
];

export default function SidebarMenuComponent() {
    const { pathname } = useLocation();

    return (
        <div className="border-r-0">
            <SidebarMenu>
                {menuData.map((item) => (
                    <React.Fragment key={item.label}>
                        {item.subItems ? (
                            <Collapsible defaultOpen={item.defaultOpen}>
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            {item.href ? (
                                                <Link to={item.href} className="flex w-full items-center">
                                                    <item.icon className="h-4 w-4 mr-2" />
                                                    <span>{item.label}</span>
                                                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                                </Link>
                                            ) : (
                                                <div className="flex w-full items-center">
                                                    <item.icon className="h-4 w-4 mr-2" />
                                                    <span>{item.label}</span>
                                                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                                </div>
                                            )}
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.subItems.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.label}>
                                                    <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                                                        <Link to={subItem.href}>
                                                            {subItem.label}
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ) : (
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === item.href}>
                                    <Link to={item.href} className="flex w-full items-center">
                                        <item.icon className="h-4 w-4 mr-2" />
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </React.Fragment>
                ))}
            </SidebarMenu>
        </div>
    )
}

