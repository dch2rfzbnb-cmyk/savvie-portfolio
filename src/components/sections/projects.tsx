import { projects } from '@/lib/data';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Send, Link as LinkIcon } from 'lucide-react';
import { FadeIn } from '../fade-in';

export default function Projects() {
  return (
    <section id="projects" className="w-full py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-4 py-6 bg-black/40 backdrop-blur-md rounded-2xl border border-primary/10 shadow-lg">
        <FadeIn>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-center sm:text-4xl">Проекты</h2>
        </FadeIn>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 150}>
              <Card className="flex h-full flex-col bg-card/50 backdrop-blur-sm border-white/10 transition-all duration-300 glow-border hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <div className="p-6 pt-0 flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-mono bg-primary/10 text-primary border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardFooter>
                  {project.url && (
                     <Button asChild variant="ghost" className="text-primary hover:bg-primary/10 hover:text-primary">
                       <Link href={project.url} target={project.url.startsWith('/') ? '_self' : '_blank'} rel="noopener noreferrer">
                         {project.url.startsWith('https://t.me') ? (
                           <>
                             <Send className="mr-2 h-4 w-4" />
                             Открыть в Telegram
                           </>
                         ) : (
                           <>
                             <LinkIcon className="mr-2 h-4 w-4" />
                             Перейти
                           </>
                         )}
                       </Link>
                     </Button>
                  )}
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
