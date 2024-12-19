import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import PersonImage from "../../assets/124599.jpg"
import { useUserAuth } from "@/context/AuthContext"


export default function DashboardHeader() {


    const {currentUser} = useUserAuth()
    console.log(currentUser)
    return (
        <div className="min-h-[300px] w-full bg-[#090F2A] p-6 rounded-lg">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="col-span-1 lg:col-span-2">
                        <div className="mb-8 flex items-start md:items-center  gap-4">
                            <Avatar className="h-14 w-14 border-2 border-white/20">
                                <AvatarImage src={PersonImage} alt="User" />
                                <AvatarFallback>JA</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm text-gray-400">Welcome back</p>
                                        <h1 className="text-2xl font-semibold text-white">
                                            {currentUser?.displayName}
                                        </h1>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm text-gray-400">Cost Savings</p>
                                        <h1 className="text-2xl font-semibold text-white">
                                            $20
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Today's Sales Card */}
                            <Card className="bg-[#12132D] border-none">
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <h2 className="text-3xl font-bold text-white">$65.4K</h2>
                                        <p className="text-sm text-gray-400">Today's Savings</p>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-800">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
                                            style={{ width: "65%" }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Growth Rate Card */}
                            <Card className="bg-[#12132D] border-none">
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <h2 className="text-3xl font-bold text-white">78.4%</h2>
                                        <p className="text-sm text-gray-400"></p>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-800">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                                            style={{ width: "78.4%" }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

