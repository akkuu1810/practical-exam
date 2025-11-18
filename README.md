# MyProperty Insure Services - Inspections Page

A fully responsive React.js web application replicating the Inspections page design for MyProperty Insure Services.

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Sidebar navigation with collapsible menu
- ✅ Inspections table with pagination
- ✅ Search and filter functionality
- ✅ Modern UI with Tailwind CSS
- ✅ Clean component structure

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
practical-exam/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   ├── Header.jsx        # Top header bar
│   │   ├── Footer.jsx        # Footer component
│   │   └── InspectionsTable.jsx  # Inspections data table
│   ├── pages/
│   │   └── Inspections.jsx   # Inspections page
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px
- **Desktop**: ≥ 1024px (lg)

## Features Implemented

1. **Sidebar Navigation**
   - Collapsible on desktop
   - Slide-in menu on mobile
   - Active page highlighting
   - Navigation and Management sections

2. **Header**
   - Notifications icon
   - User profile with dropdown indicator
   - Mobile menu toggle

3. **Inspections Page**
   - Search functionality
   - Filter tags with remove option
   - Data table with all inspection details
   - Pagination controls
   - Responsive table with horizontal scroll on mobile

4. **Footer**
   - Copyright information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

2025 © All Rights Reserved. MyPropertyInsure Services
