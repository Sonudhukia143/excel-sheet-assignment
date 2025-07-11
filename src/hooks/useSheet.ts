import { useState, useEffect, useRef, useCallback } from 'react';
import { defaultData, getInitialColumnWidths, updateColumnWidths, colKeys, calculateColumnWidths } from '../lib/sheetData';

export const useSheet = () => {
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(getInitialColumnWidths());
  const [data, setData] = useState(defaultData);
  const [editingCell, setEditingCell] = useState<{ rowIdx: number; colId: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [focusedCell, setFocusedCell] = useState<{ rowIdx: number; colId: string } | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(colKeys);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [resizedColumns, setResizedColumns] = useState<Set<string>>(new Set());
  const verticalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  }, [visibleColumns]);

  // Recalculate column widths when visible columns change
  useEffect(() => {
    // Only recalculate widths for non-resized columns
    const newWidths = calculateColumnWidths(visibleColumns, columnWidths);
    // Keep manually resized columns
    resizedColumns.forEach(col => {
      if (columnWidths[col]) newWidths[col] = columnWidths[col];
    });
    setColumnWidths(newWidths);
  }, [visibleColumns, columnWidths, resizedColumns]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Recalculate column widths on window resize
  useEffect(() => {
    const handleWindowResize = () => {
      const newWidths = calculateColumnWidths(visibleColumns, columnWidths);
      resizedColumns.forEach(col => {
        if (columnWidths[col]) newWidths[col] = columnWidths[col];
      });
      setColumnWidths(newWidths);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [visibleColumns, columnWidths, resizedColumns]);

  // On mount, set initial column widths
  useEffect(() => {
    const newWidths = calculateColumnWidths(visibleColumns);
    setColumnWidths(newWidths);
  }, [visibleColumns]);

  const handleCellClick = useCallback((rowIdx: number, colId: string) => {
    setEditingCell(null);
    setFocusedCell({ rowIdx, colId });
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  }, []);

  const handleInputBlur = useCallback(() => {
    if (editingCell) {
      const { rowIdx, colId } = editingCell;
      setData(prev => prev.map((row, idx) => idx === rowIdx ? { ...row, [colId]: editValue } : row));
      setEditingCell(null);
    }
  }, [editingCell, editValue]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  }, [handleInputBlur]);

  const handleResize = useCallback((colId: string, width: number) => {
    setColumnWidths(prev => {
      const newWidths = { ...prev, [colId]: width };
      return updateColumnWidths(newWidths);
    });
    setResizedColumns(prev => new Set(prev).add(colId));
  }, []);

  const handleHideColumn = useCallback((colId: string) => {
    setVisibleColumns(cols => {
      const newCols = cols.filter(c => c !== colId);
      return newCols;
    });
    setResizedColumns(prev => {
      const newSet = new Set(prev);
      newSet.delete(colId);
      return newSet;
    });
    setOpenDropdown(null);
  }, []);

  const handleShowAllColumns = useCallback(() => {
    setVisibleColumns(colKeys);
    setResizedColumns(new Set());
    setOpenDropdown(null);
  }, []);

  const handleToggleDropdown = useCallback((colId: string) => {
    setOpenDropdown(openDropdown === colId ? null : colId);
  }, [openDropdown]);

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  return {
    // State
    columnWidths,
    data,
    editingCell,
    editValue,
    focusedCell,
    visibleColumns,
    openDropdown,
    verticalScrollRef,
    
    // Handlers
    handleCellClick,
    handleInputChange,
    handleInputBlur,
    handleInputKeyDown,
    handleResize,
    handleHideColumn,
    handleShowAllColumns,
    handleToggleDropdown,
    closeDropdown,
    
    // Setters
    setEditingCell,
    setEditValue,
    setFocusedCell,
  };
}; 