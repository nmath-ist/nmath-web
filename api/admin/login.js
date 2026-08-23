import { signSession, setSessionCookie } from '../_auth.js';

export default async function handler(req, res) {
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
