import React from 'react';
import { Info } from 'lucide-react';

type FloatingToggleProps = {
  onClick: () => void;
};

const FloatingToggle: React.FC<FloatingToggleProps> = ({ onClick }) => (
  <button
    className="fixed bottom-6 right-6 z-[1020] w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
    onClick={onClick}
    aria-label="Show info modal"
    type="button"
  >
    <Info size={28} />
  </button>
);

export default FloatingToggle; 