import TopBar from "@/components/TopBar.tsx"
import Row from "@/components/Row.tsx"
import Sheet from "./components/sheet/Sheet"
import TitleRow from "@/components/TitleRow.tsx"
import { useRef, useState, useEffect } from "react"
import { useSheet } from "./hooks/useSheet"
import Modal from "@/components/ui/Modal";
import FloatingToggle from "@/components/ui/FloatingToggle";
import { CheckCircle, Mail, Github, Linkedin, Globe, Sparkles } from 'lucide-react';

function App() {
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const stickyScrollRef = useRef<HTMLDivElement>(null);
  const [sheetWidth, setSheetWidth] = useState<number>(window.innerWidth);
  const [selectedTab, setSelectedTab] = useState<string>('All Orders');
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Show modal only once per user (on first visit)
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('modalShown') !== 'true') {
      setShowModal(true);
    }
  }, []);

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

  // Auto-close modal after 10 seconds
  useEffect(() => {
    if (showModal) {
      timerRef.current = window.setTimeout(() => {
        setShowModal(false);
        localStorage.setItem('modalShown', 'true');
      }, 10000);
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [showModal]);

  // When modal is closed manually, set localStorage
  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem('modalShown', 'true');
  };

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

      {/* Modal for welcome message */}
      <Modal open={!showModal} onClose={handleCloseModal}>
        <div className="text-gray-800">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 p-3 rounded-t-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-sm">
            <Sparkles size={32} className="shrink-0" />
            <div>
              <div className="text-xl font-bold leading-tight">React Internship Assignment – Inscripts</div>
              <div className="text-sm opacity-90">by Abhishek Rajoria</div>
            </div>
          </div>
          {/* Intro */}
          <div className="px-2 pb-2">
            <div className="mb-2">Hello! <span role="img" aria-label="wave">👋</span> I’m <b>Abhishek Rajoria</b>, a passionate MERN Stack Developer and current BCA student from VIPS, New Delhi.</div>
            <div className="mb-4">This project is my submission for the React.js Internship at Inscripts. It’s a front-end-only prototype built with <b>React 18</b>, <b>TypeScript (strict mode)</b>, <b>Tailwind CSS</b>, and <b>react-table</b>, designed to closely match the spreadsheet UI from the given Figma.</div>
            {/* Features */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="font-semibold mb-2 text-gray-700">Key Features</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-green-600"><CheckCircle size={18} /> Pixel-perfect layout</li>
                <li className="flex items-center gap-2 text-green-600"><CheckCircle size={18} /> Interactive spreadsheet-like experience</li>
                <li className="flex items-center gap-2 text-green-600"><CheckCircle size={18} /> All buttons/tabs functional (log to console)</li>
                <li className="flex items-center gap-2 text-green-600"><CheckCircle size={18} /> Responsive design, clean folder structure, ESLint & type-check passed</li>
              </ul>
            </div>
            {/* Motivation */}
            <div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded-lg mb-4">
              <div className="font-semibold text-blue-700 mb-1 flex items-center gap-2"><Sparkles size={18} /> Why this internship matters to me</div>
              <div className="text-sm text-blue-900">I’m truly excited about the opportunity to intern at Inscripts—a company that blends real-time interaction, scale, and innovation. I’ve spent the last few years honing my skills through hands-on projects like an IoT-powered event platform, a real-time stock analytics dashboard, and a property booking app inspired by Airbnb. I’m eager to now take those skills into a professional setting where I can learn from a talented team, contribute meaningfully, and grow as a front-end developer.</div>
            </div>
            <div className="mb-4 text-sm text-gray-700">Thank you for reviewing my assignment—I hope it reflects both my technical proficiency and passion for building great UI.</div>
            {/* Contact */}
            <div className="font-semibold mb-1">Let’s connect!</div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <a href="mailto:AbhishekRajoria24@gmail.com" className="flex items-center gap-2 text-blue-700 hover:underline"><Mail size={18} /> AbhishekRajoria24@gmail.com</a>
              <a href="https://abhishekrajoria.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-700 hover:underline"><Globe size={18} /> Portfolio</a>
              <a href="https://github.com/Abhishek1334" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-700 hover:underline"><Github size={18} /> GitHub</a>
              <a href="https://www.linkedin.com/in/abhishekrajoria/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-700 hover:underline"><Linkedin size={18} /> LinkedIn</a>
            </div>
          </div>
        </div>
      </Modal>
      <FloatingToggle onClick={() => setShowModal(true)} />
    </div>
  )
}

export default App
