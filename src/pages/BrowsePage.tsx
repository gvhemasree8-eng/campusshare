import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { getItems } from '../utils/storage';
import { CATEGORIES, CONDITIONS } from '../utils/helpers';
import { ItemCard } from '../components/items/ItemCard';

export default function BrowsePage() {
  const items = getItems();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [condition, setCondition] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const filteredItems = useMemo(() => {
    const filtered = items.filter(item => {
      if (!item.available) return false;
      const target = query.toLowerCase();
      const matchesSearch = !target ||
        item.title.toLowerCase().includes(target) ||
        item.description.toLowerCase().includes(target) ||
        item.location.toLowerCase().includes(target) ||
        item.category.toLowerCase().includes(target);
      const matchesCategory = category === 'all' || item.category === category;
      const matchesType = type === 'all' || (type === 'borrow' ? item.borrowAvailable : item.rentAvailable);
      const matchesCondition = condition === 'all' || item.condition === condition;
      return matchesSearch && matchesCategory && matchesType && matchesCondition;
    });

    switch (sortBy) {
      case 'newest':
        return [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'low-price':
        return [...filtered].sort((a, b) => (a.rentalPrice ?? 0) - (b.rentalPrice ?? 0));
      case 'rating':
        return [...filtered].sort((a, b) => b.condition.localeCompare(a.condition));
      default:
        return filtered;
    }
  }, [items, query, category, type, condition, sortBy]);

  return (
    <div className="page-section container">
      <div className="page-header">
        <div>
          <p className="eyebrow">Browse items</p>
          <h1>Find something useful on campus</h1>
        </div>
        <Link to="/post-item" className="btn btn-primary">+ Share an Item</Link>
      </div>

      <div className="filter-panel card">
        <div className="filter-row top-row">
          <div className="search-wrap wide">
            <input
              className="input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by item, category, description or location"
            />
          </div>
          <button className="btn btn-secondary"><SlidersHorizontal size={16} /> Filters</button>
        </div>

        <div className="filter-grid">
          <div className="form-group">
            <label className="label">Category</label>
            <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="all">All categories</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Type</label>
            <select className="select" value={type} onChange={e => setType(e.target.value)}>
              <option value="all">All</option>
              <option value="borrow">Borrow</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Condition</label>
            <select className="select" value={condition} onChange={e => setCondition(e.target.value)}>
              <option value="all">All conditions</option>
              {CONDITIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Sort by</label>
            <select className="select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="low-price">Price low to high</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state card mt-3">
          <h3>No items found</h3>
          <p>Try changing your filters or search for something else.</p>
        </div>
      ) : (
        <div className="item-grid mt-3">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
