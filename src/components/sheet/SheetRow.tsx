// SheetRow.tsx
// Description: Renders a single data row, including the row number and all cells. Edit here to change row layout, add row actions, or adjust row styling.
import React from 'react';
import SheetCell from './SheetCell';
import type { Row, Cell } from '@tanstack/react-table';
import type { SheetRow } from '../../lib/sheetData';

type SheetRowProps = {
  rowIdx: number;
  row: Row<SheetRow>;
  columnWidths: Record<string, number>;
  editingCell: { rowIdx: number; colId: string } | null;
  editValue: string;
  onCellEdit: (rowIdx: number, colId: string) => void;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditBlur: () => void;
  onEditKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleResize: (colId: string, width: number) => void;
  isLastRow?: boolean;
  focusedCell: { rowIdx: number; colId: string } | null;
  setFocusedCell: (cell: { rowIdx: number; colId: string }) => void;
  visibleColumns: string[];
};

const SheetRowComponent: React.FC<SheetRowProps> = ({ rowIdx, row, columnWidths, editingCell, editValue, onCellEdit, onEditChange, onEditBlur, onEditKeyDown, handleResize, isLastRow = false, focusedCell, setFocusedCell, visibleColumns }) => {
  const visibleCells = row.getVisibleCells().filter(cell => visibleColumns.includes(cell.column.id));
  return (
    <div className="flex">
      {/* Row Number Cell */}
      <div
        className="flex items-center justify-center box-border bg-white text-xs font-bold text-[#757575] sticky left-0 z-0 select-none "
        style={{ width: 32, minWidth: 32, maxWidth: 32, height: 32, minHeight: 32, maxHeight: 32, fontSize: 13, borderBottom: '0.5px solid #E2E2E2' }}
      >
        {rowIdx + 1}
      </div>
      {visibleCells.map((cell: Cell<SheetRow, unknown>, idx: number) => {
        const isEditing = !!(editingCell && editingCell.rowIdx === rowIdx && editingCell.colId === cell.column.id);
        const isFocused = !!(focusedCell && focusedCell.rowIdx === rowIdx && focusedCell.colId === cell.column.id);
        const isLastCol = idx === visibleCells.length - 1;
        const resizable = (cell.column.columnDef.meta as { resizable?: boolean })?.resizable !== false;
        return (
          <div key={cell.id} style={{ width: columnWidths[cell.column.id], minWidth: 0 }}
            onClick={() => setFocusedCell({ rowIdx, colId: cell.column.id })}
          >
            <SheetCell
              value={cell.getValue() as string}
              isEditing={isEditing}
              editValue={editValue}
              onEdit={() => onCellEdit(rowIdx, cell.column.id)}
              onEditChange={onEditChange}
              onEditBlur={onEditBlur}
              onEditKeyDown={onEditKeyDown}
              highlight={isEditing || isFocused}
              handleResize={handleResize}
              colId={cell.column.id}
              width={columnWidths[cell.column.id]}
              minWidth={60}
              maxWidth={600}
              isLastCol={isLastCol}
              isLastRow={isLastRow}
              resizable={resizable}
            >
              {typeof cell.column.columnDef.cell === 'function'
                ? cell.column.columnDef.cell(cell.getContext())
                : cell.column.columnDef.cell}
            </SheetCell>
          </div>
        );
      })}
    </div>
  );
}

export default SheetRowComponent; 