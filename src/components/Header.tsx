import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import kmitlLogo from "@/assets/kmitl-logo.webp";
import ancLogo from "@/assets/anc-logo.svg";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: 'สมัครประกัน', sectionId: 'insurance-form' },
    { label: 'สิทธิประโยชน์', sectionId: 'benefits-section' },
    { label: 'ช่องทางติดต่อ', sectionId: 'contact-section' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img 
              src={ancLogo} 
              alt="ANC Insurtech Logo" 
              className="h-8 w-auto object-contain"
            />
            <div className="w-px h-8 bg-foreground/30"></div>
            <img 
              src={kmitlLogo} 
              alt="KMITL Logo" 
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-12">
              {navigationItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-base font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className={`md:hidden ${
              isScrolled 
                ? 'border-gray-300 text-gray-700' 
                : 'border-white/30 text-white bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-left px-4 py-2 text-base text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;