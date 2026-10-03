import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <div className="page-wrapper">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <Link to="/" className="brand" aria-label="CampusShare home">
          <span className="brand-mark">C</span>
          CampusShare
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/browse" className="nav-link">Browse</Link>
          <Link to="/my-requests" className="nav-link">My Requests</Link>
          <Link to="/messages" className="nav-link">Messages</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>
        <div className="nav-actions">
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <Link to="/post-item" className="btn btn-primary share-btn">+ Share an Item</Link>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="brand brand-footer">
            <span className="brand-mark">C</span>
            CampusShare
          </div>
          <p className="text-muted mt-1">Borrow what you need. Share what you have.</p>
        </div>
        <div className="footer-links">
          <Link to="/browse">Browse</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/messages">Messages</Link>
        </div>
      </div>
    </footer>
  );
}
