import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import bgImage from "../../assets/body-bg.webp";

import DashboardHeader from "@/components/Shared/dashboard-header";
import MonthlyRevenueCard from "@/components/Shared/dashboard-chart";
import RevenueChart from "@/components/Shared/barchart";
import { AppSidebar } from "@/components/Shared/app-sidebar";
import SiteHeader from "@/components/Shared/dashboardnavbar";

const Dashboard = () => {
    return (
        <div className="relative min-h-screen w-full" style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="relative z-10 min-h-screen bg-black bg-opacity-50">
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset className="bg-transparent">
                        <SiteHeader />
                        <main className="p-6">
                            <DashboardHeader />
                            <div className="flex flex-col lg:flex-row w-full gap-4 mt-4">
                                <RevenueChart />
                                <MonthlyRevenueCard />
                            </div>
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </div>
    );
}

export default Dashboard;

