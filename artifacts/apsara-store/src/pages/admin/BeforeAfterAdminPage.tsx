import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';

interface Entry {
  id: string;
  concern: string;
  before_image: string;
  after_image: string;
  duration_weeks: number;
  product_used: string;
  sort_order: number;
  visible: boolean;
}

type FormState = Omit<Entry, 'id'>;

const BLANK: FormState = {
  concern: '',
  before_image: '',
  after_image: '',
  duration_weeks: 4,
  product_used: '',
  sort_order: 0,
  visible: true,
};

const G = '#c9a84c';
const D = '#1a1a1a';
const CR = '#faf8f5';

export default function BeforeAfterAdminPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>({ ...BLANK });
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [bFile, setBFile] = useState<File | null>(null);
  const [aFile, setAFile] = useState<File | null>(null);
  const [bPrev, setBPrev] = useState('');
  const [aPrev, setAPrev] = useState('');
  const bRef = useRef<HTMLInputElement>(null);
  const aRef = useRef<HTMLInputElement>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from('before_after_results')
      .select('*')
      .order('sort_order', { ascending: true });
    setEntries(data ?? []);
    setLoading(false);
  }

  async function pushFile(file: File): Promise<string> {
    const ext = file.name.split('.').pop() ?? 'jpg';
    const name = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from('results')
      .upload(name, file, { upsert: true });
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from('results').getPublicUrl(name);
    return data.publicUrl;
  }

  async function save() {
    if (!form.concern.trim()) { setMsg('❌ Concern is required'); return; }
    setBusy(true); setMsg('⏳ Uploading images…');
    try {
      let bi = form.before_image;
      let ai = form.after_image;
      if (bFile) bi = await pushFile(bFile);
      if (aFile) ai = await pushFile(aFile);
      const row = { ...form, before_image: bi, after_image: ai };
      if (editId) {
        const { error } = await supabase.from('before_after_results').update(row).eq('id', editId);
        if (error) throw new Error(error.message);
        setMsg('✅ Updated!');
      } else {
        const { error } = await supabase.from('before_after_results').insert(row);
        if (error) throw new Error(error.message);
        setMsg('✅ Saved!');
      }
      closeForm(); load();
    } catch (e) {
      setMsg('❌ ' + (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function closeForm() {
    setForm({ ...BLANK }); setEditId(null);
    setBFile(null); setAFile(null); setBPrev(''); setAPrev('');
    setOpen(false);
    if (bRef.current) bRef.current.value = '';
    if (aRef.current) aRef.current.value = '';
  }

  function startEdit(e: Entry) {
    setForm({
      concern: e.concern, before_image: e.before_image,
      after_image: e.after_image, duration_weeks: e.duration_weeks,
      product_used: e.product_used, sort_order: e.sort_order, visible: e.visible,
    });
    setEditId(e.id); setBFile(null); setAFile(null); setBPrev(''); setAPrev('');
    if (bRef.current) bRef.current.value = '';
    if (aRef.current) aRef.current.value = '';
    setOpen(true); setMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function remove(id: string) {
    if (!confirm('Delete this result?')) return;
    await supabase.from('before_after_results').delete().eq('id', id);
    load();
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '14px', background: '#fff', boxSizing: 'border-box',
  };
  const lbl: React.CSSProperties = {
    display: 'block', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '5px',
  };
  const uploadBox: React.CSSProperties = {
    border: `2px dashed ${G}`, borderRadius: '10px', padding: '10px', cursor: 'pointer',
    background: '#fffdf7', minHeight: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  return (
    <div style={{ background: CR, minHeight: '100vh', padding: '20px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: D }}>Before / After Results</h1>
          <button
            onClick={() => { closeForm(); setOpen(true); setMsg(''); }}
            style={{ background: G, color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 18px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>
            + Add
          </button>
        </div>

        {msg && (
          <div style={{
            padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
            background: msg.startsWith('✅') ? '#e8f5e9' : msg.startsWith('⏳') ? '#fff8e1' : '#fdecea',
            color: msg.startsWith('✅') ? '#2e7d32' : msg.startsWith('⏳') ? '#e65100' : '#c62828',
          }}>
            {msg}
          </div>
        )}

        {open && (
          <div style={{ background: '#fff', borderRadius: '14px', padding: '22px', marginBottom: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.09)' }}>
            <h2 style={{ margin: '0 0 18px', fontSize: '16px', fontWeight: 700, color: D }}>
              {editId ? '✏️ Edit Result' : '✨ New Result'}
            </h2>

            <div style={{ display: 'grid', gap: '14px' }}>

              <div>
                <label style={lbl}>Concern / Skin Issue *</label>
                <input style={inp} placeholder="e.g. Dark circles, Acne, Uneven tone"
                  value={form.concern} onChange={ev => setForm(p => ({ ...p, concern: ev.target.value }))} />
              </div>

              <div>
                <label style={lbl}>Product Used</label>
                <input style={inp} placeholder="e.g. Kumkumadi Serum"
                  value={form.product_used} onChange={ev => setForm(p => ({ ...p, product_used: ev.target.value }))} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={lbl}>Duration (weeks)</label>
                  <input style={inp} type="number" min={1} value={form.duration_weeks}
                    onChange={ev => setForm(p => ({ ...p, duration_weeks: +ev.target.value }))} />
                </div>
                <div>
                  <label style={lbl}>Sort Order</label>
                  <input style={inp} type="number" value={form.sort_order}
                    onChange={ev => setForm(p => ({ ...p, sort_order: +ev.target.value }))} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

                <div>
                  <label style={lbl}>Before Image</label>
                  <div style={uploadBox} onClick={() => bRef.current?.click()}>
                    {(bPrev || form.before_image)
                      ? <img src={bPrev || form.before_image} alt="before"
                          style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', display: 'block' }} />
                      : (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '28px' }}>📷</div>
                          <div style={{ fontSize: '11px', color: '#999', marginTop: '5px' }}>Tap to upload photo</div>
                        </div>
                      )
                    }
                  </div>
                  <input ref={bRef} type="file" accept="image/*" capture="environment"
                    style={{ display: 'none' }}
                    onChange={ev => {
                      const f = ev.target.files?.[0];
                      if (f) { setBFile(f); setBPrev(URL.createObjectURL(f)); }
                    }} />
                  {bFile ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#388e3c' }}>✅ {bFile.name}</span>
                      <button
                        onClick={() => { setBFile(null); setBPrev(''); if (bRef.current) bRef.current.value = ''; }}
                        style={{ fontSize: '11px', color: '#f44336', background: 'none', border: 'none', cursor: 'pointer' }}>
                        ✕ Remove
                      </button>
                    </div>
                  ) : (
                    <input style={{ ...inp, marginTop: '8px', fontSize: '12px' }}
                      placeholder="…or paste image URL"
                      value={form.before_image}
                      onChange={ev => setForm(p => ({ ...p, before_image: ev.target.value }))} />
                  )}
                </div>

                <div>
                  <label style={lbl}>After Image</label>
                  <div style={uploadBox} onClick={() => aRef.current?.click()}>
                    {(aPrev || form.after_image)
                      ? <img src={aPrev || form.after_image} alt="after"
                          style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', display: 'block' }} />
                      : (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '28px' }}>📷</div>
                          <div style={{ fontSize: '11px', color: '#999', marginTop: '5px' }}>Tap to upload photo</div>
                        </div>
                      )
                    }
                  </div>
                  <input ref={aRef} type="file" accept="image/*" capture="environment"
                    style={{ display: 'none' }}
                    onChange={ev => {
                      const f = ev.target.files?.[0];
                      if (f) { setAFile(f); setAPrev(URL.createObjectURL(f)); }
                    }} />
                  {aFile ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#388e3c' }}>✅ {aFile.name}</span>
                      <button
                        onClick={() => { setAFile(null); setAPrev(''); if (aRef.current) aRef.current.value = ''; }}
                        style={{ fontSize: '11px', color: '#f44336', background: 'none', border: 'none', cursor: 'pointer' }}>
                        ✕ Remove
                      </button>
                    </div>
                  ) : (
                    <input style={{ ...inp, marginTop: '8px', fontSize: '12px' }}
                      placeholder="…or paste image URL"
                      value={form.after_image}
                      onChange={ev => setForm(p => ({ ...p, after_image: ev.target.value }))} />
                  )}
                </div>

              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="vis-chk" checked={form.visible}
                  onChange={ev => setForm(p => ({ ...p, visible: ev.target.checked }))}
                  style={{ width: '16px', height: '16px', accentColor: G }} />
                <label htmlFor="vis-chk" style={{ fontSize: '14px', cursor: 'pointer', color: D }}>
                  Visible on homepage
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={save} disabled={busy} style={{
                  flex: 1, background: G, color: '#fff', border: 'none', borderRadius: '8px',
                  padding: '13px', fontWeight: 700, cursor: busy ? 'not-allowed' : 'pointer',
                  fontSize: '15px', opacity: busy ? 0.65 : 1,
                }}>
                  {busy ? 'Saving…' : editId ? 'Update Result' : 'Save Result'}
                </button>
                <button onClick={closeForm} style={{
                  padding: '13px 18px', border: '1px solid #ddd', borderRadius: '8px',
                  background: '#fff', cursor: 'pointer', fontSize: '14px', color: '#666',
                }}>
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#aaa' }}>Loading…</div>
        ) : entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#bbb', background: '#fff', borderRadius: '14px' }}>
            <div style={{ fontSize: '36px' }}>🌸</div>
            <div style={{ marginTop: '10px', fontSize: '14px' }}>No results yet. Add your first!</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {entries.map(e => (
              <div key={e.id} style={{
                background: '#fff', borderRadius: '12px', padding: '14px',
                display: 'flex', gap: '12px', alignItems: 'center',
                boxShadow: '0 1px 8px rgba(0,0,0,0.06)', flexWrap: 'wrap',
              }}>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#aaa', marginBottom: '3px', letterSpacing: '0.5px' }}>BEFORE</div>
                    <img src={e.before_image || 'https://placehold.co/68x68/f5f5f5/ccc?text=B'}
                      alt="before" style={{ width: '68px', height: '68px', objectFit: 'cover', borderRadius: '7px', border: '1px solid #eee' }} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#aaa', marginBottom: '3px', letterSpacing: '0.5px' }}>AFTER</div>
                    <img src={e.after_image || 'https://placehold.co/68x68/f5f5f5/ccc?text=A'}
                      alt="after" style={{ width: '68px', height: '68px', objectFit: 'cover', borderRadius: '7px', border: '1px solid #eee' }} />
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: '120px' }}>
                  <div style={{ fontWeight: 700, color: D, fontSize: '14px' }}>{e.concern}</div>
                  {e.product_used && (
                    <div style={{ fontSize: '12px', color: '#777', marginTop: '3px' }}>{e.product_used}</div>
                  )}
                  <div style={{ fontSize: '11px', color: '#bbb', marginTop: '3px' }}>
                    {e.duration_weeks} weeks · order #{e.sort_order}
                  </div>
                  <span style={{
                    fontSize: '11px', padding: '2px 8px', borderRadius: '20px',
                    marginTop: '5px', display: 'inline-block',
                    background: e.visible ? '#e8f5e9' : '#f5f5f5',
                    color: e.visible ? '#388e3c' : '#bbb', fontWeight: 600,
                  }}>
                    {e.visible ? '● Visible' : '○ Hidden'}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button onClick={() => startEdit(e)} style={{
                    padding: '7px 14px', border: `1px solid ${G}`, borderRadius: '6px',
                    background: '#fff', color: G, fontWeight: 600, cursor: 'pointer', fontSize: '13px',
                  }}>Edit</button>
                  <button onClick={() => remove(e.id)} style={{
                    padding: '7px 14px', border: '1px solid #f44336', borderRadius: '6px',
                    background: '#fff', color: '#f44336', fontWeight: 600, cursor: 'pointer', fontSize: '13px',
                  }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}