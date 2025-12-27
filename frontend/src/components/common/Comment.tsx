import { Avatar, Box, Container, Typography } from "@mui/material";
import PostActionButtons from "./PostActionButtons";
import CommentForm from "../forms/CommentForm";

export interface CommentProps {
  id: number;
  body: string;
  author: {
    id: number;
    image: string;
    name: string;
    email: string;
  };
}
export default function Comment({
  comment,
  postId,
  onUpdate,
}: {
  comment: CommentProps;
  postId: number;
  onUpdate?: () => void;
}) {
  return (
    <Box>
      <Box display={"flex"} gap={2}>
        <Box>
          <Avatar src={comment.author.image} alt={comment.author.name} />
        </Box>
        <Box
          sx={{
            bgcolor: "background.default",
            py: 1,
            width: "100%",
            borderRadius: 1,
          }}
        >
          <Container>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography color="text.secondary">
                {comment.author.name}
              </Typography>
              <PostActionButtons
                model={comment}
                path="comments"
                editTitle="Edit comment"
                onUpdate={onUpdate}
                editForm={
                  <CommentForm
                    commentId={comment.id}
                    postId={postId}
                    onSuccess={onUpdate}
                  />
                }
              />
            </Box>
            <Typography variant="body1">{comment.body}</Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
