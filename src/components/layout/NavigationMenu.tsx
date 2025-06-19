import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Building2, CalendarDays, MapPin, Settings } from 'lucide-react'; // Example icons

// Define navigation items
const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/house-management', label: 'My House', icon: Building2 }, // Corrected link based on App.tsx
  { href: '/event-planner', label: 'Event Planner', icon: CalendarDays }, // Corrected link
  { href: '/local-guide', label: 'Local Guide', icon: MapPin }, // Corrected link
  { href: '/settings', label: 'Settings', icon: Settings },
];

// You can also use shadcn's NavigationMenu components for more complex dropdowns if needed:
// import {\n//   NavigationMenu as ShadcnNavigationMenu,\n//   NavigationMenuContent,\n//   NavigationMenuItem,\n//   NavigationMenuLink,\n//   NavigationMenuList,\n//   NavigationMenuTrigger,\n//   navigationMenuTriggerStyle,\n// } from \"@/components/ui/navigation-menu\";\n
interface NavigationMenuProps {
  className?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ className }) => {
  console.log("Rendering NavigationMenu");
  const location = useLocation();

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
            location.pathname === item.href
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}\
    </nav>
  );
};

export default NavigationMenu;