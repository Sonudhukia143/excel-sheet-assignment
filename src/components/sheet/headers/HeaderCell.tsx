import React from 'react';
import { ChevronDown } from 'lucide-react';

type HeaderCellProps = {
  title: string;
  icon?: React.ReactNode;
  colId: string;
  onToggleDropdown: (colId: string) => void;
  chevronRef: React.RefObject<HTMLButtonElement>;
  children?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
};

const HeaderCell: React.FC<HeaderCellProps> = ({
  title,
  icon,
  colId,
  onToggleDropdown,
  chevronRef,
  children,
  bgColor = 'bg-[#EEEEEE]',
  textColor = 'text-[#757575]'
}) => {
  return (
    <div className={`relative flex items-center justify-between font-sans w-full ${textColor} box-border px-2 h-8 gap-1 ${bgColor} dropdown-container`}>
      <div className="flex items-center gap-1">
        {icon}
        <span className="font-bold text-[13px]">{title}</span>
      </div>
      <button
        ref={chevronRef}
        className="flex items-center justify-center hover:bg-gray-200 rounded p-1"
        onClick={() => onToggleDropdown(colId)}
      >
        <ChevronDown size={15} className="ml-1 text-[#AFAFAF]" />
      </button>
      {children}
    </div>
  );
};

export default HeaderCell; 