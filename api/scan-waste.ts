import app from '../server';

/**
 * Vercel Serverless Function entrypoint for /api/scan-waste
 */
export default async function handler(req: any, res: any) {
  try {
    if (!req.url || req.url === '/' || !req.url.startsWith('/api/')) {
      req.url = '/api/scan-waste';
    }
    return app(req, res);
  } catch (err: any) {
    console.error('Vercel scan-waste handler error:', err);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        error: 'Lỗi hàm máy chủ Vercel: ' + (err?.message || 'Không rõ'),
        debug_info: {
          stage: 'server_error',
          status: 'error',
          rawErrorMessage: err?.message,
          timestamp: new Date().toISOString(),
        },
      });
    }
  }
}
