import { paymentMiddleware } from 'x402-next';

export const middleware = paymentMiddleware(
  process.env.RESOURCE_WALLET_ADDRESS as `0x${string}`,
  {
    '/api/weather': {
      // USDC amount in dollars
      price: '$0.001',
      // network: "base" // uncomment for Base mainnet
      // network: "solana" // uncomment for Solana mainnet
      network: "base-sepolia",
    },
    '/api/premium/*': {
      // Define atomic amounts in any EIP-3009 token
      price: {
        amount: "100000",
        asset: {
          address: "0xabc",
          decimals: 18,
          // omit eip712 for Solana
          eip712: {
            name: "WETH",
            version: "1",
          },
        },
      },
      // network: "base" // uncomment for Base mainnet
      // network: "solana" // uncomment for Solana mainnet
      network: "base-sepolia",
    },
  },
  {
    url: process.env.NEXT_PUBLIC_FACILITATOR_URL as string,
  },
);

export const config = {
  matcher: [
    '/api/weather',
    '/api/premium/:path*',
  ],
};
