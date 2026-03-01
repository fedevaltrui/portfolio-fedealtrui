import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, ProjectMetadata } from '@/types';
import { Locale } from '@/i18n/config';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export function getProjectSlugs(): string[] {
    if (!fs.existsSync(projectsDirectory)) return [];
    const fileNames = fs.readdirSync(projectsDirectory);

    // Get unique base slugs (removing .en.md, .es.md)
    const slugs = new Set<string>();

    fileNames.forEach((fileName) => {
        if (fileName.endsWith('.md') || fileName.endsWith('.mdx')) {
            const match = fileName.match(/^(.*)\.(en|es)\.mdx?$/);
            if (match) {
                slugs.add(match[1]);
            } else {
                // Fallback for unlocalized markdown
                slugs.add(fileName.replace(/\.mdx?$/, ''));
            }
        }
    });

    return Array.from(slugs);
}

export function getProjectBySlug(slug: string, lang: Locale = 'en'): Project | null {
    try {
        // Try to load the localized version
        let fullPath = path.join(projectsDirectory, `${slug}.${lang}.md`);
        if (!fs.existsSync(fullPath)) {
            fullPath = path.join(projectsDirectory, `${slug}.${lang}.mdx`);
        }

        // Fallback to unlocalized
        if (!fs.existsSync(fullPath)) {
            fullPath = path.join(projectsDirectory, `${slug}.md`);
        }

        if (!fs.existsSync(fullPath)) {
            fullPath = path.join(projectsDirectory, `${slug}.mdx`);
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            metadata: data as ProjectMetadata,
            content,
        };
    } catch (error) {
        return null;
    }
}

export function getAllProjects(lang: Locale = 'en'): Project[] {
    const slugs = getProjectSlugs();
    const projects = slugs
        .map((slug) => getProjectBySlug(slug, lang))
        .filter((project): project is Project => project !== null && !project.metadata.draft)
        .sort((project1, project2) => (project1.metadata.date > project2.metadata.date ? -1 : 1));

    return projects;
}
