export interface ProjectMetadata {
    title: string;
    description: string;
    date: string;
    technologies: string[];
    featured: boolean;
    draft?: boolean;
}

export interface Project {
    slug: string;
    metadata: ProjectMetadata;
    content: string;
}
