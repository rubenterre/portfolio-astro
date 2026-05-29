import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

// El loader file() exige que cada item de un array tenga un `id`.
// Nuestros JSON son arrays simples sin id, así que inyectamos uno por índice
// con este parser. Esto preserva el orden de aparición en el JSON.
const withIndexIds = (text: string) =>
  (JSON.parse(text) as Record<string, unknown>[]).map((item, index) => ({
    id: String(index),
    ...item,
  }));

// Esquema reutilizable para tarjetas de skills (icono + nombre)
const skillSchema = z.object({
  icon: z.string(),
  name: z.string(),
});

const developer = defineCollection({
  loader: file("src/data/developer.json", { parser: withIndexIds }),
  schema: skillSchema,
});

const designer = defineCollection({
  loader: file("src/data/designer.json", { parser: withIndexIds }),
  schema: skillSchema,
});

const instructor = defineCollection({
  loader: file("src/data/instructor.json", { parser: withIndexIds }),
  schema: skillSchema,
});

const educacion = defineCollection({
  loader: file("src/data/educacion.json", { parser: withIndexIds }),
  schema: z.object({
    icon: z.string(),
    name: z.string(),
    institution: z.string(),
    date: z.string(),
    description: z.string(),
  }),
});

const experience = defineCollection({
  loader: file("src/data/experience.json", { parser: withIndexIds }),
  schema: z.object({
    icon: z.string(),
    width: z.string().optional(),
    name: z.string(),
    profession: z.string(),
    date: z.string(),
    description: z.string(),
  }),
});

const technologySchema = z.object({
  icon: z.string(),
  name: z.string(),
});

const projectsDev = defineCollection({
  loader: file("src/data/projectsDev.json", { parser: withIndexIds }),
  schema: z.object({
    banner: z.string(),
    name: z.string(),
    description: z.string(),
    url: z.string(),
    urlcode: z.string().optional(),
    technologies: z.array(technologySchema),
  }),
});

const projectsDesign = defineCollection({
  loader: file("src/data/projectsDesign.json", { parser: withIndexIds }),
  schema: z.object({
    banner: z.string(),
    name: z.string(),
    description: z.string(),
    url: z.string(),
    technologies: z.array(technologySchema),
  }),
});

export const collections = {
  developer,
  designer,
  instructor,
  educacion,
  experience,
  projectsDev,
  projectsDesign,
};
