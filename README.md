# ⚡ React vs Preact Performance Comparison

Real-time performance dashboard comparing React and Preact frameworks with identical Todo applications.

![Dashboard Preview](./preview.png)

## 🎯 Overview

This project demonstrates the performance differences between React and Preact by building identical Todo applications and measuring:

- 📦 **Bundle Size** - Preact is ~93% smaller than React
- ⚡ **Render Performance** - Real-time render time tracking
- 🧠 **Memory Usage** - Heap memory consumption
- 📊 **FPS** - Frames per second during updates

## 🏗️ Architecture

This is a monorepo using **Workspaces** with three main packages:

```
performance-comparison/
├── packages/
│   ├── react-app/      # React Todo App (Port 3001)
│   ├── preact-app/     # Preact Todo App (Port 3002)
│   ├── dashboard/      # Micro-frontend Dashboard (Port 3000)
│   └── shared/         # Shared utilities and types
```

### 🔧 Technology Stack

- **React 18** - React Todo implementation
- **Preact 10** - Preact Todo implementation
- **TypeScript** - Type safety across all packages
- **Vite** - Lightning-fast dev server and build tool
- **Recharts** - Performance visualization charts
- **PostMessage API** - Inter-frame communication

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/react-preact-comparison.git
cd react-preact-comparison

# Install dependencies
npm install

# Start all applications
npm run dev
```

This will start:

- Dashboard: http://localhost:3000
- React App: http://localhost:3001
- Preact App: http://localhost:3002

### Individual Commands

```bash
# Start only React app
npm run dev:react

# Start only Preact app
npm run dev:preact

# Start only Dashboard
npm run dev:dashboard

# Build all packages
npm run build:all
```

## 📊 Features

### Todo Application

- ✅ Add, complete, and delete todos
- 🔍 Filter by All/Active/Completed
- 💾 Real-time performance metrics display
- 🔥 Stress test mode with configurable parameters

### Dashboard

- 🎛️ Switch between React and Preact apps
- 📈 Live performance comparison charts
- 📊 Side-by-side metrics comparison
- 🔄 Real-time data updates every 2 seconds

### Stress Test

- Generate 10-1000 todos on demand
- Configurable update intervals (10-500ms)
- Real-time performance impact visualization
- Compare framework behavior under load

## 📈 Performance Results

### Bundle Size

- **React**: ~42 KB (gzipped)
- **Preact**: ~3 KB (gzipped)
- **Difference**: 92.9% smaller

### Render Performance

Results vary based on system, but Preact typically shows:

- Faster initial render times
- Lower memory footprint
- Comparable FPS under normal load

## 🏛️ Architecture Decisions

### Why Monorepo?

- Shared types and utilities across packages
- Consistent dependency versions
- Simplified development workflow

### Why Micro-frontend?

- Isolated runtime environments for fair comparison
- Real iframe-based performance measurement
- Prevents cross-contamination of metrics

### Why PostMessage?

- Secure cross-origin communication
- Non-invasive performance monitoring
- Real-time data streaming

## 🧪 Testing Methodology

1. **Identical Implementations**: Both apps use the same logic, styling, and features
2. **Isolated Environments**: Each app runs in its own iframe
3. **Real-time Metrics**: Performance measured during actual usage
4. **Stress Testing**: Configurable load testing with up to 1000 todos

## 🛠️ Development

### Project Structure

```
packages/
├── shared/
│   └── src/
│       ├── types.ts          # Shared TypeScript types
│       ├── utils.ts          # Performance measurement utilities
│       └── index.ts          # Public API exports
├── react-app/
│   └── src/
│       ├── App.tsx           # Main React application
│       ├── components/       # React components
│       └── main.tsx          # Entry point
├── preact-app/
│   └── src/
│       ├── App.tsx           # Main Preact application
│       ├── components/       # Preact components
│       └── main.tsx          # Entry point
└── dashboard/
    └── src/
        ├── App.tsx           # Dashboard container
        ├── components/       # Dashboard components
        └── main.tsx          # Entry point
```

### Adding New Metrics

1. Update `types.ts` with new metric type
2. Implement measurement in `utils.ts`
3. Update both app implementations
4. Add visualization to dashboard

## 📦 Building for Production

```bash
# Build all packages
npm run build:all

# Preview production builds
npm run preview:react
npm run preview:preact
npm run preview:dashboard
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure build settings:
   - Framework Preset: Vite
   - Root Directory: `packages/dashboard`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Manual Deployment

```bash
# Build all packages
npm run build:all

# Deploy dashboard
cd packages/dashboard
vercel deploy
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://react.dev/) - The library for web and native user interfaces
- [Preact](https://preactjs.com/) - Fast 3kB alternative to React
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Recharts](https://recharts.org/) - Composable charting library

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/YOUR_USERNAME/react-preact-comparison](https://github.com/YOUR_USERNAME/react-preact-comparison)

---

⭐ If you found this project helpful, please give it a star!
