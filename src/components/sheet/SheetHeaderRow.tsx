// SheetHeaderRow.tsx
// Description: Renders the header row, including the row number header and all column headers. Edit here to change header row layout, add features like select-all, or adjust header styling.
import React from 'react';
import SheetHeaderCell from './SheetHeaderCell';
import type { Table, Header } from '@tanstack/react-table';
import type { SheetRow } from '../../lib/sheetData';

type SheetHeaderRowProps = {
  table: Table<SheetRow>;
  columnWidths: Record<string, number>;
  handleResize: (colId: string, width: number) => void;
  visibleColumns: string[];
};

const SheetHeaderRow: React.FC<SheetHeaderRowProps> = ({ table, columnWidths, handleResize, visibleColumns }) => {
  const headers = table.getHeaderGroups()[0].headers;
  return (
    <div className="flex w-full bg-[#EEEEEE] border-b border-[#E5E7EB] sticky top-0 z-[60]">
      {/* Row Number Header */}
      <div
        className="flex items-center justify-center box-border bg-[#EEEEEE] text-xs font-bold text-[#757575] sticky left-0 z-10 select-none"
        style={{ width: 32, minWidth: 32, maxWidth: 32, height: 32, minHeight: 32, maxHeight: 32, fontSize: 13 }}
      >
        <div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.32461 0.926275C6.37593 0.654944 6.19758 0.39338 5.92625 0.342055C5.65492 0.29073 5.39336 0.46908 5.34203 0.740411L4.66264 4.33202L1.49977 4.3335C1.22362 4.33362 0.999872 4.55759 1 4.83373C1.00013 5.10987 1.22409 5.33362 1.50023 5.3335L4.47347 5.33211L3.84297 8.66526L0.8331 8.66667C0.556958 8.6668 0.333205 8.89076 0.333334 9.1669C0.333463 9.44304 0.557425 9.6668 0.833568 9.66667L3.65379 9.66535L3.00868 13.0757C2.95736 13.3471 3.13571 13.6086 3.40704 13.66C3.67837 13.7113 3.93993 13.5329 3.99126 13.2616L4.67161 9.66487L8.32091 9.66317L7.67539 13.0757C7.62406 13.3471 7.80241 13.6086 8.07374 13.66C8.34508 13.7113 8.60664 13.5329 8.65796 13.2616L9.33873 9.66269L12.5002 9.66121C12.7764 9.66109 13.0001 9.43712 13 9.16098C12.9999 8.88484 12.7759 8.66109 12.4998 8.66121L9.52791 8.6626L10.1584 5.32945L13.1669 5.32804C13.443 5.32792 13.6668 5.10395 13.6667 4.82781C13.6665 4.55167 13.4426 4.32791 13.1664 4.32804L10.3476 4.32936L10.9913 0.926275C11.0426 0.654944 10.8643 0.39338 10.593 0.342055C10.3216 0.29073 10.0601 0.46908 10.0087 0.740411L9.32976 4.32984L5.68047 4.33154L6.32461 0.926275ZM5.49129 5.33163L9.14059 5.32993L8.51009 8.66308L4.86079 8.66478L5.49129 5.33163Z" fill="#AFAFAF"/>
</svg>
        </div>
      </div>
      {headers.filter(header => visibleColumns.includes(header.column.id)).map((header: Header<SheetRow, unknown>, idx: number) => (
        <SheetHeaderCell
          key={header.id}
          width={columnWidths[header.column.id]}
          minWidth={60}
          maxWidth={headers[idx + 1] ? columnWidths[header.column.id] + ((columnWidths[headers[idx + 1]?.column?.id] || 0) - 60) : columnWidths[header.column.id]}
          handleResize={handleResize}
          colId={header.column.id}
          resizable={(header.column.columnDef.meta as unknown as { resizable?: boolean })?.resizable !== false}
        >
          <div className="flex items-center h-8 box-border font-bold text-sm text-[#374151] bg-[#EEEEEE] truncate w-full ">
            {typeof header.column.columnDef.header === 'function'
              ? header.column.columnDef.header(header.getContext())
              : header.column.columnDef.header}
          </div>
        </SheetHeaderCell>
      ))}
    </div>
  );
};

export default SheetHeaderRow; 