import React, { useLayoutEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';

type ColumnDropdownProps = {
  colId: string;
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  onHideColumn: (colId: string) => void;
  onShowAllColumns: () => void;
  closeDropdown: () => void;
};

const ColumnDropdown: React.FC<ColumnDropdownProps> = ({ 
  colId, 
  isOpen, 
  anchorRef, 
  onHideColumn, 
  onShowAllColumns, 
  closeDropdown
}) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (isOpen && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  const handleHide = () => {
    onHideColumn(colId);
    closeDropdown();
  };
  const handleShowAll = () => {
    onShowAllColumns();
    closeDropdown();
  };

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuPortal>
        <DropdownMenuContent
          sideOffset={4}
          align="start"
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            minWidth: 140,
            background: 'white',
            color: 'black',
            borderRadius: 8,
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
            padding: 0,
            zIndex: 9999,
          }}
        >
          <DropdownMenuItem
            className="w-full justify-start px-3 py-2 text-sm text-black hover:bg-gray-100 rounded-none border-0 shadow-none cursor-pointer"
            onSelect={() => {
              handleHide();
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              handleHide();
            }}
          >
            Hide Column
          </DropdownMenuItem>
          <DropdownMenuItem
            className="w-full justify-start px-3 py-2 text-sm text-black hover:bg-gray-100 rounded-none border-0 shadow-none cursor-pointer"
            onSelect={() => {
              handleShowAll();
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              handleShowAll();
            }}
          >
            Show All Columns
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default ColumnDropdown; 