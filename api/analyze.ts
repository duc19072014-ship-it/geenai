import app from '../server';

/**
 * Vercel Serverless Function entrypoint for /api/analyze
 */
export default function handler(req: any, res: any) {
  if (!req.url || req.url === '/' || !req.url.startsWith('/api/')) {
    req.url = '/api/analyze';
  }
  return app(req, res);
}
