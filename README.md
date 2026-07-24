# ENRYSA — Trade Without Borders

ENRYSA is a premium, cinematic, and futuristic cross-border commerce infrastructure platform. It connects businesses and consumers in Bangladesh with products, suppliers, and opportunities across the globe. 

Designed with a high-fidelity dark technology theme, the platform positions ENRYSA as a next-generation trade intelligence company rather than a traditional freight forwarder.

---

## 🌌 Core Features & Architecture

The application is structured as a single-page immersive experience, built with 11 custom-crafted sections using rich micro-interactions, canvas animations, and responsive layouts:

### 1. Interactive & Immersive UI
- **Interactive 3D Globe (`TradeConnection`)**: An interactive, drag-to-rotate HTML5 Canvas 3D globe visualizing trade connections from worldwide hubs (London, Tokyo, New York, Guangzhou, Dubai, etc.) to Dhaka.
- **Spotlight Hover Effects (`Capabilities` & `WhyEnrysa`)**: Cards that feature a mouse-tracking dynamic radial spotlight gradient.
- **Custom Spring Cursor (`CustomCursor`)**: A desktop-only custom circular cursor utilizing spring physics to follow the pointer smoothly, adapting styling based on hover states.
- **B2B & B2C Split Pane (`BusinessModels`)**: Interactive split-screen layout showcasing business-to-business and business-to-consumer models with smooth width-expansion hover effects.
- **2D Canvas Particles (`Hero`)**: High-performance backdrop particle generator displaying up to 200 interactive nodes on desktop and 80 on mobile.
- **Network Metrics Canvas (`TradeNetwork`)**: Animated 2D nodes showing active logistics flow paths and corporate network metrics.

### 2. Sourcing & Timeline Infrastructure
- **Responsive Sourcing Timeline (`ProcessTimeline`)**: A 5-step journey tracking products from sourcing to delivery. It transitions from a horizontal timeline on desktop to a vertical progress line on mobile.
- **Copywriting Pivot**: Tailored terminology shifting the core corridors from a legacy bilateral model to a modern, worldwide global sourcing network.

### 3. Contact & Lead Capture Backend
- **7-Field Inquiry Lead Form (`ContactCTA`)**: Fully validated contact form capturing buyer requirements, product categories, and volumes.
- **Prisma & Postgres Pipeline**: Posts inquiries to a `/api/contact` API route handler, storing data securely in a PostgreSQL database using Prisma ORM.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router, React 19)
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Database ORM**: Prisma ORM
- **Database Engine**: Neon Serverless PostgreSQL (locally migratable to any dialect)
- **Animation Suite**: Framer Motion, GSAP 3.15
- **Package Runner & Runtime**: Bun (compatible with Node.js / npm)

---

## 📂 Project Structure

```bash
├── .zscripts/             # Custom deployment and utility scripts
├── prisma/
│   └── schema.prisma      # Prisma schema (PostgreSQL provider config)
├── public/                # Static images, icons, and assets
└── src/
    ├── app/
    │   ├── api/contact/   # Inquiry POST route handler
    │   ├── globals.css    # Core styling, dark theme variables, custom scrollbars
    │   ├── layout.tsx     # Typography (Geist, Cinzel), metadata configuration
    │   └── page.tsx       # Orchestrator of the 11 landing page components
    ├── components/
    │   ├── enrysa/        # Immersive and interactive UI sections
    │   │   ├── BrandStatement.tsx
    │   │   ├── Capabilities.tsx
    │   │   ├── ContactCTA.tsx
    │   │   ├── CustomCursor.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Hero.tsx
    │   │   ├── MagneticButton.tsx
    │   │   ├── ProcessTimeline.tsx
    │   │   ├── TradeConnection.tsx
    │   │   ├── TradeNetwork.tsx
    │   │   └── WhyEnrysa.tsx
    │   └── ui/            # Reusable atomic shadcn layout components
    ├── hooks/             # Responsiveness hooks (use-mobile, use-toast)
    └── lib/               # Database client utilities and helpers
```

---

## 🚀 Setup & Local Development

Follow these instructions to configure the database and spin up the developer server locally.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies

Clone the project and install the dependencies:
```bash
bun install
# or
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and add your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

### 3. Sync Database Schema

Generate the Prisma client and push the schema directly to your PostgreSQL instance:
```bash
bun db:generate
bun db:push
# or using npm
npm run db:generate
npm run db:push
```

### 4. Run the Development Server

Launch the local dev environment:
```bash
bun dev
# or
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Production Deployment

### Build the Application
To optimize and compile the Next.js production build:
```bash
bun run build
# or
npm run build
```

### Start Production Server
```bash
bun start
# or
npm run start
```

---

## ♿ Accessibility & Performance
- **Reduced Motion Support**: All canvas drawing ticks and Framer Motion transitions respect `prefers-reduced-motion` settings, falling back to static or fade visuals if requested.
- **Responsiveness**: All interactive grids, split sections, timelines, and forms adapt fluidly from mobile displays up to widescreen desktop layouts.
- **Fluid Rendering**: Dynamic handlers (such as resizing listeners and carousel interactions) are throttled and optimized using `requestAnimationFrame` for buttery-smooth performance.
