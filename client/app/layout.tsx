import ReduxProvider from "@/src/providers/ReduxProvider";
import type { ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
