import { useMemo, useState } from 'react';
import { fetchApi, uploadFile } from '../../api';
import { pageManifest } from '../../data/pageManifest';
import { useContentAdmin } from '../../context/ContentContext';
import {
  Save, Loader2, RotateCcw, Upload, ChevronDown, ChevronRight,
  ExternalLink, CheckCircle2, Image as ImageIcon
} from 'lucide-react';

const pageIds = Object.keys(pageManifest);
const previewPath = {
  global: '/', home: '/', layanan: '/layanan', portofolio: '/portofolio',
  testimoni: '/testimoni', kontak: '/kontak', 'about-adinko': '/tentang-adinko',
  'about-ghazi': '/tentang-ghazi'
};

const fieldBox = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1px solid var(--ad-input-border)', fontSize: '0.9rem',
  background: 'var(--ad-input)', color: 'var(--ad-heading)', fontFamily: 'inherit'
};

export const AdminPages = () => {
  const { overrides, reload } = useContentAdmin();
  const [activePage, setActivePage] = useState('home');
  const [draft, setDraft] = useState({});          // { key: string ('' = reset to default) }
  const [collapsed, setCollapsed] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [uploadingKey, setUploadingKey] = useState('');

  const pageOverrides = useMemo(() => overrides[activePage] || {}, [overrides, activePage]);
  const manifest = pageManifest[activePage];

  const dirtyKeys = useMemo(
    () => Object.keys(draft).filter(k => (draft[k] || '') !== (pageOverrides[k] || '')),
    [draft, pageOverrides]
  );
  const isDirty = dirtyKeys.length > 0;

  const switchPage = (id) => {
    if (isDirty && !window.confirm('Perubahan belum disimpan akan hilang. Lanjut pindah halaman?')) return;
    setActivePage(id);
    setDraft({});
    setError('');
    setSaved(false);
  };

  const valueOf = (key) => (key in draft ? draft[key] : (pageOverrides[key] ?? ''));
  const setValue = (key, v) => { setDraft(d => ({ ...d, [key]: v })); setSaved(false); };
  const resetField = (key) => setValue(key, '');

  const handleUpload = async (key, files) => {
    if (!files || !files.length) return;
    setUploadingKey(key);
    setError('');
    try {
      const res = await uploadFile(files[0]);
      if (res && res.url) setValue(key, res.url.split(',')[0].trim());
    } catch (err) {
      setError('Gagal mengunggah gambar: ' + (err.message || 'Error'));
    } finally {
      setUploadingKey('');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    const payload = {};
    dirtyKeys.forEach(k => { payload[k] = draft[k]; });
    try {
      await fetchApi(`/pages/${activePage}`, { method: 'PUT', body: JSON.stringify(payload) });
      await reload();
      setDraft({});
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    } catch (err) {
      setError(err.message || 'Gagal menyimpan konten halaman.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ad-heading)', marginBottom: '4px' }}>
            Editor Halaman
          </h1>
          <p style={{ color: 'var(--ad-muted)', fontSize: '0.9rem' }}>
            Ubah semua teks &amp; gambar di website publik. Kosongkan sebuah kolom untuk memakai teks bawaan.
          </p>
        </div>
        <a
          href={previewPath[activePage] || '/'}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ad-accent)', textDecoration: 'none' }}
        >
          <span>Buka halaman</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Page tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {pageIds.map(id => (
          <button
            key={id}
            onClick={() => switchPage(id)}
            style={{
              padding: '7px 14px', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 600,
              border: '1px solid var(--ad-border)', cursor: 'pointer',
              background: id === activePage ? 'var(--green-600)' : 'var(--ad-card)',
              color: id === activePage ? '#FFFFFF' : 'var(--ad-text)'
            }}
          >
            {pageManifest[id].label}
          </button>
        ))}
      </div>

      {saved && (
        <div style={{ background: 'var(--ad-ok-bg)', border: '1px solid var(--ad-ok-border)', color: 'var(--ad-ok)', padding: '10px 16px', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> <span>Tersimpan. Muat ulang halaman publik untuk melihat perubahan.</span>
        </div>
      )}
      {error && (
        <div style={{ background: 'var(--ad-danger-bg)', border: '1px solid var(--ad-danger-border)', color: 'var(--ad-danger)', padding: '10px 16px', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {/* Sections */}
      {manifest.sections.map(section => {
        const isOpen = !collapsed[section.id];
        return (
          <div key={section.id} style={{ background: 'var(--ad-card)', border: '1px solid var(--ad-border)', borderRadius: '14px', marginBottom: '14px', overflow: 'hidden' }}>
            <button
              onClick={() => setCollapsed(c => ({ ...c, [section.id]: isOpen }))}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 18px', background: 'var(--ad-subtle)', border: 'none', cursor: 'pointer', color: 'var(--ad-heading)', fontWeight: 700, fontSize: '0.95rem', textAlign: 'left' }}
            >
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span>{section.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.72rem', fontWeight: 600, color: 'var(--ad-faint)' }}>
                {section.fields.length} kolom
              </span>
            </button>

            {isOpen && (
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {section.fields.map(field => {
                  const v = valueOf(field.key);
                  const changed = dirtyKeys.includes(field.key);
                  return (
                    <div key={field.key}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ad-text)' }}>
                          {field.label}
                        </label>
                        {changed && <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--green-400, #A3E635)' }}>● diubah</span>}
                        {(v || (field.key in draft)) && (
                          <button
                            onClick={() => resetField(field.key)}
                            title="Kembalikan ke teks bawaan"
                            style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'transparent', border: 'none', color: 'var(--ad-faint)', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600 }}
                          >
                            <RotateCcw size={12} /> reset
                          </button>
                        )}
                      </div>

                      {field.type === 'textarea' ? (
                        <textarea
                          rows={3}
                          value={v}
                          placeholder={field.default}
                          onChange={e => setValue(field.key, e.target.value)}
                          style={fieldBox}
                        />
                      ) : field.type === 'image' ? (
                        <div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                              type="text"
                              value={v}
                              placeholder={field.default}
                              onChange={e => setValue(field.key, e.target.value)}
                              style={{ ...fieldBox, flex: 1, fontSize: '0.82rem' }}
                            />
                            <label style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--ad-soft)', color: 'var(--ad-text)', fontWeight: 600, fontSize: '0.8rem', cursor: uploadingKey === field.key ? 'wait' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                              {uploadingKey === field.key ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                              <span>Upload</span>
                              <input type="file" accept="image/*" onChange={e => handleUpload(field.key, e.target.files)} style={{ display: 'none' }} disabled={uploadingKey === field.key} />
                            </label>
                          </div>
                          <div style={{ marginTop: '8px', height: '90px', width: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--ad-border)', background: 'var(--ad-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {(v || field.default) ? (
                              <img src={v || field.default} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : <ImageIcon size={20} color="var(--ad-faint)" />}
                          </div>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={v}
                          placeholder={field.default}
                          onChange={e => setValue(field.key, e.target.value)}
                          style={fieldBox}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Sticky save bar */}
      <div style={{ position: 'sticky', bottom: 0, marginTop: '20px', padding: '14px 0', background: 'linear-gradient(to top, var(--ad-app) 60%, transparent)', display: 'flex', justifyContent: 'flex-end', gap: '12px', alignItems: 'center' }}>
        {isDirty && <span style={{ fontSize: '0.8rem', color: 'var(--ad-muted)' }}>{dirtyKeys.length} perubahan belum disimpan</span>}
        <button
          onClick={handleSave}
          disabled={saving || !isDirty}
          className="btn-primary-hero"
          style={{ padding: '11px 24px', fontSize: '0.9rem', opacity: (saving || !isDirty) ? 0.55 : 1, cursor: (saving || !isDirty) ? 'not-allowed' : 'pointer' }}
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{saving ? 'Menyimpan...' : `Simpan ${pageManifest[activePage].label}`}</span>
        </button>
      </div>
    </div>
  );
};
