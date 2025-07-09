import { useCallback } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import 'react-resizable/css/styles.css';
import SheetTabs from './SheetTabs';
import SheetHeaderRow from './SheetHeaderRow';
import SheetBody from './SheetBody';
import ColumnDropdown from './dropdowns/ColumnDropdown';
import { useColumns } from './columns/useColumns';
import { calculateSheetWidth, ROW_NUMBER_COL_WIDTH, BLANK_COL, type SheetRow } from '../../lib/sheetData';

// Props interface for all the state and handlers from useSheet
type SheetProps = {
  sheetContentRef: React.RefObject<HTMLDivElement | null>;
  onSheetScroll?: () => void;
  // State from useSheet
  columnWidths: Record<string, number>;
  data: SheetRow[];
  editingCell: { rowIdx: number; colId: string } | null;
  editValue: string;
  focusedCell: { rowIdx: number; colId: string } | null;
  visibleColumns: string[];
  openDropdown: string | null;
  verticalScrollRef: React.RefObject<HTMLDivElement | null>;
  // Handlers from useSheet
  handleCellClick: (rowIdx: number, colId: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleResize: (colId: string, width: number) => void;
  handleHideColumn: (colId: string) => void;
  handleShowAllColumns: () => void;
  handleToggleDropdown: (colId: string) => void;
  closeDropdown: () => void;
  // Setters from useSheet
  setEditingCell: (cell: { rowIdx: number; colId: string } | null) => void;
  setEditValue: (value: string) => void;
  setFocusedCell: (cell: { rowIdx: number; colId: string } | null) => void;
};

const Sheet = ({ 
  sheetContentRef, 
  onSheetScroll,
  // Destructure all the props from useSheet
  columnWidths,
  data,
  editingCell,
  editValue,
  focusedCell,
  visibleColumns,
  openDropdown,
  verticalScrollRef,
  handleCellClick,
  handleInputChange,
  handleInputBlur,
  handleInputKeyDown,
  handleResize,
  handleHideColumn,
  handleShowAllColumns,
  handleToggleDropdown,
  closeDropdown,
  setFocusedCell,
}: SheetProps) => {
  const { columns, chevronRefs } = useColumns({
    onToggleDropdown: handleToggleDropdown,
    visibleColumns,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Keyboard navigation handler
  const handleGridKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!focusedCell || editingCell) return;
    const { rowIdx, colId } = focusedCell;
    const colIdx = visibleColumns.indexOf(colId);
    let nextRow = rowIdx;
    let nextCol = colIdx;
    if (e.key === 'ArrowRight') {
      nextCol = Math.min(colIdx + 1, visibleColumns.length - 1);
    } else if (e.key === 'ArrowLeft') {
      nextCol = Math.max(colIdx - 1, 0);
    } else if (e.key === 'ArrowDown') {
      nextRow = Math.min(rowIdx + 1, data.length - 1);
    } else if (e.key === 'ArrowUp') {
      nextRow = Math.max(rowIdx - 1, 0);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab: move left, wrap to previous row if needed
        if (colIdx > 0) {
          setFocusedCell({ rowIdx, colId: visibleColumns[colIdx - 1] });
        } else if (rowIdx > 0) {
          setFocusedCell({ rowIdx: rowIdx - 1, colId: visibleColumns[visibleColumns.length - 1] });
        }
      } else {
        // Tab: move right, wrap to next row if needed
        if (colIdx < visibleColumns.length - 1) {
          setFocusedCell({ rowIdx, colId: visibleColumns[colIdx + 1] });
        } else if (rowIdx < data.length - 1) {
          setFocusedCell({ rowIdx: rowIdx + 1, colId: visibleColumns[0] });
        }
      }
      return;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // Start editing the focused cell
      handleCellClick(rowIdx, colId);
      return;
    } else if (e.key === 'Escape') {
      e.preventDefault();
      // Exit editing
      setFocusedCell(null);
      return;
    } else {
      return;
    }
    e.preventDefault();
    setFocusedCell({ rowIdx: nextRow, colId: visibleColumns[nextCol] });
  }, [focusedCell, editingCell, visibleColumns, data.length, setFocusedCell, handleCellClick]);

  // Calculate tab cell widths for SheetTabs
  const tabCellWidths = [
    ROW_NUMBER_COL_WIDTH,
    columnWidths.job + columnWidths.submitted + columnWidths.status + columnWidths.submitter,
    columnWidths.url,
    columnWidths.assigned,
    columnWidths.priority + columnWidths.due,
    columnWidths.value,
    columnWidths[BLANK_COL],
  ];

  // Calculate total sheet width for scrolling
  const totalSheetWidth = calculateSheetWidth(columnWidths, visibleColumns);

  return (
    <div className="sheet-viewport flex-1 bg-[#F6F6F6] rounded w-full h-full pr-4 z-100 relative flex flex-col" style={{position: 'relative', overflowY: 'auto'}}>
      {/* Removed Show All Columns button */}
      <div
        className="sheet-vertical-scroll "
        ref={verticalScrollRef}
        style={{ height: 'calc(100vh - 159px)', overflowY: 'auto', overflowX: 'visible', position: 'relative' }}
        tabIndex={0}
        onKeyDown={handleGridKeyDown}
      >
        <div
          className="custom-scrollbar "
          ref={sheetContentRef}
          style={{ width: `${totalSheetWidth}px`, overflowX: 'auto', overflowY: 'hidden' }}
          onScroll={() => onSheetScroll && onSheetScroll()}
        >
      {/* Sheet Selection Tabs */}
          <SheetTabs tabCellWidths={tabCellWidths} />
      {/* Header Row */}
          <SheetHeaderRow table={table} columnWidths={columnWidths} handleResize={handleResize} visibleColumns={visibleColumns} />
      {/* Body Rows */}
      <SheetBody
        table={table}
        columnWidths={columnWidths}
        editingCell={editingCell}
        editValue={editValue}
        onCellEdit={handleCellClick}
        onEditChange={handleInputChange}
        onEditBlur={handleInputBlur}
        onEditKeyDown={handleInputKeyDown}
            handleResize={handleResize}
            focusedCell={focusedCell}
            setFocusedCell={setFocusedCell}
            visibleColumns={visibleColumns}
      />
        </div>
      </div>
      
      {/* Render dropdowns */}
      {openDropdown && chevronRefs[openDropdown as keyof typeof chevronRefs] && (
        <ColumnDropdown
          colId={openDropdown}
          isOpen={true}
          anchorRef={chevronRefs[openDropdown as keyof typeof chevronRefs]}
          onHideColumn={handleHideColumn}
          onShowAllColumns={handleShowAllColumns}
          closeDropdown={closeDropdown}
        />
      )}
    </div>
  );
};

export default Sheet;