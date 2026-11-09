import app from '../server';

/**
 * Vercel Serverless Function entrypoint for /api/scan-waste
 */
export default function handler(req: any, res: any) {
  return app(req, res);
}
