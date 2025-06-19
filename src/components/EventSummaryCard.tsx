import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPinIcon, Edit3 } from 'lucide-react'; // Example icons

export interface EventSummary {
  id: string;
  title: string;
  date: string; // Or Date object, format as needed
  time?: string;
  location?: string;
  description?: string;
}

interface EventSummaryCardProps {
  event: EventSummary;
  onEdit?: (eventId: string) => void;
  onViewDetails?: (eventId: string) => void;
}

const EventSummaryCard: React.FC<EventSummaryCardProps> = ({ event, onEdit, onViewDetails }) => {
  console.log("Rendering EventSummaryCard for event:", event.title);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">{event.title}</CardTitle>
        {event.description && (
          <CardDescription className="line-clamp-2">{event.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
          <span>{event.date} {event.time && `- ${event.time}`}</span>
        </div>
        {event.location && (
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4 text-gray-500" />
            <span>{event.location}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {onViewDetails && (
          <Button variant="outline" size="sm" onClick={() => onViewDetails(event.id)}>
            View Details
          </Button>
        )}
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={() => onEdit(event.id)}>
            <Edit3 className="mr-1 h-4 w-4" /> Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventSummaryCard;