import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/common/Navbar";
import GlobalThemeProvider from "../context/ThemeContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SnackbarProvider } from "../context/SnackbarContext";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "../context/AuthContext";
import { getCurrentUser } from "../lib/utils/getCurrentUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blogger",
  description: "Create and share your own blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <GlobalThemeProvider>
            <SnackbarProvider>
              <AuthProvider initialUser={await getCurrentUser()}>
                <NextTopLoader />
                <Navbar />
                {children}
              </AuthProvider>
            </SnackbarProvider>
          </GlobalThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
