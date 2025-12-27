import { cookies } from "next/headers";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  image?: string;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token");

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: {
        Cookie: token ? `access_token=${token.value}` : "",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    const user: AuthUser = data.data;
    return user;
  } catch {
    return null;
  }
}
