import Link from "next/link";

export default function SectionTitle({ title, subtitle, href, linkLabel = "Lihat Semua" }) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {href && <Link href={href} className="text-link">{linkLabel} ↗</Link>}
    </div>
  );
}
