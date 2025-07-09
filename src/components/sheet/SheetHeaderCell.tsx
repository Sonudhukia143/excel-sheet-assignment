// SheetHeaderCell.tsx
// Description: Renders a single column header, including the icon, label, and resizable handle. Edit here to change header cell content, icons, or resizable logic.
import React from 'react';
import { ResizableBox } from 'react-resizable';

type SheetHeaderCellProps = {
  width: number;
  minWidth?: number;
  maxWidth?: number;
  children: React.ReactNode;
  handleResize: (colId: string, width: number) => void;
  colId: string;
  resizable?: boolean;
};

const SheetHeaderCell: React.FC<SheetHeaderCellProps> = ({ width, minWidth = 60, maxWidth = 600, children, handleResize, colId, resizable = true }) => {
  if (!resizable) {
    return (
      <div
        className="flex items-center h-8 box-border  bg-[#FFFFFF] font-semibold text-xs text-[#374151] "
        style={{ width, minWidth, maxWidth, border: '0px solid #F6F6F6' }}
      >
        
      </div>
    );
  }
  return (
    <ResizableBox
      width={width}
      height={32}
      axis="x"
      minConstraints={[minWidth, 32]}
      maxConstraints={[maxWidth, 32]}
      onResizeStop={(_e, data) => handleResize(colId, data.size.width)}
      handle={<span className="absolute right-0 top-0 h-full w-1 cursor-col-resize  hover:bg-blue-200 transition-colors rounded-r" style={{zIndex: 10}} />}
      className="relative"
    >
      <div
        className="flex items-center h-8 box-border bg-[#EEEEEE] font-bold truncate w-full "
        style={{ width: '100%', minWidth, maxWidth, border: '0.5px solid #FFFFFF' }}
      >
        <div className="flex-1 min-w-0 flex items-center  truncate font-bold ">{children}</div>
      </div>
    </ResizableBox>
  );
};

export default SheetHeaderCell; 