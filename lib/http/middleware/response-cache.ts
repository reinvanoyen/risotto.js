import { Request, Response, NextFunction, RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface CacheOptions {
    cacheDir?: string;
    ttlMs?: number; // time to live
}

const fsResponseCache = (
    options: CacheOptions = {}
): RequestHandler => {

    const cacheDir = options.cacheDir ?? '.cache';
    const ttlMs = options.ttlMs ?? 1000 * 60 * 60; // 1 hour

    fs.mkdirSync(cacheDir, { recursive: true });

    return (req: Request, res: Response, next: NextFunction) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        const cacheKey = crypto
            .createHash('sha1')
            .update(req.originalUrl)
            .digest('hex');

        const cacheFile = path.join(cacheDir, cacheKey + '.json');

        // Serve cached response if valid
        if (fs.existsSync(cacheFile)) {
            const stats = fs.statSync(cacheFile);
            const isExpired = Date.now() - stats.mtimeMs > ttlMs;

            if (!isExpired) {
                const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));

                res.status(cached.status);
                Object.entries(cached.headers).forEach(([key, value]) => {
                    res.setHeader(key, value as string);
                });

                return res.send(Buffer.from(cached.body, 'base64'));
            }
        }

        // Intercept response
        const originalSend = res.send.bind(res);
        const chunks: Buffer[] = [];

        res.send = (body: any): Response => {
            if (body instanceof Buffer) {
                chunks.push(body);
            } else if (typeof body === 'string') {
                chunks.push(Buffer.from(body));
            } else {
                chunks.push(Buffer.from(JSON.stringify(body)));
            }

            return originalSend(body);
        };

        res.on('finish', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                const bodyBuffer = Buffer.concat(chunks);

                const cachePayload = {
                    status: res.statusCode,
                    headers: res.getHeaders(),
                    body: bodyBuffer.toString('base64'),
                };

                fs.writeFileSync(cacheFile, JSON.stringify(cachePayload));
            }
        });

        next();
    };
};

export default fsResponseCache;