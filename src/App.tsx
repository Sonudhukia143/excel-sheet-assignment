import TopBar from "@/components/TopBar.tsx"
import Row from "@/components/Row.tsx"
import Sheet from "./components/sheet/Sheet"
import TitleRow from "@/components/TitleRow.tsx"
import { useRef, useState, useEffect } from "react"
import { useSheet } from "./hooks/useSheet"

function App() {
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const stickyScrollRef = useRef<HTMLDivElement>(null);
  const [sheetWidth, setSheetWidth] = useState<number>(window.innerWidth);
  const [selectedTab, setSelectedTab] = useState<string>('All Orders');

  // Move useSheet to App level to prevent state reset
  const sheetState = useSheet();

  // Update sheet width when sheet content changes
  const updateSheetWidth = () => {
    if (sheetContentRef.current) {
      const newWidth = sheetContentRef.current.scrollWidth;
      setSheetWidth(newWidth);
    }
  };

  // Initial width update
  useEffect(() => {
    const timer = setTimeout(updateSheetWidth, 100);
    return () => clearTimeout(timer);
  }, []);

  // Sync scroll between sheet and sticky scrollbar
  const handleSheetScroll = () => {
    if (stickyScrollRef.current && sheetContentRef.current) {
      const scrollLeft = sheetContentRef.current.scrollLeft;
      if (stickyScrollRef.current.scrollLeft !== scrollLeft) {
        stickyScrollRef.current.scrollLeft = scrollLeft;
      }
    }
  };

  const handleStickyScroll = () => {
    if (stickyScrollRef.current && sheetContentRef.current) {
      const scrollLeft = stickyScrollRef.current.scrollLeft;
      if (sheetContentRef.current.scrollLeft !== scrollLeft) {
        sheetContentRef.current.scrollLeft = scrollLeft;
      }
    }
  };

  return (
    <div className="flex flex-col max-w-screen relative min-h-screen ">
      <div className="z-[100] relative"><TopBar /></div>
      <Row />
      <Sheet 
        sheetContentRef={sheetContentRef} 
        onSheetScroll={handleSheetScroll}
        {...sheetState}
      />
      
      {/* Sticky horizontal scrollbar positioned just above TitleRow with minimal spacing */}
      <div className="fixed left-0 right-0 bottom-16 h-3 z-[90] bg-white border-t border-gray-200">
        <div
          ref={stickyScrollRef}
          className="w-full h-full overflow-x-auto overflow-y-hidden"
          onScroll={handleStickyScroll}
          style={{ marginLeft: 48 }} // Account for row number column width
        >
          <div
            style={{ 
              width: `${Math.max(sheetWidth - 48, window.innerWidth - 48)}px`, 
              height: 1
            }}
          />
        </div>
      </div>

      {/* Fixed TitleRow at the bottom of the viewport */}
      <div className="fixed left-0 right-0 bottom-0 h-12 z-[80] shadow-[0_-2px_8px_0_rgba(0,0,0,0.06)] bg-white">
        <TitleRow selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
    </div>
  )
}

export default App
