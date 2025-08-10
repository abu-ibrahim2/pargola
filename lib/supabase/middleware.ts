import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip middleware check. You can remove this
  // once you setup the project.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.

  //-------------------------------
  // const { data } = await supabase.auth.getClaims();
  // const user = data?.claims;

  // if (
  //   request.nextUrl.pathname !== "/" &&
  //   !user &&
  //   !request.nextUrl.pathname.startsWith("/login") &&
  //   !request.nextUrl.pathname.startsWith("/auth")
  // ) {
  //   // no user, potentially respond by redirecting the user to the login page
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/auth/login";
  //   return NextResponse.redirect(url);
  // }
  //-------------------------------

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}

// import { NextResponse, type NextRequest } from "next/server";
// import { createServerClient } from "@supabase/ssr";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get: (k) => req.cookies.get(k)?.value,
//         set: () => {},
//         remove: () => {},
//       },
//     }
//   );

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // Allow the login page itself
//   if (req.nextUrl.pathname.startsWith("/admin/login")) return res;

//   // Gate /admin/*
//   if (req.nextUrl.pathname.startsWith("/admin")) {
//     if (!user) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/admin/login";
//       return NextResponse.redirect(url);
//     }

//     // Optional: enforce admin role by email or a custom claim
//     const isAdmin = user.email === process.env.ADMIN_EMAIL; // easiest
//     if (!isAdmin) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/";
//       return NextResponse.redirect(url);
//     }
//   }

//   return res;
// }

// export const config = {
//   matcher: ["/admin/:path*"], // only run middleware on /admin
// };
