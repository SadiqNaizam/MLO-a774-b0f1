import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Building2, CalendarDays, MapPin, Settings } from 'lucide-react'; // Example icons

// Define navigation items
const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/house', label: 'My House', icon: Building2 },
  { href: '/planner', label: 'Event Planner', icon: CalendarDays },
  { href: '/guide', label: 'Local Guide', icon: MapPin },
  { href: '/settings', label: 'Settings', icon: Settings },
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

  return (
    <nav className={cn("flex flex-col space-y-1 p-4 bg-gray-50 border-r", className)}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 hover:text-gray-900 transition-colors",
            location.pathname === item.href
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700"
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