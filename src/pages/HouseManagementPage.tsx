import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RoomDetailView, { RoomDetails } from '@/components/RoomDetailView';
import { InventoryItem } from '@/components/InventoryItemChip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Conceptual, not implementing full react-hook-form
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';

interface Floor {
  id: string;
  name: string;
  rooms: RoomDetails[];
}

const initialFloors: Floor[] = [
  {
    id: 'floor1',
    name: 'Downstairs',
    rooms: [
      {
        id: 'room1', name: 'Living Room', description: 'Main relaxation area', floor: 'Downstairs',
        items: [
          { id: 'item1', name: 'Green Sofa', quantity: 2, category: 'Furniture' },
          { id: 'item2', name: 'Coffee Table', quantity: 1, category: 'Furniture' },
          { id: 'item3', name: 'Smart TV', quantity: 1, category: 'Electronics' },
        ]
      },
      {
        id: 'room2', name: 'Kitchen', description: 'Where the magic happens', floor: 'Downstairs',
        items: [ { id: 'item4', name: 'Dining Table', quantity: 1, category: 'Furniture' } ]
      },
    ]
  },
  {
    id: 'floor2',
    name: 'Upstairs',
    rooms: [
      {
        id: 'room3', name: 'Master Bedroom', description: 'Rest and sleep', floor: 'Upstairs',
        items: [ { id: 'item5', name: 'King Size Bed', quantity: 1, category: 'Furniture' } ]
      },
    ]
  }
];

// Form state types
interface RoomFormData {
  name: string;
  description: string;
  floorId: string;
}
interface ItemFormData {
  name: string;
  quantity: number;
  category: string;
  roomId: string;
  floorId: string;
}


const HouseManagementPage: React.FC = () => {
  console.log('HouseManagementPage loaded');
  const [floors, setFloors] = useState<Floor[]>(initialFloors);
  const [activeTab, setActiveTab] = useState<string>(initialFloors[0]?.id || '');

  const [isAddRoomDialogOpen, setIsAddRoomDialogOpen] = useState(false);
  const [currentRoomFormData, setCurrentRoomFormData] = useState<RoomFormData>({ name: '', description: '', floorId: '' });

  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [currentItemFormData, setCurrentItemFormData] = useState<ItemFormData>({ name: '', quantity: 1, category: '', roomId: '', floorId: '' });


  const handleAddRoom = (floorId: string) => {
    setCurrentRoomFormData({ name: '', description: '', floorId });
    setIsAddRoomDialogOpen(true);
  };

  const handleSaveRoom = () => {
    if (!currentRoomFormData.name.trim() || !currentRoomFormData.floorId) return;
    setFloors(prevFloors =>
      prevFloors.map(floor =>
        floor.id === currentRoomFormData.floorId
          ? { ...floor, rooms: [...floor.rooms, { id: `room-${Date.now()}`, name: currentRoomFormData.name, description: currentRoomFormData.description, floor: floor.name, items: [] }] }
          : floor
      )
    );
    setIsAddRoomDialogOpen(false);
  };

  const handleAddItemToRoom = (roomId: string, floorId: string) => {
    setCurrentItemFormData({ name: '', quantity: 1, category: '', roomId, floorId });
    setIsAddItemDialogOpen(true);
  };

  const handleSaveItem = () => {
     if (!currentItemFormData.name.trim() || !currentItemFormData.roomId || !currentItemFormData.floorId) return;
     setFloors(prevFloors =>
        prevFloors.map(floor =>
          floor.id === currentItemFormData.floorId
            ? {
                ...floor,
                rooms: floor.rooms.map(room =>
                  room.id === currentItemFormData.roomId
                    ? { ...room, items: [...room.items, { id: `item-${Date.now()}`, name: currentItemFormData.name, quantity: currentItemFormData.quantity, category: currentItemFormData.category }] }
                    : room
                )
              }
            : floor
        )
     );
     setIsAddItemDialogOpen(false);
  };
  
  // Placeholder for edit functions
  const handleEditItem = (itemId: string, roomId: string) => console.log(`Edit item ${itemId} in room ${roomId}`);
  const handleEditRoom = (roomId: string) => console.log(`Edit room ${roomId}`);


  return (
    <div className="flex h-screen bg-gray-100">
      <NavigationMenu className="w-64" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header appName="House Management" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="container mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {floors.map(floor => (
                  <TabsTrigger key={floor.id} value={floor.id}>{floor.name}</TabsTrigger>
                ))}
                {/* <Button variant="ghost" size="sm" className="ml-auto" onClick={() => alert("Add new floor dialog would open")}>+ Add Floor</Button> */}
              </TabsList>
              {floors.map(floor => (
                <TabsContent key={floor.id} value={floor.id}>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{floor.name} Overview</CardTitle>
                        <Button onClick={() => handleAddRoom(floor.id)} size="sm">
                          <PlusCircle className="mr-2 h-4 w-4" /> Add Room
                        </Button>
                      </div>
                      <CardDescription>Manage rooms and inventory on this floor.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {floor.rooms.length > 0 ? floor.rooms.map(room => (
                        <RoomDetailView
                          key={room.id}
                          room={room}
                          onAddItem={() => handleAddItemToRoom(room.id, floor.id)}
                          onEditItem={handleEditItem}
                          onEditRoom={handleEditRoom}
                        />
                      )) : <p className="text-gray-500">No rooms added to {floor.name} yet. Click "Add Room" to get started.</p>}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>

      {/* Add Room Dialog */}
      <Dialog open={isAddRoomDialogOpen} onOpenChange={setIsAddRoomDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
            <DialogDescription>Enter details for the new room in {floors.find(f => f.id === currentRoomFormData.floorId)?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="roomName" className="text-right">Name</label>
              <Input id="roomName" value={currentRoomFormData.name} onChange={(e) => setCurrentRoomFormData(prev => ({...prev, name: e.target.value}))} className="col-span-3" placeholder="e.g., Bedroom, Office" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="roomDescription" className="text-right">Description</label>
              <Textarea id="roomDescription" value={currentRoomFormData.description} onChange={(e) => setCurrentRoomFormData(prev => ({...prev, description: e.target.value}))} className="col-span-3" placeholder="e.g., Guest bedroom with south-facing window" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoomDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveRoom}>Save Room</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Add an item to {floors.find(f => f.id === currentItemFormData.floorId)?.rooms.find(r => r.id === currentItemFormData.roomId)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="itemName" className="text-right">Item Name</label>
                <Input id="itemName" value={currentItemFormData.name} onChange={(e) => setCurrentItemFormData(prev => ({...prev, name: e.target.value}))} className="col-span-3" placeholder="e.g., Two Green Sofas" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="itemQuantity" className="text-right">Quantity</label>
                <Input id="itemQuantity" type="number" value={currentItemFormData.quantity} onChange={(e) => setCurrentItemFormData(prev => ({...prev, quantity: parseInt(e.target.value,10) || 1}))} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="itemCategory" className="text-right">Category</label>
                <Select value={currentItemFormData.category} onValueChange={(value) => setCurrentItemFormData(prev => ({...prev, category: value}))}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Appliance">Appliance</SelectItem>
                        <SelectItem value="Decoration">Decoration</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveItem}>Save Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default HouseManagementPage;