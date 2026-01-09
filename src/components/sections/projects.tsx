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

        <div className="mt-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 150}>
              <Card className="flex h-full flex-col bg-card/50 backdrop-blur-sm border-white/10 transition-colors duration-200 md:glow-border md:hover:-translate-y-2 md:transition-all md:duration-300">
                <CardHeader className={`${project.title === 'contact' ? 'p-2 sm:p-3 md:p-6' : 'p-3 sm:p-4 md:p-6'}`}>
                  <CardTitle className={`flex items-center gap-1 sm:gap-2 font-mono ${project.title === 'contact' ? 'text-xs sm:text-sm md:text-lg' : 'text-sm sm:text-base md:text-lg'}`}>
                    {project.title}
                  </CardTitle>
                  <CardDescription className={`${project.title === 'contact' ? 'text-[10px] sm:text-xs md:text-base mt-0.5 sm:mt-1 md:mt-2 whitespace-pre-line' : 'text-xs sm:text-sm md:text-base mt-1 sm:mt-2'} ${project.title === 'this-landing' ? 'hidden md:block' : ''}`}>
                    {project.description}
                  </CardDescription>
                </CardHeader>
                {project.tags.length > 0 && (
                  <div className={`px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 pt-0 flex-grow ${project.title === 'this-landing' ? 'hidden md:block' : ''}`}>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-mono bg-primary/10 text-primary border-primary/20 text-[10px] sm:text-xs md:text-sm px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <CardFooter className={`${project.title === 'contact' ? 'p-2 sm:p-3 md:p-6 pt-0' : 'p-3 sm:p-4 md:p-6 pt-0'}`}>
                  {project.url && (
                     <Button asChild variant="ghost" size="sm" className="text-primary md:hover:bg-primary/10 h-7 sm:h-8 md:h-10 text-[10px] sm:text-xs md:text-base w-full justify-center md:justify-start">
                       <Link href={project.url} target={project.url.startsWith('/') ? '_self' : '_blank'} rel="noopener noreferrer" className="flex items-center gap-1 md:gap-2">
                         {project.url.startsWith('https://t.me') ? (
                           <>
                             <Send className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                             <span className="whitespace-nowrap">Перейти</span>
                           </>
                         ) : (
                           <>
                             <LinkIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                             <span className="whitespace-nowrap">Перейти</span>
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
