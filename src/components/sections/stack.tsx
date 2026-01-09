import { stack } from '@/lib/data';
import { FadeIn } from '../fade-in';

export default function Stack() {
  return (
    <section id="stack" className="w-full py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-4 py-6 bg-black/40 backdrop-blur-md rounded-2xl border border-primary/10 shadow-lg">
        <FadeIn>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-center sm:text-4xl">Стек и инструменты</h2>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mt-12 flex flex-wrap justify-center items-center gap-x-4 gap-y-4 sm:gap-x-8 sm:gap-y-6 md:gap-x-12">
            {stack.map((item) => (
              <div key={item.name} className="flex items-center gap-2 sm:gap-3 text-muted-foreground transition-all hover:text-primary group">
                {item.icon && <item.icon className="h-5 w-5 sm:h-7 sm:w-7 text-primary/70 transition-colors group-hover:text-primary" />}
                <span className="text-sm sm:text-base font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}