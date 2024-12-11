import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Icon3 from "../../assets/icon-03.webp"
import Icon2 from "../../assets/icon-02.webp"
import Icon1 from "../../assets/icon-01.webp"

export default function FeaturesSection() {
    return (
        <section className="w-full py-16 bg-[#e9e9e9]">
            <div className="container mx-auto w-4/5 ">
                <h2 className="text-center text-indigo-600 text-lg mb-16">
                    Improve your bottom line, and achieve your business objectives..
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Free Service */}
                    <div className="flex flex-col items-center text-center space-y-4 p-12 bg-[#e6e6e6] rounded-lg max-w-sm">
                        <div className="w-56 h-40 rounded-xl flex items-center justify-center mb-4">
                            <img src={Icon3} className="text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Free Service</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Looking to optimize your equipment purchases? We offer complimentary budget quotes tailored to your needs. Leverage this free service to gain accurate, transparent pricing that aligns with your financial goals. Don't miss out on maximizing your budget
                        </p>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 mt-4">
                            Register today
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                    {/* Upload Your RFQ */}
                    <div className="flex flex-col items-center text-center space-y-4 p-12 bg-[#e6e6e6] rounded-lg max-w-sm">
                        <div className="w-56 h-40 rounded-xl flex items-center justify-center mb-4">
                            <img src={Icon2} className="text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Upload Your RFQ with Ease</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Simplify your procurement process with our cutting-edge AI-powered RFQ tool. Upload your RFQ, and we'll gather quotes from a vast network of sources. Track your quotes in real-time, align multiple orders with individual projects, and streamline your supply chain management. Start now and experience effortless procurement.
                        </p>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 mt-4">
                            Register today
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                    {/* KPI Metrics */}
                    <div className="flex flex-col items-center text-center space-y-4 p-12 bg-[#e6e6e6] rounded-lg max-w-sm">
                        <div className="w-56 h-40 rounded-xl flex items-center justify-center mb-4">
                            <img src={Icon1} className="text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">KPI Metrics at a Glance</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Gain real-time insights into your procurement performance. Our platform provides you with powerful, easy-to-understand KPIs to measure:
                        </p>
                        <ul className="text-gray-600 text-left space-y-2">
                            <li>• Cost Savings and Budget Adherence</li>
                            <li>• Procurement Process Efficiency</li>
                            <li>• Sustainability and Vendor Diversity</li>
                            <li>• Compliance and Risk Management</li>
                        </ul>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 mt-4">
                            Register today
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

