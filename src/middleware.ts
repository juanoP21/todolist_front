import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('authToken'); // Ejemplo de token en cookie

    // Si no hay token y la ruta no es /login, redirige a /login
    if (!token && req.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Si hay token y la ruta es /login, redirige a la página principal
    if (token && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Permite el acceso a todas las rutas si hay un token
    return NextResponse.next();
}

export const config = {
    matcher: ['/todo/:path*'], // Aplica solo a rutas que necesitan protección
};