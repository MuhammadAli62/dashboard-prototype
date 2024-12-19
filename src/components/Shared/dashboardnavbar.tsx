"use client"
import { Bell,} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "../ui/sidebar"
import { UserNav } from "./user-nav"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-navy-900 backdrop-blur-[2px]">
      <div className="w-full flex justify-between h-16 items-center px-4">
      <SidebarTrigger className="-ml-1" />
        <div className="flex  items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" className="relative hover:bg-[#181f4a] rounded-full">
            <Bell className="h-5 w-5 text-white" />
            <span className="sr-only">Notifications</span>
            <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-red-600 text-xs font-bold text-white">
              5
            </span>
          </Button>
         <UserNav/>
        </div>
      </div>
    </header>
  )
}

