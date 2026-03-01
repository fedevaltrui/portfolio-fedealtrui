import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer({ dict }: { dict: any }) {
    return (
        <footer className="border-t border-border mt-auto w-full">
            <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex flex-col items-center gap-2 sm:items-start">
                        <p className="text-sm font-medium">Federico Altrui</p>
                        <p className="text-sm text-muted-foreground text-center sm:text-left">
                            {dict.description}
                            <br />
                            <span className="inline-flex items-center gap-2 mt-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                {dict.status}
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="https://github.com/fedevaltrui"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-[var(--color-granate)]"
                        >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                            href="http://linkedin.com/in/federicoaltrui"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-[var(--color-granate)]"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                            href="mailto:fedealtrui@gmail.com"
                            className="text-muted-foreground transition-colors hover:text-[var(--color-granate)]"
                        >
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </div>
                </div>
                <div className="mt-8 flex justify-center sm:justify-start">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Federico Altrui. {dict.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
}
