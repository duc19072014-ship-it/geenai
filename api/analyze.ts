import app from '../server';

/**
 * Vercel Serverless Function entrypoint for /api/analyze
 */
export default function handler(req: any, res: any) {
  return app(req, res);
}
