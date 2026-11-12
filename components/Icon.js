export default function Icon({ name = "grid", size = 22, strokeWidth = 1.8, className = "" }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", className, "aria-hidden": true };
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    filter: <><path d="M4 7h16M7 12h10m-7 5h4"/><circle cx="8" cy="7" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/></>,
    heart: <path d="M20.8 8.8c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z"/>,
    shirt: <><path d="m8 4 4 2 4-2 5 4-3 4-2-1v9H8v-9l-2 1-3-4 5-4Z"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8"/></>,
    laptop: <><rect x="5" y="4" width="14" height="11" rx="1.5"/><path d="M3 19h18l-1.5-4h-15z"/></>,
    home: <><path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-6h6v6"/></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    message: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-3.5-.8L4 20l1.3-3.6A7.1 7.1 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    upload: <><path d="M12 16V4m-4 4 4-4 4 4"/><path d="M4 16v4h16v-4"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>
  };
  return <svg {...common}>{paths[name] || paths.grid}</svg>;
}
