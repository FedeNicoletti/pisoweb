import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Use dynamic import for @clerk/nextjs
let authMiddleware;

if (typeof window === 'undefined') {
  authMiddleware = require('@clerk/nextjs').authMiddleware;
}

// Define a dummy middleware for Edge environment compatibility
const dummyMiddleware = (req: NextRequest) => {
  return NextResponse.next();
};

const myAuthMiddleware = authMiddleware ? authMiddleware : dummyMiddleware;

// Export the middleware function
export default myAuthMiddleware({
  publicRoutes: ["/api/webhook"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
