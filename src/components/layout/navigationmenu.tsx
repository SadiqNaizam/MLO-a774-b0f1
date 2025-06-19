import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Building2, CalendarDays, MapPin } from 'lucide-react'; // Home and Settings icons are not needed

// Define navigation items
const navItems = [
  // { href: '/', label: 'Dashboard', icon: Home }, // Removed Dashboard link
  { href: '/house-management', label: 'My House', icon: Building2 },
  { href: '/event-planner', label: 'Event Planner', icon: CalendarDays },
  { href: '/local-guide', label: 'Local Guide', icon: MapPin },
  // Settings link removed
];

// You can also use shadcn's NavigationMenu components for more complex dropdowns if needed:
// import {
//   NavigationMenu as ShadcnNavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";

interface NavigationMenuProps {
  className?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ className }) => {
  console.log("Rendering NavigationMenu");
  const location = useLocation();

  // Determine if the current path is the root path, and if so, treat /house-management as active
  // because / now points to HouseManagementPage
  const isPathActive = (href: string) => {
    if (href === '/house-management' && location.pathname === '/') {
      return true;
    }
    return location.pathname === href;
  };


  return (
    <nav className={cn(
        "flex flex-col space-y-1 p-4 bg-sidebar border-r border-sidebar-border text-sidebar-foreground",
        className
    )}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground", // Adjusted hover for potentially better contrast
            isPathActive(item.href)
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;