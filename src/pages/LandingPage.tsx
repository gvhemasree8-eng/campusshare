import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { SearchBar } from '../layout/Navbar';
import { getItems } from '../../utils/storage';
import { CATEGORIES } from '../../utils/helpers';

export default function LandingPage() {
  const items = getItems().slice(0, 4);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <Badge variant="info">Trusted by campus communities</Badge>
            <h1>Borrow what you need. Share what you have.</h1>
            <p className="hero-copy">
              CampusShare helps students save money, reduce waste, and access useful things from people around them.
            </p>
            <div className="hero-actions">
              <Link to="/browse" className="btn btn-primary">Find an Item <ArrowRight size={18} /></Link>
              <Link to="/post-item" className="btn btn-secondary">Share an Item</Link>
            </div>
            <div className="hero-search-wrap">
              <SearchBar value="" onChange={() => undefined} placeholder="Search for calculators, bikes, tools or books" />
            </div>
            <div className="popular-tags">
              {['Calculators', 'Bikes', 'Books', 'Tools', 'Projectors'].map(tag => (
                <span key={tag} className="filter-chip">{tag}</span>
              ))}
            </div>
          </div>
          <div className="hero-visual card">
            <div className="visual-top">
              <div className="mini-card">
                <span className="mini-icon">📚</span>
                <div>
                  <strong>3,500+</strong>
                  <p>Items shared</p>
                </div>
              </div>
              <div className="mini-card success">
                <span className="mini-icon">✅</span>
                <div>
                  <strong>98%</strong>
                  <p>Trusted lending</p>
                </div>
              </div>
            </div>
            <div className="visual-image">🧮</div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Popular categories</p>
              <h2>Find the essentials your campus life needs</h2>
            </div>
          </div>
          <div className="category-grid">
            {CATEGORIES.slice(0, 6).map(cat => (
              <div key={cat} className="category-card card">
                <div className="category-icon">{cat === 'Electronics' ? '💻' : cat === 'Art & Design' ? '🎨' : cat === 'Sports & Outdoor' ? '🚴' : cat === 'Books & Textbooks' ? '📚' : cat === 'School Supplies' ? '✏️' : '🔧'}</div>
                <h3>{cat}</h3>
                <p>Fresh deals from students near you</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section soft-bg">
        <div className="container">
          <div className="section-head align-center">
            <p className="eyebrow">How it works</p>
            <h2>Simple steps from request to return</h2>
          </div>
          <div className="steps-grid">
            {['Find an item', 'Send a request', 'Connect with the owner', 'Borrow or rent', 'Return and review'].map((step, index) => (
              <div key={step} className="step-card card">
                <span className="step-no">0{index + 1}</span>
                <h3>{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Featured items</p>
              <h2>Popular on campus right now</h2>
            </div>
          </div>
          <div className="card-grid">
            {items.map(item => (
              <div key={item.id} className="item-card card">
                <div className="item-card-image">{item.images[0]}</div>
                <div className="item-card-body">
                  <div className="item-card-topline">
                    <span className="category-tag">{item.category}</span>
                    <span className="status-tag available">Available</span>
                  </div>
                  <h3>{item.title}</h3>
                  <div className="owner-row">
                    <span className="owner-avatar">👤</span>
                    <span>Owner: Alex</span>
                  </div>
                  <div className="rating-row">
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    <span>4.8</span>
                  </div>
                  <div className="price-row">
                    <strong>${item.rentalPrice ?? 10}</strong>
                    <span>/ day</span>
                  </div>
                  <Link to={`/items/${item.id}`} className="btn btn-primary full-width">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section soft-bg">
        <div className="container trust-grid">
          <div>
            <p className="eyebrow">Trust & safety</p>
            <h2>Built to feel secure for every campus exchange</h2>
            <ul className="check-list">
              <li><ShieldCheck size={18} /> Verified student profiles</li>
              <li><ShieldCheck size={18} /> Transparent reviews and ratings</li>
              <li><ShieldCheck size={18} /> Secure communication before handoff</li>
            </ul>
          </div>
          <div className="stats-grid">
            <div className="stat-card card"><strong>12K+</strong><span>Verified students</span></div>
            <div className="stat-card card"><strong>4.9/5</strong><span>Average rating</span></div>
            <div className="stat-card card"><strong>7.5K</strong><span>Successful swaps</span></div>
            <div className="stat-card card"><strong>92%</strong><span>Repeat users</span></div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container cta-panel card">
          <div>
            <p className="eyebrow">Ready to get started?</p>
            <h2>Borrow smarter. Share more.</h2>
          </div>
          <div className="cta-row">
            <Link to="/browse" className="btn btn-primary">Find an Item</Link>
            <Link to="/post-item" className="btn btn-secondary">Share an Item</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'info' }) {
  const className = variant === 'info' ? 'badge badge-verified' : 'badge';
  return <span className={className}>{children}</span>;
}
