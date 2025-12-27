import z from "zod";

export const PostSchema = z.object({
  title: z.string("Title is required").nonempty("Title is required"),
  body: z.string("Post is required").nonempty("Post is required"),
  tags: z.array(z.string()).nonempty("Tags are required"),
});

export type PostSchema = z.infer<typeof PostSchema>;
