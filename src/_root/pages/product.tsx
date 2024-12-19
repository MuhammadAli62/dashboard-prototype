import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, Gift, ThumbsUp } from 'lucide-react';
import CDW from "../../assets/CDW.png";
import Insight from "../../assets/Insight.png";
import FCN from "../../assets/fcn.jpg";
import FTS from "../../assets/FTS.png";
import { useUserAuth } from "@/context/AuthContext";
import { useSearchProduct } from "@/context/searchContext";
import ProductQuantityContext from "@/context/QuantityContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  price: number;
  cdwprice: number;
  insightprice: number;
  fcnprice: number;
}

interface ProductQuantityContextType {
  Quantity: number;
}

interface ModuleData {
  vendor: string;
  price: number;
  logo: string;
  description: string;
  discount: number;
}

export default function DashboardMetrics() {
  const navigate = useNavigate();
  const { currentUser } = useUserAuth();
  const { products } = useSearchProduct();
  const { Quantity } = useContext(ProductQuantityContext) as ProductQuantityContextType;

  const [moduleData, setModuleData] = useState<ModuleData[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [recommendedVendor, setRecommendedVendor] = useState<string>('');

  useEffect(() => {
    const product = products[0] as Product | undefined;

    if (product) {
      const vendors = [
        {
          vendor: 'CDW',
          price: product.cdwprice * Quantity,
          logo: CDW,
          description: 'CDW Corporation is a provider of technology products and services for business, government and education.',
          discount: ((product.price - product.cdwprice) / product.price) * 100
        },
        {
          vendor: 'Insight',
          price: product.insightprice * Quantity,
          logo: Insight,
          description: 'Insight Enterprises Inc. is a Fortune 500 solutions integrator helping organizations accelerate their digital journey.',
          discount: ((product.price - product.insightprice) / product.price) * 100
        },
        {
          vendor: 'FCN',
          price: product.fcnprice * Quantity,
          logo: FCN,
          description: 'FCN, Inc. is a technology solutions provider, delivering best-in-class IT solutions and services to customers.',
          discount: ((product.price - product.fcnprice) / product.price) * 100
        }
      ];

      // Find the lowest price vendor
      const lowestPriceVendor = vendors.reduce((prev, current) => 
        (prev.price < current.price) ? prev : current
      );

      // Add FTS card with recommendation based on lowest price
      const ftsCard = {
        vendor: 'FTS',
        price: 0,
        logo: FTS,
        description: `Based on our analysis, we recommend ${lowestPriceVendor.vendor} for this purchase. They offer the best value with a ${lowestPriceVendor.discount.toFixed(2)}% discount and a final price of $${lowestPriceVendor.price.toFixed(2)}.`,
        discount: 0
      };

      setModuleData([...vendors, ftsCard]);
      setRecommendedVendor(lowestPriceVendor.vendor);
    }
  }, [products, Quantity]);

  const handleCardClick = (vendor: string) => {
    setSelectedModules(prev =>
      prev.includes(vendor)
        ? prev.filter(v => v !== vendor)
        : [...prev, vendor]
    );
  };

  const handleCreateQuotation = () => {
    if (selectedModules.length > 0) {
      const selectedData = moduleData.filter(module => selectedModules.includes(module.vendor));
      const queryString = selectedData
        .map(module => `vendors[]=${encodeURIComponent(module.vendor)}&prices[]=${module.price}&descriptions[]=${encodeURIComponent(module.description)}&discounts[]=${module.discount}`)
        .join('&');
      navigate(`/quotation?${queryString}&recommended=${encodeURIComponent(recommendedVendor)}`);
    }
  };

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
            <Button
              onClick={handleCreateQuotation}
              className="mt-4 w-full bg-pink-600 hover:bg-pink-700"
              disabled={selectedModules.length === 0}
            >
              Create Quotation ({selectedModules.length} selected)
            </Button>
          </div>
          <div className="absolute bottom-4 right-4">
            <Gift className="h-24 w-24 text-pink-600/20" />
          </div>
        </Card>

        {/* Metrics Cards */}
        {moduleData.map((module, index) => (
          <Card
            key={module.vendor}
            className={`bg-[#13142b] p-6 text-white lg:col-span-1 cursor-pointer hover:bg-[#1a1b3a] transition-colors ${
              selectedModules.includes(module.vendor) ? 'ring-2 ring-pink-600' : ''
            } ${module.vendor === 'FTS' ? 'ring-2 ring-green-500' : ''}`}
            onClick={() => handleCardClick(module.vendor)}
          >
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-white p-2">
                <img src={module.logo} alt={`${module.vendor} Logo`} className="h-6 w-10" />
              </div>
              <div className="flex items-center gap-1 text-sm text-green-500">
                <span>{module.discount.toFixed(2)}%</span>
                {module.discount > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              </div>
            </div>
            <div className="mt-4">
              {module.vendor !== 'FTS' ? (
                <>
                  <div className="text-lg font-bold line-through">
                    MSRP: ${(module.price / (1 - module.discount / 100)).toFixed(2)}
                  </div>
                  <div className="text-xl font-bold">
                    {module.vendor} Price: ${module.price.toFixed(2)}
                  </div>
                </>
              ) : (
                <div className="text-xl font-bold text-green-500">
                  Our Recommendation
                </div>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-2">{module.description}</p>
            {module.vendor === 'FTS' && (
              <div className="mt-2 flex items-center text-green-500">
                <ThumbsUp className="h-4 w-4 mr-2" />
                <span className="text-sm font-semibold">Best Value Recommendation</span>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

