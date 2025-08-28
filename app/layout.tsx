// app/layout.jsx
"use client";

import "./globals.css";
import { WagmiProvider } from "wagmi";
import { filecoin, filecoinCalibration } from "wagmi/chains";
import { http, createConfig } from "@wagmi/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Navbar } from "@/components/ui/Navbar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ConfettiProvider } from "@/providers/ConfettiProvider";
import Footer from "@/components/ui/Footer";
import { GeolocationProvider } from "@/providers/GeolocationProvider";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [filecoinCalibration, filecoin],
  connectors: [],
  transports: {
    [filecoin.id]: http(),
    [filecoinCalibration.id]: http(),
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>WarmWeb - Host static sites on Filecoin Warm Storage</title>
        <meta
          name="description"
          content="Host static sites on Filecoin Warm Storage in minutes. Fast uploads, verifiable storage, easy retrieval. Powered by Filecoin Onchain Cloud."
        />
        <meta
          name="keywords"
          content="WarmWeb, Filecoin, Warm Storage, Static Sites, PDP, Synapse SDK, Web Hosting, Decentralized Storage"
        />
        <meta name="author" content="WarmWeb" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/filecoin.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <GeolocationProvider
          onBlocked={(info: any) => {
            console.log("blocked", info);
          }}
        >
          <ThemeProvider>
            <ConfettiProvider>
              <QueryClientProvider client={queryClient}>
                <WagmiProvider config={config}>
                  <RainbowKitProvider
                    modalSize="compact"
                    initialChain={filecoinCalibration.id}
                  >
                    <main className="flex flex-col min-h-screen">
                      <Navbar />
                      {children}
                    </main>
                    <Footer />
                  </RainbowKitProvider>
                </WagmiProvider>
              </QueryClientProvider>
            </ConfettiProvider>
          </ThemeProvider>
        </GeolocationProvider>
      </body>
    </html>
  );
}
