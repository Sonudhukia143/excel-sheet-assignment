export type SheetRow = {
  job: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  due: string;
  value: string;
  notes: string;
};

// First 5 rows: mock data
export const baseRows: SheetRow[] = [
  {
    job: 'Develop AI-powered chatbot for customer support',
    submitted: '12-09-2024',
    status: 'In-process',
    submitter: 'Priya Sharma',
    url: 'www.priyasharma.dev',
    assigned: 'Rahul Mehta',
    priority: 'High',
    due: '20-09-2024',
    value: '8,500,000',
    notes: 'Integrate with WhatsApp',
  },
  {
    job: 'Design marketing assets for product launch',
    submitted: '01-08-2024',
    status: 'Complete',
    submitter: 'Carlos Rivera',
    url: 'www.carlosrivera.art',
    assigned: 'Mina Patel',
    priority: 'Medium',
    due: '10-08-2024',
    value: '2,200,000',
    notes: 'Approved by client',
  },
  {
    job: 'Implement payment gateway integration',
    submitted: '18-07-2024',
    status: 'Blocked',
    submitter: 'Sophie Müller',
    url: 'www.sophiemuller.com',
    assigned: 'David Kim',
    priority: 'High',
    due: '25-07-2024',
    value: '5,000,000',
    notes: 'Waiting for API keys',
  },
  {
    job: 'Conduct user research interviews',
    submitted: '05-10-2024',
    status: 'Need to start',
    submitter: 'Liam O’Connor',
    url: 'www.liamoconnor.io',
    assigned: 'Sara Lee',
    priority: 'Low',
    due: '15-10-2024',
    value: '1,100,000',
    notes: '',
  },
  {
    job: 'Optimize website SEO for new blog',
    submitted: '22-11-2024',
    status: 'In-process',
    submitter: 'Emily Chen',
    url: 'www.emilychenwrites.com',
    assigned: 'Mohit Verma',
    priority: 'Medium',
    due: '30-11-2024',
    value: '3,300,000',
    notes: 'Focus on mobile',
  },
];

// Remaining 95 rows: empty
export const emptyRows: SheetRow[] = Array.from({ length: 95 }, () => ({
  job: '',
  submitted: '',
  status: '',
  submitter: '',
  url: '',
  assigned: '',
  priority: '',
  due: '',
  value: '',
  notes: '',
}));

export const defaultData: SheetRow[] = [...baseRows, ...emptyRows];

// Constants
export const ROW_NUMBER_COL_WIDTH = 48;
export const BLANK_COL = 'blank1';
export const BLANK_COL_MIN_WIDTH = 60;
export const colKeys = [
  'job', 'submitted', 'status', 'submitter', 'url', 'assigned', 'priority', 'due', 'value', BLANK_COL
];
export const borderWidth = 0.5; // px

// Utility functions
export const getInitialColumnWidths = () => {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1440;
  // Fixed column: index
  const totalFixed = ROW_NUMBER_COL_WIDTH;
  const numCols = colKeys.length + 2; // +2 for index and blank
  const totalBorder = borderWidth * numCols;
  const availableWidth = screenWidth - totalFixed - totalBorder;
  const colWidth = Math.floor(availableWidth / (colKeys.length + 1)); // +1 for blank col
  const widths: Record<string, number> = {};
  colKeys.forEach((key) => {
    widths[key] = colWidth;
  });
  // Pixel-perfect: blank col absorbs any remainder
  const used = colKeys.reduce((sum, key) => sum + widths[key], 0);
  const blankColWidth = availableWidth - used;
  widths[BLANK_COL] = blankColWidth > 0 ? blankColWidth : colWidth;
  return widths;
};

// New function to calculate widths based on visible columns
export const calculateColumnWidths = (visibleColumns: string[], currentWidths: Record<string, number> = {}) => {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const totalFixed = ROW_NUMBER_COL_WIDTH;
  const numCols = visibleColumns.length + 1; // +1 for row number column
  const totalBorder = borderWidth * numCols;
  const availableWidth = screenWidth - totalFixed - totalBorder;
  
  const widths: Record<string, number> = {};
  
  // Check if any columns have been manually resized
  const hasResizedColumns = visibleColumns.some(col => currentWidths[col] && currentWidths[col] > 0);
  
  if (hasResizedColumns) {
    // Use existing widths for resized columns, distribute remaining space
    let usedWidth = 0;
    let unresizedColumns = 0;
    
    visibleColumns.forEach(col => {
      if (currentWidths[col] && currentWidths[col] > 0) {
        widths[col] = currentWidths[col];
        usedWidth += currentWidths[col];
      } else {
        unresizedColumns++;
      }
    });
    
    // Distribute remaining space among unresized columns
    const remainingWidth = availableWidth - usedWidth;
    const colWidth = unresizedColumns > 0 ? Math.floor(remainingWidth / unresizedColumns) : 0;
    
    visibleColumns.forEach(col => {
      if (!currentWidths[col] || currentWidths[col] <= 0) {
        widths[col] = colWidth;
      }
    });
  } else {
    // All columns are equal width, fill viewport
    const colWidth = Math.floor(availableWidth / visibleColumns.length);
    
    visibleColumns.forEach(col => {
      widths[col] = colWidth;
    });
  }
  
  return widths;
};

export const calculateSheetWidth = (widths: Record<string, number>, visibleColumns: string[] = colKeys) => {
  let totalWidth = ROW_NUMBER_COL_WIDTH + borderWidth * (visibleColumns.length + 1);
  for (const key of visibleColumns) {
    totalWidth += widths[key] || 0;
  }
  return totalWidth;
};

export const updateColumnWidths = (newWidths: Record<string, number>) => {
  // Always maintain minimum blank column width
  const updatedWidths = { ...newWidths, [BLANK_COL]: Math.max(BLANK_COL_MIN_WIDTH, newWidths[BLANK_COL] || BLANK_COL_MIN_WIDTH) };
  return updatedWidths;
}; 