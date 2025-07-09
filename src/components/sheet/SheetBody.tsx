// SheetBody.tsx
// Description: Renders all data rows. Edit here to change how rows are rendered, add row-level features, or adjust body styling.
import React from 'react';
import type { Table, Row } from '@tanstack/react-table';
import type { SheetRow } from '../../lib/sheetData';
import SheetRowComponent from './SheetRow';

type SheetBodyProps = {
  table: Table<SheetRow>;
  columnWidths: Record<string, number>;
  editingCell: { rowIdx: number; colId: string } | null;
  editValue: string;
  onCellEdit: (rowIdx: number, colId: string) => void;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditBlur: () => void;
  onEditKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleResize: (colId: string, width: number) => void;
  focusedCell: { rowIdx: number; colId: string } | null;
  setFocusedCell: (cell: { rowIdx: number; colId: string }) => void;
  visibleColumns: string[];
};

const SheetBody: React.FC<SheetBodyProps> = ({ table, columnWidths, editingCell, editValue, onCellEdit, onEditChange, onEditBlur, onEditKeyDown, handleResize, focusedCell, setFocusedCell, visibleColumns }) => {
  const rows = table.getRowModel().rows;
  return (
    <div className="flex flex-col ">
      {rows.map((row: Row<SheetRow>, rowIdx: number) => (
        <SheetRowComponent
          key={row.id}
          rowIdx={rowIdx}
          row={row}
          columnWidths={columnWidths}
          editingCell={editingCell}
          editValue={editValue}
          onCellEdit={onCellEdit}
          onEditChange={onEditChange}
          onEditBlur={onEditBlur}
          onEditKeyDown={onEditKeyDown}
          handleResize={handleResize}
          isLastRow={rowIdx === rows.length - 1}
          focusedCell={focusedCell}
          setFocusedCell={setFocusedCell}
          visibleColumns={visibleColumns}
        />
      ))}
    </div>
  );
};

export default SheetBody; 