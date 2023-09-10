import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/token";

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

let redirectToLogin: boolean = false;

export async function middleware(req: NextRequest) {
  let token: string | undefined;
  const pathname = req.nextUrl.pathname;
  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }

  if (pathname.startsWith("/login") && (!token || redirectToLogin)) return;

  if (!token && (pathname.startsWith("/api/users") || pathname.startsWith("/api/auth/logout"))) {
    return new Response("You have to be logged in", { status: 401 });
  }

  const response = NextResponse.next();

  try {
    if (token) {
      const { sub } = await verifyJwt(token);
      if (sub) {
        response.headers.set("X-USER-ID", sub);
        (req as AuthenticatedRequest).user = { id: sub };
      }
    }
  } catch (error) {
    redirectToLogin = true;
    if (pathname.startsWith("/api")) {
      return new Response("Token is invalid or user doesn't exist.", { status: 401 });
    }
    return NextResponse.redirect(new URL(`/login?${new URLSearchParams({ error: "badauth" })}`, req.url));
  }

  const authUser = (req as AuthenticatedRequest).user;

  if (!authUser) {
    return NextResponse.redirect(new URL(`/login?${new URLSearchParams({ error: "badauth", forceLogin: "true" })}`, req.url));
  }
  return response;
}

export const config = {
  matcher: ["/api/users/:path*"],
};
