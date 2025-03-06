
import { useState } from 'react';
import { Bell, Menu, Search, Settings, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel backdrop-blur-lg bg-white/70 dark:bg-black/30 border-b border-white/20 px-4 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-2"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        
        <div className="font-semibold text-xl animate-in fade-in">
          <span className="text-primary mr-1">Rider</span>
          <span>Locator</span>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-2 animate-in slide-in-from-bottom">
        <div className="relative w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search riders..." 
            className="pl-8 bg-white/40 dark:bg-black/20 focus:bg-white dark:focus:bg-black/40 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center space-x-1">
        {/* Mobile search toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          aria-label={isSearchOpen ? "Close search" : "Open search"}
        >
          {isSearchOpen ? <X size={20} /> : <Search size={20} />}
        </Button>
        
        {/* Notification button */}
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        
        {/* Settings button */}
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
        
        {/* User avatar */}
        <Button 
          variant="ghost" 
          className="rounded-full w-8 h-8 p-0 ml-2"
          aria-label="User profile"
        >
          <img 
            src="https://i.pravatar.cc/150?img=68" 
            alt="User" 
            className="rounded-full w-8 h-8 object-cover"
          />
        </Button>
      </div>
      
      {/* Mobile search overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 p-3 glass-panel md:hidden animate-in fade-in">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search riders..." 
              className="pl-8 w-full"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
