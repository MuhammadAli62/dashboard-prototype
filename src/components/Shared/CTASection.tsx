import React from 'react';
import { Button } from "@/components/ui/button"

const CTASection: React.FC = () => {
  return (
    <section className="w-full min-h-[500px] bg-[#5240FF] mb-4 from-indigo-600 to-indigo-500 flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Get in touch with our team
        </h2>
        <p className="text-lg md:text-xl text-white/90">
          What are you waiting for? Chat with us today for a free consultation
        </p>
        <div className="pt-4">
          <Button 
            variant="secondary" 
            size="lg"
            className="bg-white hover:bg-white/90 text-gray-900 font-semibold px-8"
          >
            Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

