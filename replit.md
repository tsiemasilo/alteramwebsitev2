# Alteram Website v2

## Overview
Modern, responsive redesign of the Alteram website featuring all requested sections and built with clean HTML, CSS, and JavaScript.

## Project Structure
- `index.html` - Main website file
- `assets/css/styles.css` - Stylesheet with modern responsive design
- `assets/js/script.js` - JavaScript for interactivity and animations
- `assets/images/` - Logo and image assets
- `server.py` - Python HTTP server for development

## Sections
1. **Home** - Hero section with tagline "Your Vision DELIVERED"
2. **About Us** - Company overview and core values (Customer Focused, Quality, Innovation, People Centric)
3. **Services** - ICT services including Managed Services, CRM Solutions, Data Analytics, SAP Competency Centre
4. **Geo-Footprint** - Coverage across South Africa regions
5. **Vacancies** - Career opportunities and CV submission form
6. **Contact Us** - Contact information and inquiry form

## Technology Stack
- HTML5
- CSS3 (with modern animations and responsive design)
- Vanilla JavaScript
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
