import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/webhooks(.*)',
    'question/:id',
    '/tags',
    'tags/:d',
    '/profile/:id',
    '/community',
    '/collections',
  ],
  ignoredRoutes: ['/api/webhook', '/api/chatgpt'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
