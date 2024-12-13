"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Gift } from 'lucide-react'
import { useUserAuth } from "@/context/AuthContext"
import CDW from "../../assets/CDW.png"
import Insight from "../../assets/Insight.png"
import FCN from "../../assets/fcn.jpg"

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
            <div className="rounded-full bg-white p-2">
              <img src={CDW} className="h-6 w-10"/>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <span>0%</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">CDW Price</div>
            <p className="text-sm text-gray-400">$10</p>
          </div>
        </Card>

        <Card className="bg-[#13142b] p-6 text-white lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-white p-2">
              <img src={Insight} className="h-6 w-10" />
            </div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <span>+14%</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">Insgight Price</div>
            <p className="text-sm text-gray-400">$30</p>
          </div>
        </Card>

        <Card className="bg-[#13142b] p-6 text-white lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-white p-2">
              <img src={FCN} className="h-6 w-10" />
            </div>
            <div className="flex items-center gap-1 text-sm text-red-500">
              <span>0%</span>
              <ArrowDownRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">FCN Price</div>
            <p className="text-sm text-gray-400">$40</p>
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
            <div className="text-2xl font-bold">i recommede</div>
            <p className="text-sm text-gray-400">CDW</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

