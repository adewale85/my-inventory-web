"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface Category { id: string; name: string; description?: string }
interface Unit { id: string; name: string; abbreviation?: string }

export default function SettingsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [categories, setCategories] = useState<Category[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  const [newCat, setNewCat] = useState({ name: "", description: "" });
  const [newUnit, setNewUnit] = useState({ name: "", abbreviation: "" });
  const [savingCat, setSavingCat] = useState(false);
  const [savingUnit, setSavingUnit] = useState(false);

  useEffect(() => {
    if (!isAdmin) return setLoading(false);
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [cRes, uRes] = await Promise.all([fetch('/api/v1/categories'), fetch('/api/v1/units-of-measure')]);
        if (!mounted) return;
        if (cRes.ok) setCategories(await cRes.json());
        if (uRes.ok) setUnits(await uRes.json());
      } catch (err) {
        console.error('Load failed', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-xl mx-auto rounded-lg border border-slate-200 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-rose-600">403 — Access Denied</h2>
          <p className="mt-2 text-sm text-slate-600">Administrator credentials required to view Settings.</p>
        </div>
      </div>
    );
  }

  async function createCategory() {
    if (!newCat.name) return;
    setSavingCat(true);
    try {
      const res = await fetch('/api/v1/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCat) });
      if (!res.ok) throw new Error('Create failed');
      const created = await res.json();
      setCategories((s) => [created, ...s]);
      setNewCat({ name: '', description: '' });
    } catch (err) { console.error(err); alert('Failed to create category'); } finally { setSavingCat(false); }
  }

  async function deleteCategory(id: string) {
    if (!confirm('Delete category?')) return;
    try {
      const res = await fetch(`/api/v1/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setCategories((s) => s.filter((c) => c.id !== id));
    } catch (err) { console.error(err); alert('Delete failed'); }
  }

  async function createUnit() {
    if (!newUnit.name) return;
    setSavingUnit(true);
    try {
      const res = await fetch('/api/v1/units-of-measure', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newUnit) });
      if (!res.ok) throw new Error('Create failed');
      const created = await res.json();
      setUnits((s) => [created, ...s]);
      setNewUnit({ name: '', abbreviation: '' });
    } catch (err) { console.error(err); alert('Failed to create unit'); } finally { setSavingUnit(false); }
  }

  async function deleteUnit(id: string) {
    if (!confirm('Delete unit?')) return;
    try {
      const res = await fetch(`/api/v1/units-of-measure/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setUnits((s) => s.filter((u) => u.id !== id));
    } catch (err) { console.error(err); alert('Delete failed'); }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Administrative Settings</h1>
        <p className="text-sm text-slate-500">Manage categories and units of measure.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium text-slate-800 mb-3">Category Manager</h2>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input placeholder="Name" value={newCat.name} onChange={(e) => setNewCat((s) => ({ ...s, name: e.target.value }))} className="col-span-2 rounded border border-slate-200 px-3 py-2" />
            <button onClick={createCategory} disabled={savingCat} className="rounded bg-emerald-500 text-white px-3 py-2">{savingCat ? 'Saving...' : 'Create'}</button>
            <input placeholder="Description" value={newCat.description} onChange={(e) => setNewCat((s) => ({ ...s, description: e.target.value }))} className="col-span-3 rounded border border-slate-200 px-3 py-2 mt-2" />
          </div>

          {loading ? (
            <div className="text-sm text-slate-500">Loading…</div>
          ) : (
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.id} className="flex items-center justify-between rounded border border-slate-100 p-2">
                  <div>
                    <div className="font-medium text-slate-800">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.description}</div>
                  </div>
                  <div>
                    <button onClick={() => deleteCategory(c.id)} className="text-sm rounded px-2 py-1 bg-rose-50 text-rose-700 border border-rose-100">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium text-slate-800 mb-3">Units of Measure</h2>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input placeholder="Name (e.g. Kilogram)" value={newUnit.name} onChange={(e) => setNewUnit((s) => ({ ...s, name: e.target.value }))} className="col-span-2 rounded border border-slate-200 px-3 py-2" />
            <button onClick={createUnit} disabled={savingUnit} className="rounded bg-emerald-500 text-white px-3 py-2">{savingUnit ? 'Saving...' : 'Create'}</button>
            <input placeholder="Abbrev (kg)" value={newUnit.abbreviation} onChange={(e) => setNewUnit((s) => ({ ...s, abbreviation: e.target.value }))} className="col-span-3 rounded border border-slate-200 px-3 py-2 mt-2" />
          </div>

          {loading ? (
            <div className="text-sm text-slate-500">Loading…</div>
          ) : (
            <ul className="space-y-2">
              {units.map((u) => (
                <li key={u.id} className="flex items-center justify-between rounded border border-slate-100 p-2">
                  <div>
                    <div className="font-medium text-slate-800">{u.name} <span className="text-xs text-slate-500">{u.abbreviation}</span></div>
                  </div>
                  <div>
                    <button onClick={() => deleteUnit(u.id)} className="text-sm rounded px-2 py-1 bg-rose-50 text-rose-700 border border-rose-100">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
