"use client"

import { useState } from "react"
import { Search, Bell, ShoppingCart, Grip} from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "../ui/sidebar"
import { UserNav } from "./user-nav"

export default function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-navy-900">
      <div className="w-full flex h-16 items-center px-4">
      <SidebarTrigger className="-ml-1" />
        
        {/* Desktop Search */}
        <div className="hidden md:flex md:grow md:items-center md:px-4">
          <div className="relative w-full ">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full bg-white/10 pl-8 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Mobile Search Dialog */}
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Search className="h-5 w-5 text-white" />
              <span className="sr-only">Open search</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="top-4 gap-0 p-0 sm:max-w-[425px]">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search"
                className="w-full border-0 pl-8 focus:ring-0"
                autoFocus
              />
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex  items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-[#181f4a] rounded-full">
            <Grip className="h-5 w-5 text-white" />
            <span className="sr-only">Apps</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative hover:bg-[#181f4a] rounded-full">
            <Bell className="h-5 w-5 text-white" />
            <span className="sr-only">Notifications</span>
            <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-red-600 text-xs font-bold text-white">
              5
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="relative hover:bg-[#181f4a] rounded-full">
            <ShoppingCart className="h-5 w-5 text-white" />
            <span className="sr-only">Shopping cart</span>
            <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-red-600 text-xs font-bold text-white">
              8
            </span>
          </Button>
         <UserNav/>
        </div>
      </div>
    </header>
  )
}

