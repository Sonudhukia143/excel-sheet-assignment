// SheetCell.tsx
// Description: Renders a single cell, including editable logic and ellipsis for overflow. Edit here to change cell editing, validation, or cell-level UI. If highlight is true, a green border is shown for the selected cell.
import React from 'react';
import { ResizableBox } from 'react-resizable';

type SheetCellProps = {
  value: string;
  isEditing: boolean;
  editValue: string;
  onEdit: () => void;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditBlur: () => void;
  onEditKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  highlight?: boolean;
  handleResize: (colId: string, width: number) => void;
  colId: string;
  width: number;
  minWidth?: number;
  maxWidth?: number;
  isLastCol?: boolean;
  isLastRow?: boolean;
  resizable?: boolean;
};

const SheetCell: React.FC<SheetCellProps> = ({ value, isEditing, editValue, onEdit, onEditChange, onEditBlur, onEditKeyDown, children, highlight, handleResize, colId, width, minWidth = 60, maxWidth = 600, isLastCol = false, isLastRow = false, resizable = true }) => {
  const borderRight = isLastCol ? '0.5px solid #F6F6F6' : '0.5px solid #F6F6F6';
  const borderBottom = isLastRow ? '0.5px solid #F6F6F6' : '0.5px solid #F6F6F6';
  if (!resizable) {
    return (
      <div
        className={`flex items-center h-8 box-border px-2 cursor-pointer transition-colors border-dashed border-l-[1.3px] border-[#CBCBCB] ${highlight ? 'relative z-10 border-2 border-green-500 bg-green-50 shadow-[0_0_0_2px_rgba(34,197,94,0.15)]' : 'bg-white'}`}
        style={highlight
          ? { minWidth: 0, width: '100%' }
          : {
              minWidth: 0,
              width: '100%',
              borderRight,
              borderBottom,
              borderLeftStyle: 'dashed',
              borderLeftWidth: '1.3px',
              borderLeftColor: '#CBCBCB',
              borderImage: 'repeating-linear-gradient(to bottom, #CBCBCB 0 8px, transparent 8px 18px) 1',
            }
        }
        onClick={onEdit}
      >
        {isEditing ? (
          <input
            className="w-full h-full outline-none text-xs font-bold bg-white"
            value={editValue}
            autoFocus
            onChange={onEditChange}
            onBlur={onEditBlur}
            onKeyDown={onEditKeyDown}
          />
        ) : (
          children || <span className="truncate overflow-hidden whitespace-nowrap w-full">{value}</span>
        )}
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
      handle={<span className="absolute right-0 top-0 h-full w-[1px] cursor-col-resize bg-[#F6F6F6] hover:bg-[#94A3B8] transition-colors " />}
      className="relative"
    >
      <div
        className={`flex items-center h-8 box-border px-2 cursor-pointer transition-colors ${highlight ? 'relative z-10 border-2 border-green-500 bg-green-50 shadow-[0_0_0_2px_rgba(34,197,94,0.15)]' : 'bg-white'}`}
        style={highlight
          ? { minWidth: 0, width: '100%' }
          : { minWidth: 0, width: '100%', borderRight, borderBottom }
        }
        onClick={onEdit}
      >
        {isEditing ? (
          <input
            className="w-full h-full outline-none text-xs font-bold bg-white"
            value={editValue}
            autoFocus
            onChange={onEditChange}
            onBlur={onEditBlur}
            onKeyDown={onEditKeyDown}
          />
        ) : (
          children || <span className="truncate overflow-hidden whitespace-nowrap w-full">{value}</span>
        )}
      </div>
    </ResizableBox>
  );
}

export default SheetCell; 