import { authMiddleware } from "@clerk/nextjs";

// public routes
export default authMiddleware({
  publicRoutes: [
    "/api/webhooks(.*)",
    "/api/uploadthing",
    "/api/blocks",
    "/api/follows",
    "/api/likes",
    "/api/mutes",
    "/api/replies",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
