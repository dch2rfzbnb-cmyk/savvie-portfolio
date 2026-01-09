import { skillCategories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '../fade-in';

export default function Skills() {
  return (
    <section id="skills" className="w-full py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-4 py-6 bg-black/40 backdrop-blur-md rounded-2xl border border-primary/10 shadow-lg">
        <FadeIn>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-center sm:text-4xl">Навыки</h2>
        </FadeIn>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {skillCategories.map((category, i) => (
            <FadeIn key={category.name} delay={i * 150}>
              <div className="space-y-4 rounded-lg border border-white/10 p-6 glow-border bg-card/30">
                <h3 className="text-xl font-semibold text-primary">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-3 py-1 text-sm bg-secondary/80 text-secondary-foreground transition-transform hover:scale-105 hover:bg-primary/20 hover:text-primary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
