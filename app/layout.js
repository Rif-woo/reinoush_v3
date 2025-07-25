import { Anonymous_Pro } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/contexts/CartContext';
import { CartNotificationProvider } from '@/contexts/CartNotificationContext';
import { PricingProvider } from '@/contexts/PricingContext';
import { PromoProvider } from '@/contexts/PromoContext';
import { Analytics } from "@vercel/analytics/next"


const anonymous = Poppins({
  variable: "--font-anon",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
});

export const metadata = {
  title: "Reinoush",
  description: "Nos Parfums Élégance, qualité, et passion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${anonymous.variable} antialiased`}
      >
        <PricingProvider>
          <PromoProvider>
            <CartProvider>
              <CartNotificationProvider>
                {children}
                <Analytics/>
              </CartNotificationProvider>
            </CartProvider>
          </PromoProvider>
        </PricingProvider>
      </body>
    </html>
  );
}
