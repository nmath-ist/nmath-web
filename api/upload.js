import { getSupabase } from './_supabase.js';
import { isAuthenticated } from './_auth.js';

const BUCKET = 'nmath-uploads';
const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

export const config = {
  api: { bodyParser: { sizeLimit: '8mb' } },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método não permitido' });
  }

  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  try {
    const { filename, contentType, dataBase64 } = req.body || {};

    if (!filename || !contentType || !dataBase64) {
      return res.status(400).json({ error: 'Faltam dados do ficheiro.' });
    }
    if (!ALLOWED_TYPES.includes(contentType)) {
      return res.status(400).json({ error: 'Tipo de ficheiro não suportado. Usa PNG, JPEG, WEBP ou GIF.' });
    }

    const buffer = Buffer.from(dataBase64, 'base64');
    if (buffer.length > MAX_BYTES) {
      return res.status(400).json({ error: 'Imagem demasiado grande (máx. 5MB).' });
    }

    const supabase = getSupabase();
    const ext = (filename.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '') || 'png';
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(safeName, buffer, { contentType, upsert: false });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(safeName);

    return res.status(201).json({ url: publicData.publicUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Erro ao fazer upload.' });
  }
}
