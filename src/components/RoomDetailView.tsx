import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InventoryItemChip, { InventoryItem } from './InventoryItemChip'; // Import the chip component
import { PlusCircle, Edit2 } from 'lucide-react';
// Assume a Dialog and Form component would be used for adding/editing items, imported from shadcn/ui
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export interface RoomDetails {
  id: string;
  name: string;
  description?: string;
  floor?: string;
  items: InventoryItem[];
}

interface RoomDetailViewProps {
  room: RoomDetails;
  onAddItem: (roomId: string) => void; // Callback to open add item dialog
  onEditItem: (itemId: string, roomId: string) => void; // Callback to open edit item dialog
  onEditRoom?: (roomId: string) => void; // Callback to edit room details
}

const RoomDetailView: React.FC<RoomDetailViewProps> = ({ room, onAddItem, onEditItem, onEditRoom }) => {
  console.log("Rendering RoomDetailView for room:", room.name);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-xl">{room.name}</CardTitle>
          {room.description && (
            <CardDescription className="mt-1">{room.description}</CardDescription>
          )}
          {room.floor && (
            <p className="text-xs text-gray-500 mt-1">Floor: {room.floor}</p>
          )}
        </div>
        {onEditRoom && (
          <Button variant="ghost" size="icon" onClick={() => onEditRoom(room.id)} aria-label="Edit Room Details">
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <h4 className="text-sm font-medium mb-2 text-gray-700">Inventory Items:</h4>
        {room.items.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {room.items.map((item) => (
              <InventoryItemChip
                key={item.id}
                item={item}
                onClick={() => onEditItem(item.id, room.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No items added to this room yet.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => onAddItem(room.id)} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomDetailView;