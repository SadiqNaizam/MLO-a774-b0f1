import React from 'react';
import { Badge } from '@/components/ui/badge'; // Using shadcn Badge as a base
import { Package, Tag, Palette } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

export interface InventoryItem {
  id: string;
  name: string;
  quantity?: number;
  category?: string;
  color?: string; // Example additional property
}

interface InventoryItemChipProps {
  item: InventoryItem;
  onClick?: (itemId: string) => void;
  className?: string;
}

const InventoryItemChip: React.FC<InventoryItemChipProps> = ({ item, onClick, className }) => {
  console.log("Rendering InventoryItemChip for item:", item.name);

  const handleClick = () => {
    if (onClick) {
      onClick(item.id);
    }
  };

  // Example: Different icon based on category or presence of certain properties
  const IconComponent = item.category === 'Electronics' ? Package : item.color ? Palette : Tag;

  return (
    <Badge
      variant="secondary" // This variant will use themed bg-secondary, text-secondary-foreground and hover:bg-secondary/80
      className={cn(
        "cursor-pointer transition-colors py-1 px-2.5 flex items-center space-x-1.5",
        className
      )}
      onClick={handleClick}
      title={`Item: ${item.name}${item.quantity ? ` (Qty: ${item.quantity})` : ''}`}\
    >
      <IconComponent className="h-3.5 w-3.5 text-secondary-foreground/80" />
      <span className="text-xs font-medium text-secondary-foreground">{item.name}</span>
      {item.quantity && <span className="text-xs text-secondary-foreground/70">({item.quantity})</span>}
    </Badge>
  );
};

export default InventoryItemChip;