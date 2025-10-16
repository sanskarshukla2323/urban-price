import { Building2, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="p-2 bg-gradient-accent rounded-lg shadow-glow">
              <Building2 className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              URBAN PRICE
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('predict')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Predict
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('stats')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Statistics
            </button>
            <button 
              onClick={() => scrollToSection('dataset')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Dataset
            </button>
            {user && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserIcon className="w-4 h-4" />
                <span className="max-w-[150px] truncate">{user.email}</span>
              </div>
            )}
            <Button 
              onClick={handleAuthClick}
              className="bg-gradient-hero hover:opacity-90 transition-all text-primary-foreground shadow-glow flex items-center gap-2"
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            <button
              onClick={() => scrollToSection('predict')}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary/20 rounded-lg transition-colors font-medium"
            >
              Predict
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary/20 rounded-lg transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('stats')}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary/20 rounded-lg transition-colors font-medium"
            >
              Statistics
            </button>
            <button
              onClick={() => scrollToSection('dataset')}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary/20 rounded-lg transition-colors font-medium"
            >
              Dataset
            </button>
            {user && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground px-4 py-2">
                <UserIcon className="w-4 h-4" />
                <span className="truncate">{user.email}</span>
              </div>
            )}
            <Button 
              onClick={handleAuthClick}
              className="w-full bg-gradient-hero hover:opacity-90 transition-all text-primary-foreground shadow-glow flex items-center gap-2 justify-center"
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
