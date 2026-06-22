import { NextResponse } from "next/server";
import { getSession } from "./lib/core/session";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/browse-recipes/:path*"],
};


// Realoding please wait

// /browse-recipes/:path* are here any err