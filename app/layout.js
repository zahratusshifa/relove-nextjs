import "./globals.css";
import { ReloveProvider } from "../context/ReloveContext";
import SiteShell from "../components/SiteShell";

export const metadata = {
  title: "Relove UNNES — Circular Market",
  description: "Marketplace preloved mahasiswa Universitas Negeri Semarang."
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <ReloveProvider>
          <SiteShell>{children}</SiteShell>
        </ReloveProvider>
      </body>
    </html>
  );
}
