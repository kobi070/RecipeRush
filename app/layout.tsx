import '@styles/globals.css';

import { ReactNode } from "react";

import Provider from "@/components/Provider";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Recipe Rush",
  description: "Discover & Share Recipes",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
