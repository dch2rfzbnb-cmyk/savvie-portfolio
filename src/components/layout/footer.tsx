import Link from 'next/link';
import { socialLinks, footerText } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const textWithYear = footerText.replace('{year}', currentYear.toString());

  return (
    <footer className="border-t border-primary/10 mt-20">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-muted-foreground text-center md:text-left">{textWithYear}</p>
            <div className="text-[11px] text-slate-500 font-mono">
              // built with Next.js & TypeScript
            </div>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.filter(l => ['GitHub'].includes(l.name)).map((link) => (
            <Link key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
              <link.icon className="h-5 w-5" />
              <span className="sr-only">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
