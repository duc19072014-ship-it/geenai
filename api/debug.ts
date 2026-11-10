import app from '../server';

/**
 * Vercel Serverless Function entrypoint for /api/debug
 * Provides system diagnostics without exposing secrets.
 */
export default function handler(req: any, res: any) {
  if (!req.url || req.url === '/' || !req.url.startsWith('/api/')) {
    req.url = '/api/debug';
  }
  return app(req, res);
}
