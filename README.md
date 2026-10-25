# WXT Web Extension Boilerplate

A modern, production-ready web extension boilerplate built with the latest technologies and best practices.

## 🚀 Features

- ⚡️ **[WXT](https://wxt.dev)** - Next-gen web extension framework with hot reload
- ⚛️ **[React 19](https://react.dev)** - Latest React with new features
- 🎨 **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS with new engine
- 📘 **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- 🔍 **[ESLint](https://eslint.org/)** - Code linting with React 19 support
- 💅 **[Prettier](https://prettier.io/)** - Code formatting with import sorting
- 🎯 **Type-safe Storage** - Built-in WXT storage with React hooks
- 📨 **Type-safe Messaging** - Cross-context messaging system
- 🌍 **Environment Variables** - `.env` support with validation
- 📊 **Bundle Analysis** - Visualize bundle size
- 🔄 **Auto-imports** - Utilities and hooks auto-imported

## 📁 Project Structure

```
📂 project/
├── 📁 entrypoints/        # Extension entry points
│   ├── background.ts      # Background service worker
│   ├── content.ts         # Content script
│   └── popup/             # Popup UI
├── 📁 hooks/              # React hooks (auto-imported)
│   └── useStorage.ts      # Reactive storage hook
├── 📁 utils/              # Utilities (auto-imported)
│   ├── cn.ts              # Class name utility
│   ├── env.ts             # Environment variables
│   └── messages.ts        # Type-safe messaging
├── 📁 assets/             # Processed assets
├── 📁 public/             # Static files
└── 📁 .output/            # Build output
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 26.12.1 (see `.nvmrc`)
- pnpm 12.15.0

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd wxt-web-extension-react-ts-boilerplate

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The extension will automatically open in Chrome with hot reload enabled.

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start dev server (Chrome)
pnpm dev:firefox      # Start dev server (Firefox)

# Building
pnpm build            # Production build (Chrome)
pnpm build:firefox    # Production build (Firefox)

# Packaging
pnpm zip              # Create distributable zip (Chrome)
pnpm zip:firefox      # Create distributable zip (Firefox)

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors
pnpm format           # Format code with Prettier
pnpm compile          # TypeScript 7 type checking
pnpm compile:compat   # TypeScript 6 compiler API compatibility

# Analysis
pnpm analyze          # Generate bundle size visualization
```

## 💡 Usage Examples

### Storage Hook

```typescript
import { useStorage } from '@/hooks/useStorage';

function MyComponent() {
  const [count, setCount] = useStorage('local:count', 0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  );
}
```

### Type-safe Messaging

```typescript
// Send message
import { sendMessage } from '@/utils/messages';
// Listen for messages (in background.ts)
import { onMessage } from '@/utils/messages';

// Define message types in utils/messages.ts
export interface MessageTypes {
  PING: {
    request: Record<string, never>;
    response: { pong: true };
  };
}

const response = await sendMessage('PING', {});

onMessage('PING', async () => ({ pong: true }));
```

### Environment Variables

```typescript
// Usage
import { env } from '@/utils/env';

// .env
VITE_API_KEY = your_api_key;

console.log(env.apiKey);
```

## 🎨 Styling

This boilerplate uses **Tailwind CSS v4** with:

- New CSS-first configuration
- Improved performance with Oxide engine
- Auto-sorting via Prettier plugin

```tsx
import { cn } from '@/utils/cn';

<div className={cn('base-class', isActive && 'active')} />;
```

## 🔧 Configuration

### WXT Config

Customize build settings in `wxt.config.ts`:

```typescript
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  // Add your config here
});
```

### Environment Variables

Create a `.env` file:

```bash
VITE_API_KEY=your_api_key_here
VITE_ENABLE_ANALYTICS=true
```

## 📦 Building for Production

```bash
# Build for Chrome
pnpm build

# Build for Firefox
pnpm build:firefox

# Create distributable zip
pnpm zip
```

Output will be in `.output/chrome-mv3/` or `.output/firefox-mv3/`.

## 🌐 Multi-Browser Support

WXT supports building for multiple browsers:

- Chrome (Manifest V3)
- Firefox (Manifest V2/V3)
- Safari
- Edge

Simply use the `-b` flag:

```bash
pnpm dev -b firefox
pnpm build -b safari
```

## 📊 Bundle Analysis

Visualize your bundle size:

```bash
ANALYZE=true pnpm build
```

Opens an interactive visualization showing:

- Bundle size breakdown
- Gzip/Brotli sizes
- Module dependencies

## 🧪 Code Quality

### ESLint

Configured with:

- TypeScript support
- React 19 rules
- React Hooks rules
- React Refresh support

### Prettier

Configured with:

- Import sorting
- Attribute organization
- Tailwind class sorting

## 📝 License

MIT

## 👤 Author

**Piyush Gambhir**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐️ Show your support

Give a ⭐️ if this project helped you!

---

Built with [WXT](https://wxt.dev) - The web extension framework
