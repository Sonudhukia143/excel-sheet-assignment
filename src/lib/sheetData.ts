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
    job: 'Create mobile app for restaurant ordering',
    submitted: '15-10-2024',
    status: 'In-process',
    submitter: 'Alex Thompson',
    url: 'www.alexthompson.dev',
    assigned: 'Maria Garcia',
    priority: 'High',
    due: '25-10-2024',
    value: '7,200,000',
    notes: 'Include payment integration',
  },
  {
    job: 'Redesign company website homepage',
    submitted: '03-09-2024',
    status: 'Complete',
    submitter: 'Sarah Wilson',
    url: 'www.sarahwilson.design',
    assigned: 'James Chen',
    priority: 'Medium',
    due: '15-09-2024',
    value: '4,500,000',
    notes: 'Client approved final design',
  },
  {
    job: 'Build analytics dashboard for sales team',
    submitted: '20-08-2024',
    status: 'Blocked',
    submitter: 'Michael Brown',
    url: 'www.michaelbrown.tech',
    assigned: 'Lisa Anderson',
    priority: 'High',
    due: '30-08-2024',
    value: '6,800,000',
    notes: 'Waiting for API documentation',
  },
  {
    job: 'Conduct usability testing for e-commerce site',
    submitted: '08-11-2024',
    status: 'Need to start',
    submitter: 'Emma Davis',
    url: 'www.emmadavis.ux',
    assigned: 'Robert Taylor',
    priority: 'Low',
    due: '20-11-2024',
    value: '2,100,000',
    notes: '',
  },
  {
    job: 'Implement dark mode for web application',
    submitted: '25-12-2024',
    status: 'In-process',
    submitter: 'David Lee',
    url: 'www.davidlee.code',
    assigned: 'Jennifer White',
    priority: 'Medium',
    due: '05-01-2025',
    value: '3,900,000',
    notes: 'Ensure accessibility compliance',
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