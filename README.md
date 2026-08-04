> [!WARNING]
> ## Deprecated — no longer maintained
>
> This starter is retired. Install the x402 packages directly instead and follow the
> **[PayAI x402 quickstart](https://docs.payai.network/x402/quickstart)**, which carries the
> same working example inline.
>
> The npm package stays installable so existing builds keep working, but it will not
> receive updates. This repository is archived and read-only.

# x402 Next.js Starter

Create an x402 Next.js app in less than 2 minutes!

This package provides a complete Next.js application template with x402 payment protocol integration, allowing you to quickly set up a web application with payment middleware.

## Quick Start

```bash
npx @payai/x402-next-starter my-app
cd my-app
cp env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

## What's Included

- ⚡ **Next.js 14** with App Router
- 💳 **x402 payment middleware** integration
- 🎨 **Tailwind CSS** for styling
- 📝 **TypeScript** support
- 🔧 **ESLint and Prettier** configuration
- 🚀 **Ready-to-deploy** API routes
- 📖 **Comprehensive documentation**

## Features

### Payment Integration
- x402 payment middleware for protecting routes
- Support for multiple networks (Base, Solana)
- Configurable payment amounts and tokens
- Automatic payment verification

### Developer Experience
- TypeScript for type safety
- ESLint and Prettier for code quality
- Hot reloading in development
- Production-ready build configuration

### Example Implementation
- Free weather API endpoint
- Premium content with payment protection
- Modern, responsive UI
- Clear documentation and examples

## Configuration

After creating your app, you'll need to configure:

1. **Environment Variables**: Update `.env.local` with your wallet address and facilitator URL
2. **Payment Settings**: Customize payment amounts and networks in `middleware.ts`
3. **Styling**: Modify Tailwind CSS classes or add custom styles

## Project Structure

The generated app includes:

```
├── app/
│   ├── api/                 # API routes
│   ├── premium/             # Premium content page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── middleware.ts            # x402 payment middleware
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Learn More

- [x402 Protocol Documentation](https://github.com/coinbase/x402)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

Apache-2.0

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
