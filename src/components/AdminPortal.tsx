import { useState, useEffect, FormEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Pencil, Trash2, Plus, LogOut, ArrowLeft, X } from 'lucide-react';

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
          <TabsList className="mb-6">
            <TabsTrigger value="announcements">Anúncios</TabsTrigger>
            <TabsTrigger value="magazine">Revista</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="events">Próximos Eventos</TabsTrigger>
          </TabsList>

          <TabsContent value="announcements">
            <AnnouncementsAdmin />
          </TabsContent>
          <TabsContent value="magazine">
            <MagazineAdmin />
          </TabsContent>
          <TabsContent value="calendar">
            <CalendarAdmin />
          </TabsContent>
          <TabsContent value="events">
            <EventsAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// -------------------- Bloco genérico de lista --------------------
function AdminListShell({
  title,
  onNew,
  children,
}: {
  title: string;
  onNew: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">{title}</h2>
        <Button size="sm" onClick={onNew}>
          <Plus className="h-4 w-4 mr-1" /> Novo
        </Button>
      </div>
      {children}
    </div>
  );
}

function ItemRow({
  title,
  subtitle,
  onEdit,
  onDelete,
}: {
  title: string;
  subtitle: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between py-4">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="outline" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
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

function confirmDelete(label: string) {
  return window.confirm(`Tens a certeza que queres eliminar "${label}"? Esta ação não pode ser desfeita.`);
}

// -------------------- Anúncios --------------------
const emptyAnnouncement: Announcement = {
  title: '', excerpt: '', category: 'Eventos', event_date: '', read_time: '2 min',
  featured: false, icon: 'calendar', full_content: '', sort_order: 0,
};

function AnnouncementsAdmin() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    apiGet<Announcement[]>('/api/announcements')
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave(item: Announcement) {
    if (item.id) await apiSend('/api/announcements', 'PUT', item);
    else await apiSend('/api/announcements', 'POST', item);
    setEditing(null);
    load();
  }

  async function handleDelete(item: Announcement) {
    if (!confirmDelete(item.title)) return;
    await apiSend(`/api/announcements?id=${item.id}`, 'DELETE');
    load();
  }

  return (
    <AdminListShell title="Anúncios" onNew={() => setEditing({ ...emptyAnnouncement })}>
      {loading && <p className="text-slate-500">A carregar...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {items.map((item) => (
        <ItemRow
          key={item.id}
          title={item.title}
          subtitle={`${item.category} · ${item.event_date}`}
          onEdit={() => setEditing(item)}
          onDelete={() => handleDelete(item)}
        />
      ))}

      {editing && (
        <FormModal title={editing.id ? 'Editar anúncio' : 'Novo anúncio'} onClose={() => setEditing(null)}>
          <AnnouncementForm initial={editing} onCancel={() => setEditing(null)} onSave={handleSave} />
        </FormModal>
      )}
    </AdminListShell>
  );
}

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
  publish_date: '', link: '', is_current: false, sort_order: 0,
};

function MagazineAdmin() {
  const [items, setItems] = useState<MagazineEdition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MagazineEdition | null>(null);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    apiGet<MagazineEdition[]>('/api/magazine')
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave(item: MagazineEdition) {
    if (item.id) await apiSend('/api/magazine', 'PUT', item);
    else await apiSend('/api/magazine', 'POST', item);
    setEditing(null);
    load();
  }

  async function handleDelete(item: MagazineEdition) {
    if (!confirmDelete(item.title)) return;
    await apiSend(`/api/magazine?id=${item.id}`, 'DELETE');
    load();
  }

  return (
    <AdminListShell title="Edições da Revista Ponto Fixo" onNew={() => setEditing({ ...emptyMagazine })}>
      {loading && <p className="text-slate-500">A carregar...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {items.map((item) => (
        <ItemRow
          key={item.id}
          title={`${item.title} — ${item.issue}`}
          subtitle={item.is_current ? 'Edição atual' : item.publish_date}
          onEdit={() => setEditing(item)}
          onDelete={() => handleDelete(item)}
        />
      ))}

      {editing && (
        <FormModal title={editing.id ? 'Editar edição' : 'Nova edição'} onClose={() => setEditing(null)}>
          <MagazineForm initial={editing} onCancel={() => setEditing(null)} onSave={handleSave} />
        </FormModal>
      )}
    </AdminListShell>
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
        <Label>URL da imagem de capa</Label>
        <Input
          value={form.cover_image_url}
          onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
          placeholder="https://... (usa um link direto para a imagem)"
          required
        />
        <p className="text-xs text-slate-500 mt-1">
          Podes fazer upload da imagem ao Google Drive/Imgur e colar aqui o link direto, ou pedir a um developer para a adicionar à pasta public/magazine do site.
        </p>
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
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={saving}>{saving ? 'A guardar...' : 'Guardar'}</Button>
      </div>
    </form>
  );
}

// -------------------- Calendário --------------------
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
    if (!confirmDelete(item.year_label)) return;
    await apiSend(`/api/calendar-years?id=${item.id}`, 'DELETE');
    load();
  }

  return (
    <AdminListShell title="Links dos Calendários por Ano" onNew={() => setEditing({ ...emptyCalendarYear })}>
      {loading && <p className="text-slate-500">A carregar...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {items.map((item) => (
        <ItemRow
          key={item.id}
          title={item.year_label}
          subtitle={item.calendar_link}
          onEdit={() => setEditing(item)}
          onDelete={() => handleDelete(item)}
        />
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
    </AdminListShell>
  );
}

// -------------------- Próximos Eventos --------------------
const emptyEvent: UpcomingEvent = {
  title: '', event_date: '', event_time: '', location: '', description: '',
  event_type: 'Eventos', link: '', sort_order: 0,
};

function EventsAdmin() {
  const [items, setItems] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<UpcomingEvent | null>(null);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    apiGet<UpcomingEvent[]>('/api/upcoming-events')
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave(item: UpcomingEvent) {
    if (item.id) await apiSend('/api/upcoming-events', 'PUT', item);
    else await apiSend('/api/upcoming-events', 'POST', item);
    setEditing(null);
    load();
  }

  async function handleDelete(item: UpcomingEvent) {
    if (!confirmDelete(item.title)) return;
    await apiSend(`/api/upcoming-events?id=${item.id}`, 'DELETE');
    load();
  }

  return (
    <AdminListShell title="Próximos Eventos" onNew={() => setEditing({ ...emptyEvent })}>
      {loading && <p className="text-slate-500">A carregar...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {items.map((item) => (
        <ItemRow
          key={item.id}
          title={item.title}
          subtitle={`${item.event_date} · ${item.location}`}
          onEdit={() => setEditing(item)}
          onDelete={() => handleDelete(item)}
        />
      ))}

      {editing && (
        <FormModal title={editing.id ? 'Editar evento' : 'Novo evento'} onClose={() => setEditing(null)}>
          <EventForm initial={editing} onCancel={() => setEditing(null)} onSave={handleSave} />
        </FormModal>
      )}
    </AdminListShell>
  );
}

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
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={saving}>{saving ? 'A guardar...' : 'Guardar'}</Button>
      </div>
    </form>
  );
}
