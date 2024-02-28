import { NextURL } from 'next/dist/server/web/next-url'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const API_PATH_PREFIX = '/api'

export function middleware(request: NextRequest) {
  const handlers = [
    new ApiProxyMiddleware(),
    //  new CspMiddleware()
  ]
  const applyMiddleware = (request: NextRequest, currentIndex: number): NextResponse<unknown> => {
    if (currentIndex === handlers.length) {
      return NextResponse.next()
    }
    const currentMiddleware = handlers[currentIndex]
    const next = (req: NextRequest) => applyMiddleware(req, currentIndex + 1)
    return currentMiddleware!.handle(request, next)
  }
  return applyMiddleware(request, 0)
}

class ApiProxyMiddleware {
  handle(request: NextRequest, next: (request: NextRequest) => NextResponse<unknown>) {
    if (!request.nextUrl.pathname.startsWith(API_PATH_PREFIX)) {
      return next(request)
    }
    const url = this.calcTargetUrl(request.nextUrl, process.env.PROXY_API_URL || '/')
    return NextResponse.rewrite(url, {
      status: 307,
      request: { headers: request.headers },
    })
  }
  private calcTargetUrl(prevUrl: NextURL, targetLocation: string) {
    const destination = new URL(targetLocation)
    const result = prevUrl.clone()
    result.protocol = destination.protocol
    result.host = destination.host
    result.port = destination.port
    result.pathname = this.joinPaths(destination.pathname, result.pathname)
    return result
  }
  private joinPaths(basePath: string, path: string) {
    const normalizedPath = path.startsWith(`${API_PATH_PREFIX}/`) ? path.replace(API_PATH_PREFIX, '') : path
    return basePath + normalizedPath
  }
}

// class CspMiddleware {
//   handle(request: NextRequest, next: (request: NextRequest) => NextResponse<unknown>) {
//     if (process.env.NODE_ENV !== 'production') {
//       return next(request)
//     }
//     const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
//     const cspHeader = `
//     default-src 'self' ws: wss:;
//     script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
//     style-src 'self' 'unsafe-inline';
//     img-src 'self' blob: data:;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     block-all-mixed-content;
//     upgrade-insecure-requests;
//     frame-ancestors 'none';
//     `
//     // Replace newline characters and spaces
//     const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

//     const requestHeaders = new Headers(request.headers)
//     requestHeaders.set('x-nonce', nonce)

//     requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

//     const response = NextResponse.next({
//       request: {
//         headers: requestHeaders,
//       },
//     })
//     response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

//     return response
//   }
// }

export const config = {
  matcher: [
    '/api/:path*',
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
