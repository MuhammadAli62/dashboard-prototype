"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, DollarSign, Eye, ArrowUpRight, ArrowDownRight, Gift } from 'lucide-react'
import { Line, LineChart, Bar, BarChart, ResponsiveContainer } from "recharts"
import { useUserAuth } from "@/context/AuthContext"
// Sample data for the charts
const ordersData = [
  { value: 180 }, { value: 220 }, { value: 160 }, { value: 200 }, 
  { value: 140 }, { value: 180 }, { value: 160 }, { value: 200 }
]

const salesData = [
  { value: 30 }, { value: 40 }, { value: 35 }, { value: 45 }, 
  { value: 35 }, { value: 50 }, { value: 45 }, { value: 60 }
]

const visitsData = [
  { value: 160 }, { value: 180 }, { value: 140 }, { value: 160 }, 
  { value: 140 }, { value: 120 }, { value: 140 }, { value: 120 }
]

const bounceData = [
  { value: 20 }, { value: 25 }, { value: 18 }, { value: 22 }, 
  { value: 16 }, { value: 21 }, { value: 24 }, { value: 28 },
  { value: 20 }, { value: 26 }, { value: 18 }, { value: 24 }
]

export default function DashboardMetrics() {

  const {currentUser} = useUserAuth()

  return (
    <div className="bg-[#090F2A] p-4 md:p-6 rounded-lg">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Congratulations Card */}
        <Card className="bg-[#13142b] p-6 text-white lg:col-span-1">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">Congratulations {currentUser?.displayName}</h2>
              <span className="text-2xl">🎉</span>
            </div>
            <p className="text-sm text-gray-400">You are the best seller of this month</p>
            <div className="mt-4">
              <div className="text-3xl font-bold">$0</div>
              <p className="text-sm text-gray-400">0% of sales target</p>
            </div>
            <Button className="mt-4 w-fit bg-pink-600 hover:bg-pink-700">View Details</Button>
          </div>
          <div className="absolute bottom-4 right-4">
            <Gift className="h-24 w-24 text-pink-600/20" />
          </div>
        </Card>

        {/* Metrics Cards */}
        <Card className="bg-[#13142b] p-6 text-white lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-blue-500/20 p-2">
              <ShoppingCart className="h-6 w-6 text-blue-500" />
              
            </div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <span>0%</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">0k</div>
            <p className="text-sm text-gray-400">Total Orders</p>
          </div>
          <div className="mt-4 h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ordersData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-[#13142b] p-6 text-white lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-green-500/20 p-2">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <span>+14%</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">0k</div>
            <p className="text-sm text-gray-400">Total Sales</p>
          </div>
          <div className="mt-4 h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  strokeWidth={2} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-[#13142b] p-6 text-white lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-cyan-500/20 p-2">
              <Eye className="h-6 w-6 text-cyan-500" />
            </div>
            <div className="flex items-center gap-1 text-sm text-red-500">
              <span>0%</span>
              <ArrowDownRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">0K</div>
            <p className="text-sm text-gray-400">Total Visits</p>
          </div>
          <div className="mt-4 h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitsData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#06b6d4" 
                  strokeWidth={2} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-[#13142b] p-6 text-white lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-orange-500/20 p-2">
              <ArrowUpRight className="h-6 w-6 text-orange-500" />
            </div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <span>0%</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">0%</div>
            <p className="text-sm text-gray-400">Bounce Rate</p>
          </div>
          <div className="mt-4 h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bounceData}>
                <Bar 
                  dataKey="value" 
                  fill="#f97316" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}

