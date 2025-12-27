import z from "zod";

export const CommentSchema = z.object({
  body: z.string("Comment is required").nonempty("Comment is required"),
});

export type CommentSchema = z.infer<typeof CommentSchema>;
