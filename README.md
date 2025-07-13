# React Spreadsheet Prototype - Inscripts Intern Assignment

A pixel-perfect, interactive spreadsheet UI built for the React Intern Assignment at Inscripts. This project demonstrates advanced React skills with TypeScript, modern UI patterns, and spreadsheet-like functionality.

## 🚀 Live Demo

🔗 **[View the Live Site](https://excel-sheet-assignment.vercel.app/)** 

## 🎯 Project Overview

This is my submission for the React.js Internship at Inscripts. Built as a front-end-only prototype that closely matches the spreadsheet UI from the provided Figma design, featuring:

- **Pixel-perfect layout** matching the Figma design specifications
- **Google Sheets/Excel-like experience** with full keyboard navigation
- **Interactive elements** - all buttons, tabs, and dropdowns are functional
- **Responsive design** that adapts to different screen sizes
- **Clean, maintainable code** with TypeScript strict mode

## 🛠 Tech Stack

- **React 18** (Vite) - Latest React with fast development experience
- **TypeScript** (strict mode) - Type-safe development
- **Tailwind CSS** - Utility-first styling for pixel-perfect layouts
- **@tanstack/react-table** - Powerful table library for spreadsheet functionality
- **react-resizable** - Column resize functionality
- **Lucide React** - Beautiful, consistent icons

## ✨ Key Features

### 🎨 UI/UX Excellence
- **Pixel-perfect layout** matching Figma design
- **Sticky headers** and row numbers for better navigation
- **Custom scrollbars** with smooth scrolling experience
- **Responsive grid** that always fills the viewport
- **Professional color scheme** with proper contrast ratios

### 📊 Spreadsheet Functionality
- **Column resize** - Drag to resize columns with visual feedback
- **Column hide/show** - Toggle column visibility via dropdown menus
- **Dynamic width calculation** - Columns redistribute when hidden/shown
- **Cell editing** - Click to edit cells with keyboard support
- **Keyboard navigation** - Full arrow key, Tab, Enter, Escape support

### ⌨️ Keyboard Shortcuts
- **Arrow keys** - Navigate between cells
- **Tab** - Move right (wraps to next row)
- **Shift+Tab** - Move left (wraps to previous row)
- **Enter** - Start editing focused cell
- **Escape** - Exit editing or selection

### 🔧 Interactive Elements
All UI elements are functional and log to console:
- **Top bar navigation** - Workspace, folder, spreadsheet breadcrumbs
- **Toolbar buttons** - Import, Export, New Action
- **Tab navigation** - All Orders, Pending, Reviewed, Arrived
- **Column dropdowns** - Hide columns, show all columns
- **Cell interactions** - Click, edit, focus
- **Add tab button** - Creates new tabs

## 📝 Setup & Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Sonudhukia143/excel-sheet-assignment
cd excel-sheet-assignment

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint + Prettier
npm run type-check   # TypeScript strict mode check
```

## 🚀 Deployment Guide

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import your repository
   - Vercel will automatically detect it's a Vite project
   - Deploy with default settings

3. **Custom Domain (Optional)**
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain

### Alternative: Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository for automatic deployments

## 🧪 Quality Assurance

### Code Quality
- ✅ **ESLint + Prettier** - Consistent code formatting
- ✅ **TypeScript strict mode** - Type safety throughout
- ✅ **Clean commit history** - Meaningful commit messages
- ✅ **Modular architecture** - Well-organized component structure

### Testing
- ✅ **All interactive elements** log to console (no dead UI)
- ✅ **Keyboard navigation** works as expected
- ✅ **Responsive design** tested on different screen sizes
- ✅ **Cross-browser compatibility** tested on Chrome, Firefox, Safari

## 📁 Project Structure

```
src/
├── components/
│   ├── sheet/           # Main spreadsheet components
│   │   ├── columns/     # Column definitions and logic
│   │   ├── dropdowns/   # Column dropdown menus
│   │   ├── headers/     # Header components and icons
│   │   └── *.tsx        # Core sheet components
│   ├── ui/              # Reusable UI components
│   ├── TopBar.tsx       # Top navigation bar
│   ├── Row.tsx          # Toolbar row
│   └── TitleRow.tsx     # Bottom tab navigation
├── hooks/
│   └── useSheet.ts      # Main spreadsheet state and logic
├── lib/
│   ├── sheetData.ts     # Data, column config, utilities
│   ├── utils.ts         # Helper functions
│   └── button-variants.ts # Button styling variants
└── App.tsx              # Main application component
```

## ⚡ Technical Trade-offs

### Design Decisions
- **No state management library** - Used React's built-in state as per requirements
- **Custom table implementation** - Built on react-table but heavily customized for pixel-perfect layout
- **Local state only** - No persistence (front-end only prototype)
- **Vite over CRA** - Faster development experience and smaller bundle size

### Performance Optimizations
- **Memoized components** - Prevent unnecessary re-renders
- **Efficient column calculations** - Dynamic width distribution
- **Lazy loading ready** - Structure supports code splitting
- **Optimized re-renders** - Minimal state updates

## 🎨 Design Fidelity

The implementation closely follows the Figma design with:
- **Exact color codes** from the design system
- **Precise spacing** using Tailwind's pixel-perfect utilities
- **Matching typography** with Inter font family
- **Consistent shadows** and border styles
- **Proper icon usage** with Lucide React

## 📞 Contact & Links

**Sonu** - React Developer & Student

- 📧 **Email:** [jagdishdhukia770@gmail.com](mailto:jagdishdhukia770@gmail.com)

- 💼 **LinkedIn:** [linkedin.com/in/sonu-dhukia-web770](https://www.linkedin.com/in/sonu-dhukia-web770/)

- 🐙 **GitHub:** [github.com/Sonudhukia143](https://github.com/Sonudhukia143)

## 📄 License

This project is created for the Inscripts React Intern Assignment. All rights reserved.

---

**Thank you for reviewing my assignment!** I hope this demonstrates both my technical proficiency and passion for building great user experiences. 🚀
