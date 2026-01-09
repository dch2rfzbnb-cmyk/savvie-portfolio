import { about } from '@/lib/data';
import { FadeIn } from '../fade-in';
import { Badge } from '@/components/ui/badge';

export default function About() {
  return (
    <section id="about" className="w-full py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-4 py-6 bg-black/40 backdrop-blur-md rounded-2xl border border-primary/10 shadow-lg">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <FadeIn>
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">{about.title}</h2>
              <div className="space-y-3 text-muted-foreground md:text-lg">
                {about.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
             <Badge variant="outline" className="text-base md:text-lg p-4 border-accent/50 text-accent-foreground bg-accent/10 w-full text-left leading-relaxed">
               &quot;{about.quote}&quot;
            </Badge>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}