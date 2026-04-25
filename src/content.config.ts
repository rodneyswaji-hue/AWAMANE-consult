import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    summary: z.string(),
    icon: z.string(), // key used to look up an SVG in components
    order: z.number().default(0),
    heroImage: z.string().optional(),
    features: z.array(z.string()).default([]),
    approach: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    location: z.string().optional(),
    year: z.string().optional(),
    category: z.enum(['crops', 'livestock', 'water', 'training', 'community']),
    coverImage: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    credentials: z.string().optional(),
    bio: z.string().optional(),
    image: z.string().optional(),
    lead: z.boolean().default(false),
    order: z.number().default(0),
    expertise: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Awamane Consult'),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { services, projects, team, blog };
