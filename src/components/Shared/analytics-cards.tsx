"use client"

import { Card } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

// Sample data for the charts
const totalSalesData = [
  { value: 400 }, { value: 600 }, { value: 500 }, { value: 700 }, 
  { value: 400 }, { value: 800 }, { value: 600 }, { value: 400 }
]

const totalAccountsData = [
  { value: 300 }, { value: 500 }, { value: 450 }, { value: 400 }, 
  { value: 600 }, { value: 800 }, { value: 700 }, { value: 400 }
]

const avgWeeklySalesData = [
  { value: 200 }, { value: 400 }, { value: 500 }, { value: 400 }, 
  { value: 600 }, { value: 700 }, { value: 600 }, { value: 300 }
]

export default function AnalyticsCards() {
  return (
    <div className="min-h-screen bg-[#0a0b1e] p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Sales Card */}
        <Card className="p-6 bg-[#13142b] border-0">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">$9,568</span>
              <div className="flex items-center text-red-500 text-sm">
                <ArrowDownIcon className="h-4 w-4" />
                8.6%
              </div>
            </div>
            <span className="text-gray-400">Total Sales</span>
          </div>
          <div className="h-[100px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={totalSalesData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  strokeWidth={2} 
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Total Accounts Card */}
        <Card className="p-6 bg-[#13142b] border-0">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">85,247</span>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpIcon className="h-4 w-4" />
                23.7%
              </div>
            </div>
            <span className="text-gray-400">Total Accounts</span>
          </div>
          <div className="h-[100px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={totalAccountsData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#eab308" 
                  strokeWidth={2} 
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Average Weekly Sales Card */}
        <Card className="p-6 bg-[#13142b] border-0">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">$69,452</span>
              <div className="flex items-center text-red-500 text-sm">
                <ArrowDownIcon className="h-4 w-4" />
                8.6%
              </div>
            </div>
            <span className="text-gray-400">Average Weekly Sales</span>
          </div>
          <div className="h-[100px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={avgWeeklySalesData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#06b6d4" 
                  strokeWidth={2} 
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}

