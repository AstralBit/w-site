import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 匹配所有路径，除了：
  // - api 路由
  // - _next 静态文件
  // - _vercel
  // - 静态文件（图片等）
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

