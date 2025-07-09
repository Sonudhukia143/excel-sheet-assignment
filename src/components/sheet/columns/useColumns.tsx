import { useMemo, useRef } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Globe, User, Clock, ChevronDown } from 'lucide-react';
import type { SheetRow } from '../../../lib/sheetData';
import { BLANK_COL } from '../../../lib/sheetData';

type UseColumnsProps = {
  onToggleDropdown: (colId: string) => void;
  visibleColumns: string[];
};

export const useColumns = ({
  onToggleDropdown,
  visibleColumns,
}: UseColumnsProps) => {
  const jobChevronRef = useRef<HTMLButtonElement>(null);
  const submittedChevronRef = useRef<HTMLButtonElement>(null);
  const statusChevronRef = useRef<HTMLButtonElement>(null);
  const submitterChevronRef = useRef<HTMLButtonElement>(null);
  const urlChevronRef = useRef<HTMLButtonElement>(null);

  const allColumns = useMemo<ColumnDef<SheetRow, unknown>[]>(
    () => [
      {
        accessorKey: 'job',
        header: () => (
          <div className="relative flex items-center justify-between font-sans w-full text-[#757575] box-border px-2 h-8 gap-1 bg-[#EEEEEE]">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[13px]">Job Request</span>
            </div>
            <button
              ref={jobChevronRef}
              className="flex items-center justify-center hover:bg-gray-200 rounded p-1"
              onClick={() => onToggleDropdown('job')}
            >
              <ChevronDown size={16} className="text-[#AFAFAF]" />
            </button>
          </div>
        ),
        cell: info => (
          <span className="font-sans font-bold text-xs leading-4 text-[#121212] h-4 w-[240px] flex items-center truncate overflow-hidden whitespace-nowrap">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'submitted',
        header: () => (
          <div className="relative flex items-center justify-between font-sans w-full text-[#757575] box-border px-2 h-8 gap-1 bg-[#EEEEEE]">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[13px]">Submitted</span>
            </div>
            <button
              ref={submittedChevronRef}
              className="flex items-center justify-center hover:bg-gray-200 rounded p-1"
              onClick={() => onToggleDropdown('submitted')}
            >
              <ChevronDown size={16} className="text-[#AFAFAF]" />
            </button>
          </div>
        ),
        cell: info => (
          <span className="font-bold text-xs text-right w-full box-border px-2 h-8 flex items-center justify-end truncate overflow-hidden whitespace-nowrap">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: () => (
          <div className="relative flex items-center justify-between font-sans w-full text-[#757575] box-border px-2 h-8 gap-1 bg-[#EEEEEE]">
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-[#AFAFAF]" />
              <span className="font-bold text-[13px]">Status</span>
            </div>
            <button
              ref={statusChevronRef}
              className="flex items-center justify-center hover:bg-gray-200 rounded p-1"
              onClick={() => onToggleDropdown('status')}
            >
              <ChevronDown size={16} className="text-[#AFAFAF]" />
            </button>
          </div>
        ),
        cell: info => {
          const value = info.getValue() as string;
          let bg = '';
          let text = '';
          if (value === 'In-process') { bg = 'bg-[#FFF3D6]'; text = 'text-[#85640B]'; }
          else if (value === 'Need to start') { bg = 'bg-[#E2E8F0]'; text = 'text-[#475569]'; }
          else if (value === 'Complete') { bg = 'bg-[#D3F2E3]'; text = 'text-[#0A6E3D]'; }
          else if (value === 'Blocked') { bg = 'bg-[#FFE1DE]'; text = 'text-[#C22219]'; }
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${bg} ${text} mx-auto box-border truncate overflow-hidden whitespace-nowrap`}>
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: 'submitter',
        header: () => (
          <div className="relative flex items-center justify-between font-sans w-full text-[#757575] box-border px-2 h-8 gap-1 bg-[#EEEEEE]">
            <div className="flex items-center gap-1">
              <User size={16} className="text-[#AFAFAF]" />
              <span className="font-bold text-[13px]">Submitter</span>
            </div>
            <button
              ref={submitterChevronRef}
              className="flex items-center justify-center hover:bg-gray-200 rounded p-1"
              onClick={() => onToggleDropdown('submitter')}
            >
              <ChevronDown size={16} className="text-[#AFAFAF]" />
            </button>
          </div>
        ),
        cell: info => (
          <span className="font-bold text-xs box-border px-2 h-8 flex items-center truncate overflow-hidden whitespace-nowrap">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'url',
        header: () => (
          <div className="relative flex items-center justify-between font-sans w-full text-[#757575] box-border px-2 h-8 gap-1 bg-[#EEEEEE]">
            <div className="flex items-center gap-1">
              <Globe size={16} className="text-[#AFAFAF]" />
              <span className="font-bold text-[13px]">URL</span>
            </div>
            <button
              ref={urlChevronRef}
              className="flex items-center justify-center hover:bg-gray-200 rounded p-1"
              onClick={() => onToggleDropdown('url')}
            >
              <ChevronDown size={16} className="text-[#AFAFAF]" />
            </button>
          </div>
        ),
        cell: info => (
          <a
            href={`https://${info.getValue()}`}
            className="font-bold text-xs underline text-[#121212] box-border px-2 h-8 flex items-center truncate overflow-hidden whitespace-nowrap"
          >
            {info.getValue() as string}
          </a>
        ),
      },
      {
        accessorKey: 'assigned',
        header: () => (
          <div className="flex items-center font-sans w-full text-[#666C66] box-border px-2 h-8 gap-1 bg-[#E8F0E9]">
            <span className="font-bold text-[13px]">Assigned</span>
          </div>
        ),
        cell: info => (
          <span className="font-bold text-xs box-border px-2 h-8 flex items-center truncate overflow-hidden whitespace-nowrap">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'priority',
        header: () => (
          <div className="flex items-center font-sans w-full text-[#655C80] box-border px-2 h-8 gap-1 bg-[#EAE3FC]">
            <span className="font-bold text-[13px]">Priority</span>
          </div>
        ),
        cell: info => {
          const value = info.getValue() as string;
          let color = '';
          if (value === 'High') color = 'text-[#EF4D44]';
          else if (value === 'Medium') color = 'text-[#C29210]';
          else color = 'text-[#1A8CFF]';
          return (
            <span className={`font-semibold text-xs ${color} truncate overflow-hidden whitespace-nowrap mx-auto`}>
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: 'due',
        header: () => (
          <div className="flex items-center font-sans w-full text-[#655C80] box-border px-2 h-8 gap-1 bg-[#EAE3FC]">
            <span className="font-bold text-[13px]">Due Date</span>
          </div>
        ),
        cell: info => (
          <span className="font-bold text-xs text-right w-full box-border px-2 h-8 flex items-center justify-end truncate overflow-hidden whitespace-nowrap">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'value',
        header: () => (
          <div className="flex items-center font-sans w-full text-[#8C6C62] box-border px-2 h-8 gap-1 bg-[#FFE9E0]">
            <span className="font-bold text-[13px]">Est. Value</span>
          </div>
        ),
        cell: info => {
          const value = info.getValue() as string;
          return value ? (
            <span className="font-bold text-xs text-right w-full box-border px-2 h-8 flex items-center justify-end truncate overflow-hidden whitespace-nowrap">
              {value}
              <span style={{ marginLeft: 4 }} className="text-[#AFAFAF]">₹</span>
            </span>
          ) : (
            <span className="font-bold text-xs text-right w-full box-border px-2 h-8 flex items-center justify-end truncate overflow-hidden whitespace-nowrap"></span>
          );
        },
      },
      {
        accessorKey: BLANK_COL,
        header: () => (
          <div className="flex items-center font-sans w-full text-[#ffffff] box-border h-8 bg-[#ffffff]">
          </div>
        ),
        cell: () => <span className="w-full h-8 block" />,
        meta: { resizable: false },
      },
    ], [onToggleDropdown]
  );

  function hasAccessorKey(col: ColumnDef<SheetRow, unknown>): col is ColumnDef<SheetRow, unknown> & { accessorKey: string } {
    return 'accessorKey' in col && typeof (col as { accessorKey?: unknown }).accessorKey === 'string';
  }

  // Only return columns that are visible
  const columns = useMemo(
    () => allColumns.filter(col => hasAccessorKey(col) && visibleColumns.includes(col.accessorKey)),
    [allColumns, visibleColumns]
  );

  return { 
    columns,
    chevronRefs: {
      job: jobChevronRef,
      submitted: submittedChevronRef,
      status: statusChevronRef,
      submitter: submitterChevronRef,
      url: urlChevronRef,
    }
  };
}; 