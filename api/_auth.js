import crypto from 'crypto';

const COOKIE_NAME = 'nmath_admin_session';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function getSecret() {
  // Usa um segredo dedicado se existir; caso contrário cai para a própria
  // password de admin (funciona, mas define ADMIN_SESSION_SECRET para
  // seres mais rigoroso).
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'nmath-dev-secret';
}

export function signSession() {
  const payload = `admin:${Date.now()}`;
  const sig = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
  return `${Buffer.from(payload).toString('base64url')}.${sig}`;
}

export function verifySession(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return false;
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig) return false;

  let payload;
  try {
    payload = Buffer.from(payloadB64, 'base64url').toString('utf8');
  } catch {
    return false;
  }

  const expectedSig = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;

  const ts = Number(payload.split(':')[1]);
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts < THIRTY_DAYS_MS;
}

export function parseCookies(req) {
  const header = req.headers.cookie || '';
  return Object.fromEntries(
    header
      .split(';')
      .filter(Boolean)
      .map((c) => {
        const idx = c.indexOf('=');
        const k = c.slice(0, idx).trim();
        const v = c.slice(idx + 1).trim();
        return [k, decodeURIComponent(v)];
      })
  );
}

export function isAuthenticated(req) {
  const cookies = parseCookies(req);
  return verifySession(cookies[COOKIE_NAME]);
}

export function setSessionCookie(res, token) {
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
    `Max-Age=${THIRTY_DAYS_MS / 1000}`,
  ];
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function clearSessionCookie(res) {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
  );
}
