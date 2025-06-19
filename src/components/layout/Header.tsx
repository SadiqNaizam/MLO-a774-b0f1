import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Button } from '@/components/ui/button';
import { UserCircle, Bell } from 'lucide-react'; // Example icons
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Shadcn Avatar

interface HeaderProps {
  appName?: string;
}

const Header: React.FC<HeaderProps> = ({ appName = "App Dashboard" }) => {
  console.log("Rendering Header");

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40 border-b border-border">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section: App Name / Logo */}
          <div className="flex items-center">
            {/* App Name should link to dashboard */}
            <a href="/" className="text-xl font-bold text-foreground">
              {appName}
            </a>
          </div>

          {/* Right section: Actions / User Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            {/* Avatar now links to profile */}
            <Link to="/profile">
              <Avatar className="h-8 w-8"> {/* Removed cursor-default */}
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>
                  <UserCircle className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;