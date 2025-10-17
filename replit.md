# Alteram Website v2

## Overview
A modern, responsive redesign of the Alteram website, featuring all requested sections and built with clean HTML, CSS, and JavaScript. The project aims to enhance Alteram's online presence with a focus on user experience, interactive elements, and clear presentation of its ICT services. Key capabilities include an interactive South Africa geo-footprint map, dynamic client showcases, and streamlined contact/vacancy forms.

## User Preferences
I want iterative development.
Ask before making major changes.
I prefer detailed explanations.
Do not make changes to the folder `Z`.
Do not make changes to the file `Y`.

## System Architecture
The website is built using HTML5, CSS3 (with modern animations and responsive design), and vanilla JavaScript. TypeScript and D3.js are used for advanced interactive map visualizations. The design incorporates Alteram's brand colors (navy #2c3e7a, orange #f5a623, light gray #f8f9fa) and includes modern UI/UX elements such as animated hero sections, dynamic section titles, sweeping gradient effects on service cards, grayscale-to-color client logo transitions, and focus animations for forms. All animations are optimized using CSS transforms and opacity for GPU acceleration.

Core features include:
- **Home:** Hero section with "Your Vision DELIVERED" tagline and interactive elements.
- **About Us:** Company overview and core values (Customer Focused, Quality, Innovation, People Centric).
- **Services:** ICT services covering Managed Services, CRM Solutions, Data Analytics, and an SAP Competency Centre.
- **Our Clients:** Scrolling showcase of client logos with interactive hover effects.
- **Geo-Footprint:** An interactive D3.js map of South Africa displaying 19 company locations with accurate province boundaries and smart label positioning.
- **Vacancies:** Career opportunities section with a CV submission form.
- **Contact Us:** Contact information and inquiry form with interactive card elements.

The development environment uses a Python 3.11 HTTP server, and the project is configured for Replit Autoscale deployment for static website hosting. TypeScript compilation is handled via Node.js 20.

## External Dependencies
- **D3.js:** For interactive geographical map visualizations.
- **Font Awesome:** For icons.
- **Node.js 20:** For TypeScript compilation and dependency management.
- **Python 3.11:** For the development HTTP server.