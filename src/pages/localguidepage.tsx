import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LocalSpotEntry, { LocalSpot } from '@/components/LocalSpotEntry';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const initialLocalSpots: LocalSpot[] = [
  { id: 'spot1', name: 'Alhambra Palace', category: 'Monument', address: 'Calle Real de la Alhambra, s/n, 18009 Granada', description: 'Breathtaking Moorish palace and fortress complex. Book tickets in advance!', imageUrl: 'https://images.unsplash.com/photo-1583034601786-18095a515751?q=80&w=800&auto=format&fit=crop', rating: 5, websiteUrl: 'https://www.alhambradegranada.org/' },
  { id: 'spot2', name: 'Restaurante Chikito', category: 'Restaurant', address: 'Pl. del Campillo, 9, 18009 Granada', description: 'Traditional Granadian cuisine, famous for its history and ambiance. Try the Sacromonte omelette.', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop', rating: 4.5, websiteUrl: 'http://restaurantechikito.com/' },
  { id: 'spot3', name: 'Panadería San Juan', category: 'Shop', address: 'Calle San Juan de Dios, 15, 18001 Granada', description: 'Excellent local bakery for fresh bread and pastries.', imageUrl: 'https://images.unsplash.com/photo-1568254691372-0700233a791c?q=80&w=800&auto=format&fit=crop', rating: 4 },
  { id: 'spot4', name: 'Mirador de San Nicolás', category: 'Viewpoint', address: 'Plaza Mirador de San Nicolás, s/n, 18010 Granada', description: 'Iconic viewpoint with stunning views of the Alhambra and Sierra Nevada, especially at sunset.', imageUrl: 'https://images.unsplash.com/photo-1609042850000-d2f990eacc9c?q=80&w=800&auto=format&fit=crop', rating: 4.8},
];

interface SpotFormData {
  id?: string;
  name: string;
  category: string;
  address: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  rating: number;
}

const LocalGuidePage: React.FC = () => {
  console.log('LocalGuidePage loaded');
  const [spots, setSpots] = useState<LocalSpot[]>(initialLocalSpots);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSpotDialogOpen, setIsSpotDialogOpen] = useState(false);
  const [currentSpotForm, setCurrentSpotForm] = useState<SpotFormData>({ name: '', category: 'Restaurant', address: '', description: '', imageUrl: '', websiteUrl: '', rating: 0 });
  const [isEditingSpot, setIsEditingSpot] = useState(false);

  const handleOpenNewSpotDialog = () => {
    setIsEditingSpot(false);
    setCurrentSpotForm({ name: '', category: 'Restaurant', address: '', description: '', imageUrl: '', websiteUrl: '', rating: 0 });
    setIsSpotDialogOpen(true);
  };

  const handleOpenEditSpotDialog = (spot: LocalSpot) => {
    setIsEditingSpot(true);
    setCurrentSpotForm({
        id: spot.id,
        name: spot.name,
        category: spot.category,
        address: spot.address || '',
        description: spot.description || '',
        imageUrl: spot.imageUrl || '',
        websiteUrl: spot.websiteUrl || '',
        rating: spot.rating || 0,
    });
    setIsSpotDialogOpen(true);
  };

  const handleSaveSpot = () => {
    if (!currentSpotForm.name.trim() || !currentSpotForm.category.trim()) return;
    const newSpot: LocalSpot = {
        id: isEditingSpot && currentSpotForm.id ? currentSpotForm.id : `spot-${Date.now()}`,\
        name: currentSpotForm.name,
        category: currentSpotForm.category,
        address: currentSpotForm.address,
        description: currentSpotForm.description,
        imageUrl: currentSpotForm.imageUrl,
        websiteUrl: currentSpotForm.websiteUrl,
        rating: Number(currentSpotForm.rating),
    };
    if (isEditingSpot) {
        setSpots(prevSpots => prevSpots.map(s => s.id === newSpot.id ? newSpot : s));
    } else {
        setSpots(prevSpots => [...prevSpots, newSpot]);
    }
    setIsSpotDialogOpen(false);
  };

  const handleViewDirections = (address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  const filteredSpots = spots.filter(spot =>
    spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spot.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (spot.description && spot.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-background text-foreground">
      <NavigationMenu className="w-64" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header appName="Local Guide - Granada" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="container mx-auto">
            <Card> {/* Card is theme-aware */}
              <CardHeader>
                <CardTitle>Your Granada Guide</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search spots (e.g., Alhambra, tapas, bakery)"
                      className="w-full pl-8" // Input is theme-aware
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleOpenNewSpotDialog} className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Spot
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {filteredSpots.length > 0 ? (
                  <ScrollArea className="h-[calc(100vh-320px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
                      {filteredSpots.map(spot => (
                        <LocalSpotEntry
                          key={spot.id}
                          spot={spot}
                          onEdit={() => handleOpenEditSpotDialog(spot)}
                          onViewDirections={spot.address ? handleViewDirections : undefined}
                        />
                      ))}\
                    </div>
                  </ScrollArea>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No spots found matching your search, or no spots added yet.
                  </p>
                )}\
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>

      {/* Add/Edit Spot Dialog */}
      <Dialog open={isSpotDialogOpen} onOpenChange={setIsSpotDialogOpen}>
        <DialogContent className="sm:max-w-lg"> {/* DialogContent is theme-aware */}
          <DialogHeader>
            <DialogTitle>{isEditingSpot ? 'Edit Local Spot' : 'Add New Local Spot'}</DialogTitle>
            <DialogDescription>
              {isEditingSpot ? 'Update the details for this spot.' : 'Save a new point of interest, restaurant, or shop.'}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-2"> {/* Added pr-2 to prevent scrollbar overlap in some cases */}
            <div className="grid gap-4 py-4 px-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="spotName" className="text-right text-sm text-foreground">Name</label>
                <Input id="spotName" value={currentSpotForm.name} onChange={e => setCurrentSpotForm({...currentSpotForm, name: e.target.value})} className="col-span-3" placeholder="e.g., Alhambra Palace" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="spotCategory" className="text-right text-sm text-foreground">Category</label>
                <Select value={currentSpotForm.category} onValueChange={value => setCurrentSpotForm({...currentSpotForm, category: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent> {/* SelectContent is theme-aware */}
                    <SelectItem value="Monument">Monument</SelectItem>
                    <SelectItem value="Restaurant">Restaurant</SelectItem>
                    <SelectItem value="Cafe">Cafe / Bar</SelectItem>
                    <SelectItem value="Shop">Shop</SelectItem>
                    <SelectItem value="Park">Park / Nature</SelectItem>
                    <SelectItem value="Viewpoint">Viewpoint</SelectItem>
                    <SelectItem value="Museum">Museum</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="spotAddress" className="text-right text-sm text-foreground">Address</label>
                <Input id="spotAddress" value={currentSpotForm.address} onChange={e => setCurrentSpotForm({...currentSpotForm, address: e.target.value})} className="col-span-3" placeholder="e.g., Calle Real de la Alhambra, s/n" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="spotDescription" className="text-right text-sm text-foreground">Description</label>
                <Textarea id="spotDescription" value={currentSpotForm.description} onChange={e => setCurrentSpotForm({...currentSpotForm, description: e.target.value})} className="col-span-3" placeholder="Notes, opening hours, tips..." />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="spotImageUrl" className="text-right text-sm text-foreground">Image URL</label>
                <Input id="spotImageUrl" value={currentSpotForm.imageUrl} onChange={e => setCurrentSpotForm({...currentSpotForm, imageUrl: e.target.value})} className="col-span-3" placeholder="https://example.com/image.jpg" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="spotWebsiteUrl" className="text-right text-sm text-foreground">Website URL</label>
                <Input id="spotWebsiteUrl" value={currentSpotForm.websiteUrl} onChange={e => setCurrentSpotForm({...currentSpotForm, websiteUrl: e.target.value})} className="col-span-3" placeholder="https://example.com" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="spotRating" className="text-right text-sm text-foreground">Rating (0-5)</label>
                <Input id="spotRating" type="number" min="0" max="5" step="0.1" value={currentSpotForm.rating} onChange={e => setCurrentSpotForm({...currentSpotForm, rating: parseFloat(e.target.value)})} className="col-span-3" />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="px-6 pb-4 pt-2">
            <Button variant="outline" onClick={() => setIsSpotDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSpot}>{isEditingSpot ? 'Save Changes' : 'Add Spot'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocalGuidePage;