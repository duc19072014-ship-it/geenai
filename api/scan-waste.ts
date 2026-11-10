import app from '../server';

/**
 * Vercel Serverless Function entrypoint for /api/scan-waste
 */
export default function handler(req: any, res: any) {
  if (!req.url || req.url === '/' || !req.url.startsWith('/api/')) {
    req.url = '/api/scan-waste';
  }
  return app(req, res);
}
