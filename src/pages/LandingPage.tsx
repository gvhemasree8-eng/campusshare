import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { SearchBar } from '../components/layout/Navbar';
import { getItems } from '../utils/storage';
import { CATEGORIES } from '../utils/helpers';

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
          <div className="how-it-works-grid">
            <div className="step-card card">
              <div className="step-badge">1</div>
              <h3>Search & Find</h3>
              <p>Browse thousands of items shared by your campus peers.</p>
            </div>
            <div className="step-card card">
              <div className="step-badge">2</div>
              <h3>Request & Chat</h3>
              <p>Message the owner to confirm availability and details.</p>
            </div>
            <div className="step-card card">
              <div className="step-badge">3</div>
              <h3>Borrow or Rent</h3>
              <p>Set dates and payment terms that work for both of you.</p>
            </div>
            <div className="step-card card">
              <div className="step-badge">4</div>
              <h3>Return & Review</h3>
              <p>Return the item and leave a review to build community trust.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Featured items</p>
              <h2>What's trending right now</h2>
            </div>
            <Link to="/browse" className="see-all">See all →</Link>
          </div>
          <div className="item-grid">
            {items.map(item => (
              <article key={item.id} className="item-card card">
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
            ))}
          </div>
        </div>
      </section>

      <section className="page-section soft-bg">
        <div className="container">
          <div className="section-head align-center">
            <p className="eyebrow">Why students trust CampusShare</p>
            <h2>Built for campus communities</h2>
          </div>
          <div className="trust-grid">
            <div className="trust-card card">
              <ShieldCheck className="trust-icon" size={32} />
              <h3>Verified students</h3>
              <p>All users are verified members of campus communities.</p>
            </div>
            <div className="trust-card card">
              <Star className="trust-icon" size={32} />
              <h3>Community reviews</h3>
              <p>Real feedback from real transactions builds trust.</p>
            </div>
            <div className="trust-card card">
              <ShieldCheck className="trust-icon" size={32} />
              <h3>Protected payments</h3>
              <p>Secure transactions with dispute resolution support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container cta-container">
          <div className="cta-content">
            <h2>Ready to start sharing?</h2>
            <p>Join your campus community and get connected.</p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn-primary">Create Account</Link>
              <Link to="/browse" className="btn btn-secondary">Browse Items</Link>
            </div>
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
