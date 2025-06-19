import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventSummaryCard, { EventSummary } from '@/components/EventSummaryCard';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const initialEvents: EventSummary[] = [
  { id: 'ev1', title: 'Dinner Party', date: '2024-09-05', time: '7:00 PM', location: 'My Place', description: 'Hosting a small dinner for friends.' },
  { id: 'ev2', title: 'Football Viewing', date: '2024-09-10', time: '2:00 PM', location: 'Living Room', description: 'Watching the big game.' },
];

interface EventFormData {
  id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const EventPlannerPage: React.FC = () => {
  console.log('EventPlannerPage loaded');
  const [events, setEvents] = useState<EventSummary[]>(initialEvents);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [currentEventForm, setCurrentEventForm] = useState<EventFormData>({ title: '', date: '', time: '', location: '', description: ''});
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenNewEventDialog = () => {
    setIsEditing(false);
    setCurrentEventForm({ title: '', date: selectedDate?.toISOString().split('T')[0] || '', time: '', location: '', description: ''});
    setIsEventDialogOpen(true);
  };
  
  const handleOpenEditEventDialog = (event: EventSummary) => {
    setIsEditing(true);
    setCurrentEventForm({
        id: event.id,
        title: event.title,
        date: event.date, 
        time: event.time || '',
        location: event.location || '',
        description: event.description || ''
    });
    setIsEventDialogOpen(true);
  };

  const handleSaveEvent = () => {
    if(!currentEventForm.title.trim() || !currentEventForm.date.trim()) return;

    const newEvent: EventSummary = {
        id: isEditing && currentEventForm.id ? currentEventForm.id : `event-${Date.now()}`,
        title: currentEventForm.title,
        date: currentEventForm.date,
        time: currentEventForm.time,
        location: currentEventForm.location,
        description: currentEventForm.description,
    };

    if(isEditing) {
        setEvents(prevEvents => prevEvents.map(ev => ev.id === newEvent.id ? newEvent : ev));
    } else {
        setEvents(prevEvents => [...prevEvents, newEvent]);
    }
    setIsEventDialogOpen(false);
  };


  return (
    <div className="flex h-screen bg-background text-foreground">
      <NavigationMenu className="w-64" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header appName="Event Planner" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card> {/* Card is theme-aware */}
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                   <Calendar // Calendar component from shadcn is theme-aware
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border" 
                  />
                </CardContent>
              </Card>
               <Button onClick={handleOpenNewEventDialog} className="w-full mt-6">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
              </Button>
            </div>

            <div className="lg:col-span-2">
              <Card> {/* Card is theme-aware */}
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  {events.length > 0 ? (
                    <ScrollArea className="h-[calc(100vh-280px)] pr-3">
                      <div className="space-y-4">
                        {events
                          .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map(event => (
                          <EventSummaryCard
                            key={event.id}
                            event={event}
                            onEdit={() => handleOpenEditEventDialog(event)}
                            onViewDetails={(id) => console.log('View details for event', id)}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <p className="text-muted-foreground">No events planned. Click "Create New Event" to add one.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Add/Edit Event Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-[425px]"> {/* DialogContent is theme-aware */}
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Event' : 'Create New Event'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the details for your event.' : 'Fill in the details for your new event.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="eventTitle" className="text-right text-sm text-foreground">Title</label>
              <Input id="eventTitle" value={currentEventForm.title} onChange={e => setCurrentEventForm({...currentEventForm, title: e.target.value})} className="col-span-3" placeholder="e.g., Birthday Bash" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="eventDate" className="text-right text-sm text-foreground">Date</label>
              <Input id="eventDate" type="date" value={currentEventForm.date} onChange={e => setCurrentEventForm({...currentEventForm, date: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="eventTime" className="text-right text-sm text-foreground">Time</label>
              <Input id="eventTime" type="time" value={currentEventForm.time} onChange={e => setCurrentEventForm({...currentEventForm, time: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="eventLocation" className="text-right text-sm text-foreground">Location</label>
              <Input id="eventLocation" value={currentEventForm.location} onChange={e => setCurrentEventForm({...currentEventForm, location: e.target.value})} className="col-span-3" placeholder="e.g., My Home" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="eventDescription" className="text-right text-sm text-foreground">Description</label>
              <Textarea id="eventDescription" value={currentEventForm.description} onChange={e => setCurrentEventForm({...currentEventForm, description: e.target.value})} className="col-span-3" placeholder="e.g., Casual get-together with games and food." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEvent}>{isEditing ? 'Save Changes' : 'Create Event'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventPlannerPage;