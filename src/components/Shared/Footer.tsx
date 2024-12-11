import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button"

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5240FF] text-white">
      <div className="container w-4/5 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo and Address */}
          <div className="space-y-4">
            <img 
              src="/placeholder.svg?height=60&width=200" 
              alt="FedTech Services"
              className="h-12 w-auto"
            />
            <div className="space-y-1">
              <p>4960 S. Gilbert RD</p>
              <p>PMB 752</p>
              <p>Chandler, AZ 85249</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-start md:items-center space-y-2">
            <a href="/terms" className="hover:text-white/80 transition-colors">
              Terms and Conditions
            </a>
            <a href="/privacy" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
          </div>

          {/* Social Media */}
          <div className="flex justify-start md:justify-end gap-4">
            <Button variant="ghost" size="icon" className="rounded-lg hover:bg-white/10">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-lg hover:bg-white/10">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-lg hover:bg-white/10">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/90">
            Copyright © 2024 FedTechServices, Inc All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

