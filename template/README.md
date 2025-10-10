# x402 Next.js Starter

A Next.js application template with x402 payment protocol integration. Create a Next.js app with payment middleware in less than 2 minutes!

## Features

- ⚡ Next.js 14 with App Router
- 💳 x402 payment middleware integration
- 🎨 Tailwind CSS for styling
- 📝 TypeScript support
- 🔧 ESLint and Prettier configuration
- 🚀 Ready-to-deploy API routes

## Quick Start

### Using the CLI

```bash
npx @payai/x402-next-starter my-app
cd my-app
cp env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

### Manual Setup

1. Clone this repository
2. Copy the `template` folder to your project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy environment variables:
   ```bash
   cp env.example .env.local
   ```
5. Update `.env.local` with your configuration:
   ```env
   RESOURCE_WALLET_ADDRESS=0xYourAddress
   NEXT_PUBLIC_FACILITATOR_URL=https://facilitator.example.com
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration

### Environment Variables

- `RESOURCE_WALLET_ADDRESS`: Your wallet address for receiving payments
- `NEXT_PUBLIC_FACILITATOR_URL`: URL of your x402 facilitator service
- `NEXT_PUBLIC_NETWORK`: Optional network configuration (base-sepolia, base, solana)

### Payment Configuration

The payment middleware is configured in `middleware.ts`. You can customize:

- Payment amounts (in USD or atomic units)
- Supported networks
- Protected routes
- Token configurations

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── weather/          # Free weather API
│   │   └── premium/          # Premium content API
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

## API Routes

### Free Weather API
- **Endpoint**: `GET /api/weather`
- **Description**: Returns current weather information
- **Payment**: Free

### Premium Content API
- **Endpoint**: `GET /api/premium/content`
- **Description**: Returns premium content
- **Payment**: Required (configured in middleware)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Adding New Protected Routes

1. Add route configuration to `middleware.ts`:
   ```typescript
   {
     '/api/new-route': {
       price: '$0.01',
       network: 'base-sepolia',
     },
   }
   ```

2. Create the API route in `app/api/new-route/route.ts`

3. Update the matcher in `middleware.ts`:
   ```typescript
   export const config = {
     matcher: [
       '/api/new-route',
       // ... other routes
     ],
   };
   ```

## Deployment

This starter is ready for deployment on platforms like:

- Vercel (recommended for Next.js)
- Netlify
- Railway
- DigitalOcean App Platform

Make sure to set your environment variables in your deployment platform.

## Learn More

- [x402 Protocol Documentation](https://github.com/coinbase/x402)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

Apache-2.0
