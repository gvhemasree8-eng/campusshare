import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Item } from '../types';
import { createItem, getCurrentUser } from '../utils/storage';
import { CATEGORIES, CONDITIONS, generateId } from '../utils/helpers';

export default function PostItemPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    category: CATEGORIES[0],
    description: '',
    condition: 'excellent',
    location: '',
    borrowAvailable: true,
    rentAvailable: true,
    rentalPrice: '10',
    deposit: '50',
    preferredDuration: '',
    notes: ''
  });

  const handleChange = (key: keyof typeof form, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) {
      alert('You must be logged in to post an item.');
      return;
    }
    if (!form.title || !form.description || !form.location) {
      alert('Please fill in all required fields.');
      return;
    }

    const newItem: Item = {
      id: generateId(),
      title: form.title,
      description: form.description,
      category: form.category,
      condition: form.condition as Item['condition'],
      images: ['📦'],
      ownerId: user.id,
      location: form.location,
      available: true,
      borrowAvailable: form.borrowAvailable,
      rentAvailable: form.rentAvailable,
      rentalPrice: form.rentAvailable ? Number(form.rentalPrice) || 0 : undefined,
      deposit: Number(form.deposit) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    createItem(newItem);
    alert('Your item is now available to the community.');
    navigate('/dashboard');
  };

  return (
    <div className="container page-section">
      <div className="page-header">
        <div>
          <p className="eyebrow">Post an item</p>
          <h1>List something your campus community can use</h1>
        </div>
      </div>

      <form className="card form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="label">Item name</label>
            <input className="input" value={form.title} onChange={e => handleChange('title', e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="label">Category</label>
            <select className="select" value={form.category} onChange={e => handleChange('category', e.target.value)}>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="form-group full">
            <label className="label">Description</label>
            <textarea className="textarea" rows={5} value={form.description} onChange={e => handleChange('description', e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="label">Condition</label>
            <select className="select" value={form.condition} onChange={e => handleChange('condition', e.target.value)}>
              {CONDITIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="label">Location</label>
            <input className="input" value={form.location} onChange={e => handleChange('location', e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="label">Borrow available</label>
            <input type="checkbox" checked={form.borrowAvailable} onChange={e => handleChange('borrowAvailable', e.target.checked)} />
          </div>
          <div className="form-group">
            <label className="label">Rent available</label>
            <input type="checkbox" checked={form.rentAvailable} onChange={e => handleChange('rentAvailable', e.target.checked)} />
          </div>
          <div className="form-group">
            <label className="label">Rental price</label>
            <input className="input" type="number" value={form.rentalPrice} onChange={e => handleChange('rentalPrice', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label">Security deposit</label>
            <input className="input" type="number" value={form.deposit} onChange={e => handleChange('deposit', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label">Preferred duration</label>
            <input className="input" value={form.preferredDuration} onChange={e => handleChange('preferredDuration', e.target.value)} />
          </div>
          <div className="form-group full">
            <label className="label">Additional notes</label>
            <textarea className="textarea" rows={4} value={form.notes} onChange={e => handleChange('notes', e.target.value)} />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">Publish Item</button>
        </div>
      </form>
    </div>
  );
}
