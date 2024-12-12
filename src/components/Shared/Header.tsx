import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import logo from "../../assets/logo.webp"

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'About FTS', path: '/about' },
    { title: 'Why Us', path: '/why-us' },
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' },
    { title: 'Admin', path: '/admin' },
  ];

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-indigo-600/95 backdrop-blur-sm shadow-md' : 'bg-indigo-600'
    }`}>
      <div className="container w-4/5 mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="FedTech Services"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-white hover:text-white/80 transition-colors text-sm font-medium ${
                  location.pathname === item.path ? 'opacity-100' : 'opacity-80'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-foreground hover:text-foreground/80 transition-colors text-lg ${
                      location.pathname === item.path ? 'font-medium' : ''
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

