import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];

  if (
    subdomain === 'www' ||
    subdomain === 'localhost' ||
    subdomain === 'edupay' ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/auth') ||
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname.startsWith('/aluno') ||
    request.nextUrl.pathname.startsWith('/superadmin')
  ) {
    return NextResponse.next();
  }

  url.pathname = `/tenant/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth|admin|aluno|superadmin).*)'],
};