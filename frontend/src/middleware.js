import { NextResponse } from "next/server";

export function middleware(req) {
  try {
    const token = req.cookies.get("token");
    console.log("Token in middleware:", token);

    if (req.nextUrl.pathname === "/" && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware error:", err);
    return new NextResponse("Internal Error in Middleware", { status: 500 });
  }
}

export const config = {
  matcher: ["/"], 
};
