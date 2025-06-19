import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MapPin, ExternalLink, Star } from 'lucide-react';

export interface LocalSpot {
  id: string;
  name: string;
  category: string; // e.g., Restaurant, Park, Museum
  address?: string;
  description?: string;
  imageUrl?: string;
  websiteUrl?: string;
  rating?: number; // e.g., 1-5
}

interface LocalSpotEntryProps {
  spot: LocalSpot;
  onEdit?: (spotId: string) => void;
  onViewDirections?: (address: string) => void;
}

const LocalSpotEntry: React.FC<LocalSpotEntryProps> = ({ spot, onEdit, onViewDirections }) => {
  console.log("Rendering LocalSpotEntry for spot:", spot.name);

  return (
    <Card className="w-full overflow-hidden">
      {spot.imageUrl && (
        <div className="w-full">
          <AspectRatio ratio={16 / 9}>
            <img
              src={spot.imageUrl || '/placeholder.svg'}
              alt={spot.name}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{spot.name}</CardTitle>
            {spot.rating && (
                <div className="flex items-center text-sm text-amber-500">
                    <Star className="h-4 w-4 fill-current mr-1" /> {spot.rating.toFixed(1)}
                </div>
            )}
        </div>
        <CardDescription>{spot.category}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {spot.description && <p className="text-gray-600 line-clamp-3">{spot.description}</p>}
        {spot.address && (
          <div className="flex items-center text-gray-500">
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
            <span>{spot.address}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-2">
        <div className="flex gap-2">
            {spot.address && onViewDirections && (
            <Button variant="outline" size="sm" onClick={() => onViewDirections(spot.address!)}>
                <MapPin className="mr-1 h-4 w-4" /> Directions
            </Button>
            )}
            {spot.websiteUrl && (
            <a href={spot.websiteUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                <ExternalLink className="mr-1 h-4 w-4" /> Website
                </Button>
            </a>
            )}
        </div>
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={() => onEdit(spot.id)}>
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default LocalSpotEntry;