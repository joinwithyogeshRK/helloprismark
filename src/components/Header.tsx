import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-10 shadow-sm relative">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('/assets/images/screenshot-2025-08-05-024229-1754994882311.png')",
          opacity: 0.85
        }}
      ></div>
      <div className="container mx-auto px-4 py-8 flex justify-between items-center relative z-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="header-logo mr-2">
                <img 
                  src="/assets/images/main-1755002334503.png" 
                  alt="Playful dog mascot with tennis ball" 
                  className="logo-image h-[50px] w-auto object-contain transition-transform duration-200 hover:scale-105" 
                  loading="eager" 
                />
              </div>
              <img 
                src="/assets/icons/alien-svgrepo-com-1755000483192.svg" 
                alt="Alien Logo" 
                className="h-[40px] w-auto object-contain p-2 transition-transform duration-200 hover:scale-105" 
                loading="lazy" 
              />
              <img 
                src="/assets/icons/favicon-1755002046407.ico" 
                alt="Favicon" 
                className="h-[24px] w-auto object-contain transition-transform duration-200 hover:scale-105" 
                loading="lazy" 
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm md:text-base text-white font-medium drop-shadow-md">
                woww
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/blog">
            <Button variant="ghost" className="text-white hover:text-primary-500 hover:bg-white/20">
              Blog
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="text-white hover:text-primary-500 hover:bg-white/20"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
          <Link to="/settings">
            <Button variant="ghost" className="text-white hover:text-primary-500 hover:bg-white/20">
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/20"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 py-4 px-4 shadow-md relative z-10">
          <div className="flex flex-col gap-4">
            <Link to="/blog" onClick={toggleMenu}>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-primary-500 hover:bg-white/20"
              >
                Blog
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="justify-start text-white hover:text-primary-500 hover:bg-white/20"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
            <Link to="/settings" onClick={toggleMenu}>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-primary-500 hover:bg-white/20"
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}