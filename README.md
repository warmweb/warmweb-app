## Akindo Deliverable

* [Notion Design Document](https://warmweb.notion.site/WarmWeb-Product-Design-25e97aa1ea2980f8a389ceb5cdecc766?source=copy_link)

# WarmWeb

Websites That Last — Secured by Filecoin.

## 🚀 Features

- **Modern Landing Page**: Clean, professional design with smooth animations
- **Responsive Design**: Mobile-first approach that looks great on all devices
- **Dark/Light Mode**: Theme toggle with localStorage persistence (defaults to dark mode)
- **Interactive Demo**: Mock upload UI with real integration stubs for future development
- **Accessibility**: WAI-ARIA compliant navigation, forms, and interactions
- **Performance Optimized**: Built with Next.js 15 and optimized for Lighthouse scores
- **SEO Ready**: Proper meta tags and structured markup

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with custom design system
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth transitions
- **Icons**: [Lucide React](https://lucide.dev) for consistent iconography
- **Components**: shadcn/ui architecture with custom implementations
- **Typography**: Inter font with optimized loading

## 📋 Project Structure

```
/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Main landing page
├── components/
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx       # Hero section with mock upload UI
│   │   ├── Features.tsx   # Features grid
│   │   ├── HowItWorks.tsx # Timeline section
│   │   ├── FAQ.tsx        # Accordion FAQ
│   │   └── CTA.tsx        # Email signup section
│   └── ui/                # Reusable UI components
│       ├── Button.tsx     # Button variants
│       ├── Card.tsx       # Card components
│       ├── Accordion.tsx  # Accordion component
│       ├── Navbar.tsx     # Navigation with mobile menu
│       └── Footer.tsx     # Site footer
├── lib/
│   ├── utils.ts           # Utility functions (cn)
│   └── warmweb.ts         # Integration stubs for future development
└── providers/
    └── ThemeProvider.tsx  # Theme management with localStorage
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd warmweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or 
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Palette
- **Primary**: Cyan-based colors (`--primary: #06b6d4`) for Filecoin brand alignment
- **Background**: Slate-based neutral backgrounds
- **Text**: High contrast ratios for accessibility
- **Theme**: Dark mode default with light mode toggle

### Typography
- **Font**: Inter with optimized loading
- **Scale**: Responsive typography scales
- **Hierarchy**: Clear heading and body text hierarchy

### Components
- **Cards**: Rounded corners with subtle shadows and hover effects  
- **Buttons**: Multiple variants (default, outline, ghost)
- **Forms**: Accessible with proper focus states
- **Navigation**: Sticky header with smooth scrolling

## 🔧 Configuration

### Theme Customization
Modify colors in `app/globals.css`:

```css
:root {
  --primary: #06b6d4;        /* Cyan primary */
  --background: #ffffff;      /* Light background */
  /* ... */
}

.dark {
  --primary: #06b6d4;        /* Cyan primary (dark) */
  --background: #020617;      /* Dark background */
  /* ... */
}
```

### Content Updates
- **Hero Section**: Update copy in `components/sections/Hero.tsx`
- **Features**: Modify feature list in `components/sections/Features.tsx`
- **FAQ**: Update questions in `components/sections/FAQ.tsx`
- **Navigation**: Modify links in `components/ui/Navbar.tsx`

## 🔗 Integration Stubs

The project includes typed integration stubs in `lib/warmweb.ts` for future development:

```typescript
// Mock functions ready for Filecoin integration
export async function uploadToWarmStorage(files: File[]): Promise<UploadResult>
export async function getReceipt(jobId: string): Promise<Receipt>  
export async function getStorageStatus(jobId: string): Promise<UploadResult>
```

These stubs are already connected to the UI and return mock data with realistic delays.

## 🚀 Production Deployment

### Build Commands
```bash
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Deployment Platforms

**Vercel** (Recommended)
```bash
npx vercel
```

**Netlify**
```bash
npm run build
# Upload `out` folder to Netlify
```

**Docker**
```dockerfile
FROM node:18-alpine
# ... (standard Next.js Docker setup)
```

## 📊 Performance

Target Lighthouse Scores:
- **Performance**: ≥ 90
- **Accessibility**: ≥ 95  
- **Best Practices**: ≥ 90
- **SEO**: ≥ 95

Optimizations included:
- Image optimization with Next.js
- Font optimization with preloading
- Code splitting with dynamic imports
- Reduced motion support for accessibility

## 🎯 Roadmap

### Phase 1: Landing Page (Current)
- ✅ Production-ready landing page
- ✅ Mock upload interface  
- ✅ Integration stubs
- ✅ Responsive design
- ✅ Accessibility compliance

### Phase 2: Backend Integration
- [ ] Connect to FilecoinWarmStorageService
- [ ] Implement Synapse SDK integration
- [ ] Add real file upload functionality
- [ ] Deploy storage contracts

### Phase 3: Full Platform
- [ ] User authentication
- [ ] Dashboard for managing sites
- [ ] Custom domain support
- [ ] Analytics and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Filecoin Foundation** for the decentralized storage infrastructure
- **Synapse SDK** for simplified blockchain integration
- **Tailwind CSS** and **shadcn/ui** for the design system foundation
- **Next.js team** for the excellent React framework

---

**Ready to deploy decentralized websites on Filecoin?** 🚀

Visit the live demo or contribute to making decentralized web hosting accessible to everyone.
