import { useState, useEffect, useCallback, FormEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Pencil, Trash2, Plus, LogOut, ArrowLeft, X, Upload } from 'lucide-react';


function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const [ano, mes, dia] = dateStr.split('-').map(Number);
  if (!ano || !mes || !dia) return dateStr; // fallback se não vier no formato esperado
  return `${dia} ${meses[mes - 1]} ${ano}`;
}

// -------------------- Tipos --------------------
type Announcement = {
  id?: number;
  title: string;
  excerpt: string;
  category: string;
  event_date: string;
  read_time: string;
  featured: boolean;
  icon: string;
  full_content: string;
  sort_order: number;
  published: boolean;
};

type MagazineEdition = {
  id?: number;
  title: string;
  issue: string;
  cover_image_url: string;
  description: string;
  highlights: string;
  publish_date: string;
  link: string;
  is_current: boolean;
  sort_order: number;
  published: boolean;
};

type CalendarYear = {
  id?: number;
  year_label: string;
  calendar_link: string;
  sort_order: number;
};

type UpcomingEvent = {
  id?: number;
  title: string;
  event_date: string;
  event_time: string;
  location: string;
  description: string;
  event_type: string;
  link: string;
  sort_order: number;
  published: boolean;
};

type FlagshipEvent = {
  id?: number;
  title: string;
  short_description: string;
  category: string;
  stats: string;
  icon: string;
  year_links: string;
  sort_order: number;
  published: boolean;
};

type OracleEpisode = {
  id?: number;
  title: string;
  duration: string;
  episode_date: string;
  plays: string;
  url: string;
  sort_order: number;
  published: boolean;
};

type PhotoAlbum = {
  id?: number;
  title: string;
  drive_url: string;
  sort_order: number;
  published: boolean;
  album_date: string;
};

// -------------------- Helpers de API --------------------
async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Falha ao carregar dados');
  return res.json();
}

async function apiSend(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Ocorreu um erro');
  return data;
}

function confirmDelete(label: string) {
  return window.confirm(`Mover "${label}" para o lixo? Podes recuperá-lo depois na secção "Lixo".`);
}

function confirmPermanentDelete(label: string) {
  return window.confirm(`Eliminar definitivamente "${label}"? Esta ação NÃO pode ser desfeita.`);
}

// -------------------- Componente principal --------------------
export default function AdminPortal() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/admin/session')
      .then((r) => r.json())
      .then((d) => setAuthenticated(!!d.authenticated))
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">A verificar sessão...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onSuccess={() => setAuthenticated(true)} />;
  }

  return <Dashboard onLogout={() => setAuthenticated(false)} />;
}

// -------------------- Login --------------------
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiSend('/api/admin/login', 'POST', { password });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Password incorreta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Área de Administração</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'A entrar...' : 'Entrar'}
            </Button>
          </form>
          <a href="/" className="mt-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

// -------------------- Dashboard --------------------
function Dashboard({ onLogout }: { onLogout: () => void }) {
  async function handleLogout() {
    await apiSend('/api/admin/logout', 'POST');
    onLogout();
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg">Administração NMATH</h1>
          <a href="/" className="text-sm text-slate-400 hover:text-white inline-flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
          </a>
        </div>
        <Button variant="secondary" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-1" /> Sair
        </Button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Tabs defaultValue="announcements">
          <TabsList className="mb-6 flex-wrap h-auto">
            <TabsTrigger value="announcements">Anúncios</TabsTrigger>
            <TabsTrigger value="magazine">Revista</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="events">Próximos Eventos</TabsTrigger>
            <TabsTrigger value="flagship">Eventos NMATH</TabsTrigger>
            <TabsTrigger value="oracle">Oráculo</TabsTrigger>
            <TabsTrigger value="photos">Fotos</TabsTrigger>
          </TabsList>

          <TabsContent value="announcements">
            <ContentSection<Announcement>
              apiPath="/api/announcements"
              title="Anúncios"
              emptyItem={emptyAnnouncement}
              renderRow={(item) => ({ title: item.title, subtitle: `${item.category} · ${item.event_date}` })}
              FormComponent={AnnouncementForm}
            />
          </TabsContent>

          <TabsContent value="magazine">
            <ContentSection<MagazineEdition>
              apiPath="/api/magazine"
              title="Edições da Revista Ponto Fixo"
              emptyItem={emptyMagazine}
              renderRow={(item) => ({
                title: `${item.title} — ${item.issue}`,
                subtitle: item.is_current ? 'Edição atual' : item.publish_date,
              })}
              FormComponent={MagazineForm}
            />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarAdmin />
          </TabsContent>

          <TabsContent value="events">
            <ContentSection<UpcomingEvent>
              apiPath="/api/upcoming-events"
              title="Próximos Eventos"
              emptyItem={emptyEvent}
              renderRow={(item) => ({ title: item.title, subtitle: `${item.event_date} · ${item.location}` })}
              FormComponent={EventForm}
            />
          </TabsContent>

          <TabsContent value="flagship">
            <ContentSection<FlagshipEvent>
              apiPath="/api/flagship-events"
              title="Eventos NMATH (Integration Bee, Jornadas, ENEMATH, Time2Talk...)"
              emptyItem={emptyFlagship}
              renderRow={(item) => ({ title: item.title, subtitle: `${item.category} · ${item.stats}` })}
              FormComponent={FlagshipEventForm}
            />
          </TabsContent>

          <TabsContent value="oracle">
            <div className="mb-4 -mt-2">
              <p className="text-sm text-slate-500">
                O site mostra sempre o episódio mais recente (pela data) como "Último Episódio".
              </p>
            </div>
            <ContentSection<OracleEpisode>
              apiPath="/api/oracle-episodes"
              title="Episódios do Oráculo"
              emptyItem={emptyEpisode}
              renderRow={(item) => ({ title: item.title, subtitle: `${formatShortDate(item.episode_date)} · ${item.duration}` })}
              FormComponent={OracleForm}
            />
          </TabsContent>

          <TabsContent value="photos">
            <div className="mb-4 -mt-2">
              <p className="text-sm text-slate-500">
                O site mostra sempre o álbum do topo da lista como "Álbum mais recente". Ajusta a "Ordem" para trocar qual aparece.
              </p>
            </div>
            <ContentSection<PhotoAlbum>
              apiPath="/api/photo-albums"
              title="Álbuns de Fotos"
              emptyItem={emptyAlbum}
              renderRow={(item) => ({ title: item.title, subtitle: item.drive_url })}
              FormComponent={PhotoAlbumForm}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// -------------------- Bloco genérico: lista + lixo + rascunhos --------------------
function useContentList(apiPath: string, trashMode: boolean) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    setError('');
    const url = trashMode ? `${apiPath}?trash=true` : apiPath;
    apiGet<any[]>(url)
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [apiPath, trashMode]);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, error, reload: load };
}

function ContentSection<T extends { id?: number; published?: boolean }>({
  apiPath,
  title,
  emptyItem,
  renderRow,
  FormComponent,
}: {
  apiPath: string;
  title: string;
  emptyItem: T;
  renderRow: (item: T) => { title: string; subtitle: string };
  FormComponent: React.ComponentType<{ initial: T; onCancel: () => void; onSave: (item: T) => Promise<void> }>;
}) {
  const [trashMode, setTrashMode] = useState(false);
  const { items, loading, error, reload } = useContentList(apiPath, trashMode);
  const [editing, setEditing] = useState<T | null>(null);

  async function handleSave(item: T) {
    if (item.id) await apiSend(apiPath, 'PUT', item);
    else await apiSend(apiPath, 'POST', item);
    setEditing(null);
    reload();
  }

  async function handleTrash(item: T) {
    if (!confirmDelete(renderRow(item).title)) return;
    await apiSend(`${apiPath}?id=${item.id}`, 'DELETE');
    reload();
  }

  async function handleRestore(item: T) {
    await apiSend(apiPath, 'PUT', { id: item.id, action: 'restore' });
    reload();
  }

  async function handlePermanentDelete(item: T) {
    if (!confirmPermanentDelete(renderRow(item).title)) return;
    await apiSend(`${apiPath}?id=${item.id}&permanent=true`, 'DELETE');
    reload();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg">{title}{trashMode ? ' — Lixo' : ''}</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setTrashMode((v) => !v)}>
            {trashMode ? 'Ver ativos' : 'Lixo'}
          </Button>
          {!trashMode && (
            <Button size="sm" onClick={() => setEditing({ ...emptyItem })}>
              <Plus className="h-4 w-4 mr-1" /> Novo
            </Button>
          )}
        </div>
      </div>

      {loading && <p className="text-slate-500">A carregar...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && items.length === 0 && (
        <p className="text-slate-500 text-sm">{trashMode ? 'O lixo está vazio.' : 'Ainda não há nada aqui.'}</p>
      )}

      {items.map((item) => {
        const row = renderRow(item);
        return (
          <Card key={item.id}>
            <CardContent className="flex items-center justify-between py-4 gap-4">
              <div className="min-w-0">
                <p className="font-medium flex items-center gap-2 flex-wrap">
                  <span className="truncate">{row.title}</span>
                  {!trashMode && item.published === false && (
                    <Badge variant="outline" className="text-xs shrink-0">Rascunho</Badge>
                  )}
                </p>
                <p className="text-sm text-slate-500 truncate">{row.subtitle}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {trashMode ? (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleRestore(item)}>Repor</Button>
                    <Button size="sm" variant="outline" onClick={() => handlePermanentDelete(item)}>
                      Eliminar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="icon" variant="outline" onClick={() => setEditing(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => handleTrash(item)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {editing && (
        <FormModal title={editing.id ? 'Editar' : 'Novo'} onClose={() => setEditing(null)}>
          <FormComponent initial={editing} onCancel={() => setEditing(null)} onSave={handleSave} />
        </FormModal>
      )}
    </div>
  );
}

function FormModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-lg my-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>{title}</CardTitle>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

function PublishedToggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <Switch checked={checked} onCheckedChange={onChange} />
      <Label>{checked ? 'Publicado (visível no site)' : 'Rascunho (só visível aqui no admin)'}</Label>
    </div>
  );
}

// -------------------- Anúncios --------------------
const emptyAnnouncement: Announcement = {
  title: '', excerpt: '', category: 'Eventos', event_date: '', read_time: '2 min',
  featured: false, icon: 'calendar', full_content: '', sort_order: 0, published: true,
};

function AnnouncementForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: Announcement;
  onCancel: () => void;
  onSave: (item: Announcement) => Promise<void>;
}) {
  const [form, setForm] = useState<Announcement>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave(form);
    } catch (err: any) {
      setError(err.message || 'Erro ao guardar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Título</Label>
        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      </div>
      <div>
        <Label>Resumo (aparece no cartão da lista)</Label>
        <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Categoria</Label>
          <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Eventos, Workshops, Palestras..." />
        </div>
        <div>
          <Label>Data (texto livre)</Label>
          <Input value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} placeholder="Ex: 10 Dez, 2025" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Tempo de leitura</Label>
          <Input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} placeholder="2 min" />
        </div>
        <div>
          <Label>Ícone</Label>
          <select
            className="w-full border rounded-md h-9 px-3 bg-input-background text-sm"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
          >
            <option value="calendar">Calendário</option>
            <option value="trophy">Troféu</option>
            <option value="zap">Raio</option>
          </select>
        </div>
      </div>
      <div>
        <Label>Conteúdo completo (o texto que aparece ao abrir o anúncio — pode incluir HTML simples como &lt;p&gt; e &lt;strong&gt;)</Label>
        <Textarea
          className="min-h-32"
          value={form.full_content}
          onChange={(e) => setForm({ ...form, full_content: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
        <Label>Destacar este anúncio</Label>
      </div>
      <PublishedToggle checked={form.published} onChange={(v) => setForm({ ...form, published: v })} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={saving}>{saving ? 'A guardar...' : 'Guardar'}</Button>
      </div>
    </form>
  );
}

// -------------------- Revista --------------------
const emptyMagazine: MagazineEdition = {
  title: '', issue: '', cover_image_url: '', description: '', highlights: '',
  publish_date: '', link: '', is_current: false, sort_order: 0, published: true,
};

function ImageUploadField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const dataBase64: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1] || '');
        };
        reader.onerror = () => reject(new Error('Não foi possível ler o ficheiro.'));
        reader.readAsDataURL(file);
      });

      const data = await apiSend('/api/upload', 'POST', {
        filename: file.name,
        contentType: file.type,
        dataBase64,
      });
      onChange(data.url);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div className="space-y-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://... (ou faz upload abaixo)"
        required
      />
      <div className="flex items-center gap-2">
        <label className="inline-flex items-center gap-2 text-sm border rounded-md px-3 py-1.5 cursor-pointer hover:bg-slate-50">
          <Upload className="h-3.5 w-3.5" />
          {uploading ? 'A enviar...' : 'Fazer upload de uma imagem'}
          <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
        {value && (
          <img src={value} alt="Pré-visualização" className="h-12 w-9 object-cover rounded border border-slate-200" />
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function MagazineForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: MagazineEdition;
  onCancel: () => void;
  onSave: (item: MagazineEdition) => Promise<void>;
}) {
  const [form, setForm] = useState<MagazineEdition>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave(form);
    } catch (err: any) {
      setError(err.message || 'Erro ao guardar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Título (ex: #5)</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div>
          <Label>Edição (ex: Edição 2025)</Label>
          <Input value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} />
        </div>
      </div>
      <div>
        <Label>Imagem de capa</Label>
        <ImageUploadField value={form.cover_image_url} onChange={(url) => setForm({ ...form, cover_image_url: url })} />
      </div>
      <div>
        <Label>Descrição</Label>
        <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div>
        <Label>Destaques (um por linha)</Label>
        <Textarea value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Ano de publicação</Label>
          <Input value={form.publish_date} onChange={(e) => setForm({ ...form, publish_date: e.target.value })} />
        </div>
        <div>
          <Label>Link para ler/descarregar</Label>
          <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} required />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={form.is_current} onCheckedChange={(v) => setForm({ ...form, is_current: v })} />
        <Label>Esta é a edição atual (aparece em destaque)</Label>
      </div>
      <PublishedToggle checked={form.published} onChange={(v) => setForm({ ...form, published: v })} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={saving}>{saving ? 'A guardar...' : 'Guardar'}</Button>
      </div>
    </form>
  );
}

// -------------------- Calendário (sem lixo/rascunho — são só links por ano) --------------------
const emptyCalendarYear: CalendarYear = { year_label: '', calendar_link: '', sort_order: 0 };

function CalendarAdmin() {
  const [items, setItems] = useState<CalendarYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CalendarYear | null>(null);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    apiGet<CalendarYear[]>('/api/calendar-years')
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave(item: CalendarYear) {
    if (item.id) await apiSend('/api/calendar-years', 'PUT', item);
    else await apiSend('/api/calendar-years', 'POST', item);
    setEditing(null);
    load();
  }

  async function handleDelete(item: CalendarYear) {
    if (!window.confirm(`Eliminar "${item.year_label}"? Esta ação não pode ser desfeita.`)) return;
    await apiSend(`/api/calendar-years?id=${item.id}`, 'DELETE');
    load();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">Links dos Calendários por Ano</h2>
        <Button size="sm" onClick={() => setEditing({ ...emptyCalendarYear })}>
          <Plus className="h-4 w-4 mr-1" /> Novo
        </Button>
      </div>
      {loading && <p className="text-slate-500">A carregar...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium">{item.year_label}</p>
              <p className="text-sm text-slate-500">{item.calendar_link}</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" onClick={() => setEditing(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => handleDelete(item)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {editing && (
        <FormModal title={editing.id ? 'Editar ano' : 'Novo ano'} onClose={() => setEditing(null)}>
          <form
            className="space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              await handleSave(editing);
            }}
          >
            <div>
              <Label>Nome do ano</Label>
              <Input
                value={editing.year_label}
                onChange={(e) => setEditing({ ...editing, year_label: e.target.value })}
                placeholder="Ex: 1º Ano, Mestrado"
                required
              />
            </div>
            <div>
              <Label>Link do Google Calendar (link de incorporação/embed)</Label>
              <Input
                value={editing.calendar_link}
                onChange={(e) => setEditing({ ...editing, calendar_link: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </FormModal>
      )}
    </div>
  );
}

// -------------------- Próximos Eventos --------------------
const emptyEvent: UpcomingEvent = {
  title: '', event_date: '', event_time: '', location: '', description: '',
  event_type: 'Eventos', link: '', sort_order: 0, published: true,
};

function EventForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: UpcomingEvent;
  onCancel: () => void;
  onSave: (item: UpcomingEvent) => Promise<void>;
}) {
  const [form, setForm] = useState<UpcomingEvent>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave(form);
    } catch (err: any) {
      setError(err.message || 'Erro ao guardar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Título</Label>
        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Data</Label>
          <Input value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} placeholder="Ex: 9 Janeiro, 2026" required />
        </div>
        <div>
          <Label>Hora</Label>
          <Input value={form.event_time} onChange={(e) => setForm({ ...form, event_time: e.target.value })} placeholder="20:30" />
        </div>
      </div>
      <div>
        <Label>Local</Label>
        <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
      </div>
      <div>
        <Label>Descrição</Label>
        <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Tipo</Label>
          <Input value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })} placeholder="Eventos, Palestra..." />
        </div>
        <div>
          <Label>Link (opcional — inscrição, etc.)</Label>
          <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
        </div>
      </div>
      <PublishedToggle checked={form.published} onChange={(v) => setForm({ ...form, published: v })} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={saving}>{saving ? 'A guardar...' : 'Guardar'}</Button>
      </div>
    </form>
  );
}

// -------------------- Eventos NMATH (flagship) --------------------
const emptyFlagship: FlagshipEvent = {
  title: '', short_description: '', category: '', stats: '', icon: 'trophy', year_links: '', sort_order: 0, published: true,
};

function FlagshipEventForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: FlagshipEvent;
  onCancel: () => void;
  onSave: (item: FlagshipEvent) => Promise<void>;
}) {
  const [form, setForm] = useState<FlagshipEvent>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave(form);
    } catch (err: any) {
      setError(err.message || 'Erro ao guardar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Título</Label>
        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      </div>
      <div>
        <Label>Descrição curta</Label>
        <Textarea value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Categoria</Label>
          <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Competição, Conferência..." />
        </div>
        <div>
          <Label>Estatística/legenda</Label>
          <Input value={form.stats} onChange={(e) => setForm({ ...form, stats: e.target.value })} placeholder="Ex: Edição 2025 • Prémios" />
        </div>
      </div>
      <div>
        <Label>Ícone</Label>
        <select
          className="w-full border rounded-md h-9 px-3 bg-input-background text-sm"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
        >
          <option value="trophy">Troféu</option>
          <option value="book">Livro</option>
          <option value="mic">Microfone</option>
        </select>
      </div>
      <div>
        <Label>Links por ano (um por linha, formato: Ano|URL)</Label>
        <Textarea
          className="min-h-24 font-mono text-xs"
          value={form.year_links}
          onChange={(e) => setForm({ ...form, year_links: e.target.value })}
          placeholder={'2025|https://...\n2023|https://...'}
        />
        <p className="text-xs text-slate-500 mt-1">Cada linha vira um botão de ano no cartão. Exemplo: <code>2025|https://exemplo.pt</code></p>
      </div>
      <PublishedToggle checked={form.published} onChange={(v) => setForm({ ...form, published: v })} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={saving}>{saving ? 'A guardar...' : 'Guardar'}</Button>
      </div>
    </form>
  );
}

// -------------------- Oráculo (episódios) --------------------
const emptyEpisode: OracleEpisode = {
  title: '', duration: '', episode_date: '', plays: '', url: '', sort_order: 0, published: true,
};

function OracleForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: OracleEpisode;
  onCancel: () => void;
  onSave: (item: OracleEpisode) => Promise<void>;
}) {
  const [form, setForm] = useState<OracleEpisode>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave(form);
    } catch (err: any) {
      setError(err.message || 'Erro ao guardar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Título do episódio</Label>
        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      </div>
      <div>
        <Label>Link do Spotify (ou outra plataforma)</Label>
        <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Duração</Label>
          <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="42 min" />
        </div>
        <div>
          <Label>Data</Label>
          <Input type="date" value={form.episode_date} onChange={(e) => setForm({ ...form, episode_date: e.target.value })} required />
        </div>
      </div>
      <div>
        <Label>Ordem (0 = aparece primeiro / é o "último episódio")</Label>
        <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
      </div>
      <PublishedToggle checked={form.published} onChange={(v) => setForm({ ...form, published: v })} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={saving}>{saving ? 'A guardar...' : 'Guardar'}</Button>
      </div>
    </form>
  );
}

// -------------------- Fotos (álbuns) --------------------
const emptyAlbum: PhotoAlbum = {
  title: '', drive_url: '', album_date: '', sort_order: 0, published: true,
};

function PhotoAlbumForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: PhotoAlbum;
  onCancel: () => void;
  onSave: (item: PhotoAlbum) => Promise<void>;
}) {
  const [form, setForm] = useState<PhotoAlbum>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave(form);
    } catch (err: any) {
      setError(err.message || 'Erro ao guardar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Título do álbum</Label>
        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ex: Jornadas de Matemática 2025" required />
      </div>
      <div>
        <Label>Link da pasta do Drive</Label>
        <Input value={form.drive_url} onChange={(e) => setForm({ ...form, drive_url: e.target.value })} placeholder="https://drive.google.com/drive/folders/..." required />
      </div>
      <div>
  <Label>Data</Label>
  <Input type="date" value={form.album_date} onChange={(e) => setForm({ ...form, album_date: e.target.value })} required />
</div>
      <div>
        <Label>Ordem (0 = aparece primeiro / é o "álbum mais recente")</Label>
        <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
      </div>
      <PublishedToggle checked={form.published} onChange={(v) => setForm({ ...form, published: v })} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={saving}>{saving ? 'A guardar...' : 'Guardar'}</Button>
      </div>
    </form>
  );
}