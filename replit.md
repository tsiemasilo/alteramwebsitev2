# Alteram Website v2

## Overview
Modern, responsive redesign of the Alteram website featuring all requested sections and built with clean HTML, CSS, and JavaScript.

## Project Structure
- `index.html` - Main website file
- `src/geo-map.ts` - TypeScript source for D3.js map visualization
- `assets/js/geo-map.js` - Compiled JavaScript for interactive map
- `assets/js/script.js` - JavaScript for interactivity and animations
- `assets/css/styles.css` - Stylesheet with modern responsive design
- `assets/images/` - Logo and image assets
- `server.py` - Python HTTP server for development
- `package.json` - Node.js dependencies (D3.js, TypeScript)
- `tsconfig.json` - TypeScript compiler configuration

## Sections
1. **Home** - Hero section with tagline "Your Vision DELIVERED"
2. **About Us** - Company overview and core values (Customer Focused, Quality, Innovation, People Centric)
3. **Services** - ICT services including Managed Services, CRM Solutions, Data Analytics, SAP Competency Centre
4. **Our Clients** - Scrolling showcase of client logos (past and present)
5. **Geo-Footprint** - Interactive map of South Africa with 19 location markers showing regional presence
6. **Vacancies** - Career opportunities and CV submission form
7. **Contact Us** - Contact information and inquiry form with interactive card

## Technology Stack
- HTML5
- CSS3 (with modern animations and responsive design)
- TypeScript + D3.js (for interactive map visualization)
- Vanilla JavaScript
- Node.js 20 (for TypeScript compilation)
- Python 3.11 (development server)
- Font Awesome icons

## Development
The website runs on port 5000 using a Python HTTP server with cache control headers to ensure fresh content during development.

## Deployment
Configured for Replit Autoscale deployment, suitable for static website hosting.

## Replit Environment Setup
- **Python Module**: Python 3.11 installed and configured
- **Workflow**: Configured to run `python server.py` on port 5000
- **Server**: Binds to 0.0.0.0:5000 for proper Replit proxy compatibility
- **Cache Control**: Headers configured to prevent caching during development
- **Deployment**: Autoscale deployment configured for production

## Recent Changes
- October 2, 2025: GitHub Repository Import - Successfully configured for Replit environment
  - **Import Source**: Fresh GitHub clone imported into Replit
  - **Environment Verification**: Confirmed Python 3.12 and Node.js 20 installed and operational
  - **Dependency Management**: All Node.js packages (TypeScript, D3.js, @types/d3) already installed and functional
  - **TypeScript Build**: Fixed npm build script to use `npx -p typescript tsc` for proper compilation
  - **Workflow Status**: "Website" workflow running successfully on port 5000 with clean logs
  - **Server Configuration**: Verified server.py binds to 0.0.0.0:5000 for Replit proxy compatibility
  - **Cache Control**: Confirmed no-cache headers configured for development
  - **Asset Loading**: All resources verified loading successfully (HTML, CSS, JS, images, videos)
  - **Deployment Setup**: Configured autoscale deployment with `python server.py` command
  - **Visual Verification**: Loading screen animation and website rendering confirmed working
  - **Status**: Import complete and fully operational
- October 2, 2025: Fixed Geo-Footprint map D3.js projection bug
  - **Map Rendering Fix**: Resolved critical issue where location markers were clustered in center instead of properly distributed across South Africa map
  - **Root Cause**: D3.js projection was incorrectly configured - `.fitSize()` calculates optimal scale AND translation, but we were then calling `.translate()` which overrode the calculated translation, breaking the projection
  - **Solution Implemented**:
    - Replaced `.fitSize().translate()` with `.fitExtent()` which properly fits the map with padding
    - Added initialization safeguards: container dimension validation, retry mechanism (100ms timeout), IntersectionObserver for lazy loading
    - Prevents duplicate map initialization with `mapInitialized` flag
    - Added cache-busting parameter `?v=2` to force browser to load updated JavaScript
  - **Result**: Map now correctly displays South Africa outline with 19 location markers properly positioned across the country using accurate geographic coordinates
- October 2, 2025: Successfully configured GitHub import for Replit environment
  - **Node.js Dependencies**: Installed TypeScript, D3.js, and @types/d3 via npm
  - **TypeScript Compilation**: Compiled src/geo-map.ts to assets/js/geo-map.js using `npm run build:map`
  - **Server Optimization**: Enhanced server.py to gracefully handle BrokenPipeError and ConnectionResetError (common with video streaming)
  - **Git Configuration**: Updated .gitignore to exclude node_modules/ and package-lock.json
  - **Workflow Verification**: Confirmed "Website" workflow running smoothly on port 5000 with clean logs
  - **Asset Verification**: All resources loading successfully (HTML, CSS, JS, images, videos)
  - **Deployment Ready**: Autoscale deployment pre-configured in .replit file
- October 2, 2025: Upgraded Geo-Footprint section (Page 5) to programmatic TypeScript + D3.js implementation
  - **Technology Upgrade**: Replaced static image-based map with programmatically-drawn SVG map using TypeScript and D3.js
  - **Advanced Visualization**: Implemented D3.js geoMercator projection with embedded GeoJSON data for South Africa outline
  - **19 Interactive Locations**: All markers positioned using geographic coordinates with D3 projection
    - Locations: North West (42), Polokwane, Limpopo (52), Zeerust, Mbombela, Mpumalanga (48), Kimberley, Centurion, Midrand (HEAD OFFICE), Gauteng (53), Northern Cape (53), Margate, KwaZulu-Natal (81), Western Cape (23), Cape Town, East London, Bloemfontein, Free State (26), Eastern Cape (72)
  - **Interactive Features**: Hover effects (navy to orange transitions), click-to-activate functionality, smooth D3 transitions
  - **Smart Label Positioning**: 8-directional label placement with connecting lines to prevent overlap
  - **Responsive SVG**: Automatically scales to container with resize event handling
  - **Build System**: TypeScript compilation with `npm run build:map` compiles src/geo-map.ts to assets/js/geo-map.js
  - **Browser Compatibility**: CDN-based D3 import for browser ESM support without import maps
  - **TypeScript Config**: Configured with noImplicitAny: false for cleaner compilation
  - HEAD OFFICE (Midrand) has distinctive larger marker for prominence
  - Scroll-triggered animations with staggered timing for visual appeal
  - Fully responsive design optimized for desktop, tablet, and mobile devices
- October 2, 2025: GitHub import successfully configured for Replit environment
  - Verified Python 3.11 module installed and functional
  - Confirmed workflow "Website" running successfully on port 5000
  - Server properly configured with 0.0.0.0:5000 binding for Replit proxy compatibility
  - Cache control headers configured (no-cache, no-store, must-revalidate) to prevent browser caching during development
  - Deployment configured for autoscale (static website hosting) with production command `python server.py`
  - All assets verified and loading correctly: HTML, CSS, JavaScript, images, client logos, and video
  - Website rendering properly with loading screen, intro animation, and all interactive features
  - .gitignore configured for Python, IDE files, and system files
- October 2, 2025: Added hover indicator to Contact Us section
  - Added animated "Hover Over Me" text with hand pointer icon below Alteram logo
  - Included bouncing arrow animation to guide users
  - Indicator fades out smoothly when contact card is hovered
  - Fully responsive design for mobile devices
  - Icons animate with pulse and bounce effects to attract attention
- September 30, 2024: Initial website creation with all sections
  - Integrated Alteram logo and brand colors (navy blue #2c3e7a and orange #f5a623)
  - Implemented smooth scrolling navigation
  - Added responsive mobile menu
  - Created contact and vacancy forms
