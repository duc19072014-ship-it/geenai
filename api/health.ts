import app from '../server';

/**
 * Vercel Serverless Function entrypoint for /api/health
 */
export default function handler(req: any, res: any) {
  if (!req.url || req.url === '/' || !req.url.startsWith('/api/')) {
    req.url = '/api/health';
  }
  return app(req, res);
}
