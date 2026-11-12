 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

const navItems = [
  { href: "/", label: "Beranda", icon: "home" },
  { href: "/explore", label: "Explore", icon: "search" },
  { href: "/sell", label: "Jual", icon: "plus" },
  { href: "/chat", label: "Pesan", icon: "message" },
  { href: "/account", label: "Akun", icon: "user" }
];

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const hideNav = pathname.startsWith("/checkout") || pathname.startsWith("/product/");
  return (
    <>
      <header className="desktop-header">
        <div className="desktop-header-inner">
          <Link href="/" className="brand">relove<span>.</span></Link>
          <nav className="desktop-links">
            <Link href="/">Beranda</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/sell">Jual Barang</Link>
            <Link href="/chat">Pesan</Link>
          </nav>
          <Link href="/account" className="avatar-link">N</Link>
        </div>
      </header>
      <main className="app-frame">{children}</main>
      {!hideNav && (
        <nav className="bottom-nav">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link href={item.href} key={item.href} className={`bottom-nav-item ${active ? "active" : ""}`}>
                <span className={`nav-icon ${item.label === "Jual" ? "sell-icon" : ""}`}><Icon name={item.icon} size={22} /></span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
