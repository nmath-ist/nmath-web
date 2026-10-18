import { signSession, setSessionCookie, clearSessionCookie, isAuthenticated } from '../_auth.js';

// Junta login, logout e session numa só função serverless (o plano gratuito do
// Vercel só permite 12). Os URLs continuam: /api/admin/login, /logout e /session.
export default async function handler(req, res) {
  const action = req.query?.action;

  if (action === 'login') {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Método não permitido' });
    }
    const { password } = req.body || {};
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
      return res.status(500).json({ error: 'ADMIN_PASSWORD não está configurada no servidor.' });
    }
    if (!password || password !== expected) {
      return res.status(401).json({ error: 'Password incorreta.' });
    }
    const token = signSession();
    setSessionCookie(res, token);
    return res.status(200).json({ ok: true });
  }

  if (action === 'logout') {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Método não permitido' });
    }
    clearSessionCookie(res);
    return res.status(200).json({ ok: true });
  }

  if (action === 'session') {
    return res.status(200).json({ authenticated: isAuthenticated(req) });
  }

  return res.status(404).json({ error: 'Não encontrado' });
}
