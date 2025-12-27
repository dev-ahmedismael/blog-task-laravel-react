import { PostProps } from "../components/common/Post";
import { cookies } from "next/headers";
import { Box, Container } from "@mui/material";
import ErrorSnackbar from "../components/common/ErrorSnackbar";
import Posts from "../components/common/Posts";

export default async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token");
  let error: string | null = null;
  let posts: PostProps[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      cache: "no-store",
      headers: {
        Cookie: token ? `access_token=${token}` : "",
      },
    });

    if (res.ok) {
      const data = await res.json();
      posts = data.data;
    }
  } catch (err: any) {
    error = err.message ?? "Faild to fetch posts";
  }

  return (
    <Box sx={{ paddingY: 5 }}>
      <Container>
        <Posts initialPosts={posts} path="posts" />
      </Container>

      <ErrorSnackbar error={error} />
    </Box>
  );
}
