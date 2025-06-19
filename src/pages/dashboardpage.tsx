import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventSummaryCard, { EventSummary } from '@/components/EventSummaryCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const placeholderEvents: EventSummary[] = [
  { id: '1', title: 'Community BBQ', date: '2024-08-15', time: '6:00 PM', location: 'Park Common Area', description: 'Annual neighborhood BBQ. Bring a dish!' },
  { id: '2', title: 'Club', date: '2024-08-22', time: '7:30 PM', location: 'Local Library', description: 'Discussing "The Midnight Library".' },
  { id: '3', title: 'Weekend Hike', date: '2024-08-25', time: '9:00 AM', location: 'Mountain View Trail', description: 'Challenging but rewarding hike.' },
];

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');
  const userName = "John"; // Placeholder user name updated from Alex to John

  return (
    <div className="flex h-screen bg-background text-foreground">
      <NavigationMenu className="w-64" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header appName="Home" /> {/* Changed "My Home Dashboard" to "Home" */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="container mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Welcome back, {userName}!</CardTitle>
                <CardDescription>Here's what's happening in your home and community.</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Don't miss out on these events.</CardDescription>
                </CardHeader>
                <CardContent>
                  {placeholderEvents.length > 0 ? (
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-4">
                        {placeholderEvents.map(event => (
                          <EventSummaryCard
                            key={event.id}
                            event={event}
                            onViewDetails={(id) => console.log('View event details:', id)}
                            onEdit={(id) => console.log('Edit event:', id)}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <p className="text-muted-foreground">No upcoming events. Plan something new!</p>
                  )}
                   <Button asChild className="mt-4">
                     <Link to="/event-planner">Go to Event Planner <ArrowRight className="ml-2 h-4 w-4" /></Link>
                   </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>House Overview</CardTitle>
                  <CardDescription>Quick stats about your home.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                    <span className="text-sm text-muted-foreground">Total Rooms Managed:</span>
                    <span className="font-semibold text-foreground">5</span> {/* Placeholder */}
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                    <span className="text-sm text-muted-foreground">Items Tracked:</span>
                    <span className="font-semibold text-foreground">27</span> {/* Placeholder */}
                  </div>
                  <Button asChild className="w-full mt-2">
                    <Link to="/house-management">Manage My House <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Local Guide Quick Access</CardTitle>
                <CardDescription>Explore your saved local spots in Granada.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">Revisit your favorite restaurants, historical sites, and shops.</p>
                <Button asChild>
                  <Link to="/local-guide">Open Local Guide <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;