import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

interface DecodedToken {
  sub: number;
  username: string;
  role: number;
}

export async function middleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '') || request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;
  console.log('[Middleware] Incoming path:', path);
  console.log('[Middleware] Token:', token);

  // Skip middleware for API routes
  if (path.startsWith('/api') || path.startsWith('/auth')) {
    console.log('[Middleware] Skipping middleware for API/Auth');
    return NextResponse.next();
  }

  // Public routes (no auth needed)
  const publicPaths = ['/login', '/signup'];
  if (publicPaths.some(p => path.startsWith(p))) {
    console.log('[Middleware] Public path allowed:', path);
    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    console.warn('[Middleware] No token, redirecting to login.');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'a1b2c3d4e5f6g7h8i9j0kAdminDashboard!');
    const { payload } = await jwtVerify(token, secret);

    // Validate the structure of the decoded token
    if (
      typeof payload !== 'object' ||
      payload === null ||
      !('sub' in payload) ||
      !('username' in payload) ||
      !('role' in payload) ||
      typeof payload.sub !== 'number' ||
      typeof payload.username !== 'string' ||
      typeof payload.role !== 'number'
    ) {
      throw new Error('Invalid token payload');
    }

    const decoded = payload as unknown as DecodedToken;
    console.log('[Middleware] Decoded token:', decoded);

    // Role-based routing
    const rolePaths: { [key: number]: string[] } = {
      1: ['/dashboard/developer'],
      2: ['/dashboard/platform-admin'],
      3: ['/dashboard/operations-admin'],
      4: ['/dashboard/retailer'],
      5: ['/dashboard/merchant'],
      6: ['/dashboard/supplier'],
      7: ['/dashboard/courier'],
      8: ['/customer'],
    };

    // Add search and role-request as an allowed path for all authenticated users except Developer (role 1)
    const allowedPaths = rolePaths[decoded.role] || [];
    if (decoded.role !== 1) {
      allowedPaths.push('/role-request');
    } 
    allowedPaths.push('/search')
    const isPathAllowed = allowedPaths.some((p) => path.startsWith(p));

    console.log('[Middleware] Allowed Paths:', allowedPaths);
    console.log('[Middleware] Is path allowed?', isPathAllowed);

    if (!isPathAllowed) {
      console.warn('[Middleware] Blocked access to:', path, '| role:', decoded.role);
      // return NextResponse.redirect(new URL('/login', request.url)); 
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized: You do not have access to this page.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Attach user info to request for downstream use
    const response = NextResponse.next();
    response.headers.set('x-user-id', decoded.sub.toString());
    response.headers.set('x-user-role', decoded.role.toString());
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.warn('[Middleware] Token error, redirecting to login:', error.message);
    } else {
      console.warn('[Middleware] Token error, redirecting to login:', error);
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};