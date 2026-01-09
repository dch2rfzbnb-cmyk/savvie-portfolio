import Link from 'next/link';
import { Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contact } from '@/lib/data';
import { FadeIn } from '../fade-in';

export default function Contact() {
  return (
    <section id="contact" className="w-full py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-4 py-6 bg-black/40 backdrop-blur-md rounded-2xl border border-primary/10 shadow-lg text-center">
        <FadeIn className="space-y-6">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">{contact.title}</h2>
          <p className="text-muted-foreground md:text-lg max-w-md mx-auto">{contact.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
                <Link href={contact.telegramUrl} target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-4 w-4" /> Связаться со мной
                </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
