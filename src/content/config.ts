import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    locale: z.enum(['en', 'pl']),
    date: z.string(),
    role: z.string(),
    tech: z.array(z.string()),
    github: z.string().url(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    highlights: z.array(z.string()).default([]),
    summary: z.string(),
  }),
});

export const collections = { projects };
