# React Spreadsheet Prototype

A pixel-perfect, interactive spreadsheet UI built for the React Intern Assignment.

## 🚀 Live Demo

🔗 [View the Live Site](https://inscripts-react-assignment.vercel.app/) | 
[Github](https://github.com/Abhishek1334) | [Portfolio](https://abhishek-rajoria.vercel.app/) | [Linkedin](https://www.linkedin.com/in/abhishekrajoria/)

## 🛠 Tech Stack
- React 18 (Vite)
- TypeScript (strict mode)
- Tailwind CSS
- react-table

## ✨ Features
- Pixel-perfect layout matching Figma
- Google Sheets/Excel-like experience
- Column resize, hide/show, and dynamic width
- Sticky header, row numbers, scrollbars
- All buttons/tabs/dropdowns are interactive (no dead UI)
- Keyboard navigation (arrow keys, Tab, Shift+Tab, Enter, Escape)
- Responsive: grid always fills viewport, columns redistribute on hide/show
- Lint and type-check clean

## ⌨️ Keyboard Shortcuts
- **Arrow keys**: Move between cells
- **Tab**: Move right (wraps to next row)
- **Shift+Tab**: Move left (wraps to previous row)
- **Escape**: Exit select

## 📝 Setup
```bash
npm install
npm run dev
```

## 🧪 Quality
- `npm run lint` — ESLint + Prettier
- `npm run type-check` — TypeScript strict mode
- `npm run build` — Production build

## ⚡ Trade-offs
- No backend/state management library (per requirements)
- Uses react-table for grid logic, but customizes for pixel-perfect layout
- Only local state; no persistence

## 📁 Structure
- `src/components/sheet/` — Main spreadsheet UI
- `src/hooks/useSheet.ts` — Sheet state/logic
- `src/lib/sheetData.ts` — Data, column config, utils

---
