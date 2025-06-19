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
      variant="secondary"
      className={cn(
        "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors py-1 px-2.5 flex items-center space-x-1.5",
        className
      )}
      onClick={handleClick}
      title={`Item: ${item.name}${item.quantity ? ` (Qty: ${item.quantity})` : ''}`}
    >
      <IconComponent className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
      {item.quantity && <span className="text-xs text-gray-500 dark:text-gray-400">({item.quantity})</span>}
    </Badge>
  );
};

export default InventoryItemChip;