"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
  Lock
} from "lucide-react"

import  NavMain  from "./nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import logo from "../../assets/FTSLOGO.png"

const data = {
  navMain: [
    {
      title: "Control Center",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Mission Overview",
          url: "/dashboard",
        },
        {
          title: "Quick Quote",
          url: "#",
        },
        {
          title: "Performance Summary",
          url: "#",
        },
      ],
    },
    {
      title: "Foresight AI Suite",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Predictive Insights",
          url: "#",
          icon: Lock
        },
        {
          title: "Actionable Analytics",
          url: "#",
          icon: Lock
        },
        {
          title: "Strategic Forecasts",
          url: "#",
          icon: Lock,
          color: 'text-red-700'
        },
      ],
    },
    {
      title: "E-Commerce",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Products",
          url: "/products",
          icon: Lock
        },
        {
          title: "Customers",
          url: "#",
          icon: Lock
        },
        {
          title: "Orders",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Federal Alignment",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Rapid Response",
          url: "#",
          icon: Lock,
        },
        {
          title: "Mission Analytics",
          url: "#",
          icon: Lock,
          color: 'text-red-700'
        },
        {
          title: "Program Optimization",
          url: "#",
          icon: Lock,
          color: 'text-red-700'
        },
      
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img src={logo} alt="logo"/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}
