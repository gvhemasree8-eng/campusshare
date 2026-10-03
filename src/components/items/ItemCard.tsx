import { Link } from 'react-router-dom';

export function ItemCard({ item }: { item: { id: string; title: string; description: string; category: string; condition: string; images: string[]; rentalPrice?: number; location: string; available: boolean; borrowAvailable: boolean; rentAvailable: boolean } }) {
  return (
    <article className="item-card card">
      <div className="item-card-image">{item.images[0] || '📦'}</div>
      <div className="item-card-body">
        <div className="item-card-topline">
          <span className="category-tag">{item.category}</span>
          <span className={`status-tag ${item.available ? 'available' : 'unavailable'}`}>{item.available ? 'Available' : 'Unavailable'}</span>
        </div>
        <h3>{item.title}</h3>
        <p className="muted-line">{item.description.slice(0, 80)}...</p>
        <div className="meta-row small-row">
          <span>Condition: {item.condition}</span>
          <span>{item.location}</span>
        </div>
        <div className="price-row">
          <strong>${item.rentalPrice ?? 0}</strong>
          <span>/ day</span>
        </div>
        <Link to={`/items/${item.id}`} className="btn btn-primary full-width">View Details</Link>
      </div>
    </article>
  );
}
