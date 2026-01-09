'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navLinks, contact } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 bg-black/40 backdrop-blur-md border-b border-primary/20',
        isScrolled ? 'h-16' : 'h-20'
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-mono text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors">
          nano.dev
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
            <Link href={contact.telegramUrl} target="_blank" rel="noopener noreferrer">
              Open Telegram <Send className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background/80 backdrop-blur-lg sm:w-[400px]">
              <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                   <Link href="/" className="font-mono text-xl font-bold tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>
                    nano.dev
                  </Link>
                  <SheetTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Закрыть меню</span>
                      </Button>
                  </SheetTrigger>
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-8 w-full bg-primary text-primary-foreground">
                  <Link href={contact.telegramUrl} target="_blank" rel="noopener noreferrer">
                    Open Telegram <Send className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}