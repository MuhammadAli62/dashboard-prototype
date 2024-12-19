import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import bgImage from "../../assets/body-bg.webp";
import DashboardMetrics from "./product";
import { Toaster } from "@/components/ui/toaster"
import { ProductList } from "@/components/Shared/ProductCard";
import SiteHeader from "@/components/Shared/dashboardnavbar";
import { AppSidebar } from "@/components/Shared/app-sidebar";
import { useSearchProduct } from "@/context/searchContext";
import { ProductSearch } from "@/components/Shared/ProductSearch";

const Layout = () => {
    const { products } = useSearchProduct();

    return (
            <div className="relative min-h-screen w-full" style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="relative z-10 min-h-screen bg-opacity-50">
                    <SidebarProvider>
                        <AppSidebar />
                        <SidebarInset className="bg-transparent">
                            <SiteHeader />
                            <main className="p-6">
                                <div className="flex flex-col w-full gap-4 mt-4">
                                    <DashboardMetrics />
                                    <div className="flex flex-col lg:flex-row w-full gap-4 mt-4">
                                        <div className="container mx-auto p-4">
                                            <h1 className="text-2xl font-bold mb-4 text-white">Search Products</h1>
                                            <ProductSearch />
                                            {products.length > 0 && (
                                                <div className="mt-4">
                                                    <h2 className="text-xl font-semibold mb-2 text-white">Search Results</h2>
                                                    <ProductList products={products} />
                                                </div>
                                            )}
                                            <Toaster />
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </SidebarInset>
                    </SidebarProvider>
                </div>
            </div>
    );
}

export default Layout;

