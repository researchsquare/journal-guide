import FontAwesomeSetup from '@/src/components/FontAwesomeSetup';
import ReduxProvider from "@/src/providers/ReduxProvider";
import type { ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <FontAwesomeSetup />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
