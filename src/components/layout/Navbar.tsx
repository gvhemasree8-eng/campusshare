import { ArrowRight, Bell, ChevronDown, Menu, Search, Plus, User, MessageSquare, Home, LayoutGrid, ShieldCheck, Star } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const navLinks = [
  { label: 'Browse', to: '/browse' },
  { label: 'My Requests', to: '/my-requests' },
  { label: 'Messages', to: '/messages' },
  { label: 'Dashboard', to: '/dashboard' }
];

export default function Navbar() {
  const { currentUser, isAuthenticated } = useAuthContext();

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link to="/" className="brand" aria-label="CampusShare home">
          <span className="brand-mark">C</span>
          CampusShare
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <button className="icon-button" aria-label="Notifications">
                <Bell size={18} />
                <span className="notification-dot" />
              </button>
              <div className="profile-pill">
                <span className="profile-avatar">{currentUser?.avatar || '👤'}</span>
                <span>{currentUser?.name || 'You'}</span>
                <ChevronDown size={14} />
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-secondary">Login</Link>
          )}

          <Link to="/post-item" className="btn btn-primary share-btn">
            <Plus size={18} />
            Share an Item
          </Link>
        </div>

        <button className="mobile-menu" aria-label="Open navigation menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

export function Footer() {
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

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search items, category, or location',
  compact = false
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  compact?: boolean;
}) {
  return (
    <div className={`searchbar ${compact ? 'compact' : ''}`}>
      <Search size={18} />
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search items"
      />
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="empty-state card">
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return <div className="loading-state">{label}</div>;
}

export function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' }) {
  const classes = {
    default: 'badge',
    success: 'badge badge-success',
    warning: 'badge badge-warning',
    danger: 'badge badge-danger',
    info: 'badge badge-verified'
  };
  return <span className={classes[variant]}>{children}</span>;
}

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="rating-row" aria-label={`Rated ${rating} out of 5`}>
      {[1,2,3,4,5].map(star => (
        <Star
          key={star}
          size={14}
          fill={star <= Math.round(rating) ? '#fbbf24' : 'transparent'}
          color={star <= Math.round(rating) ? '#fbbf24' : '#cbd5e1'}
        />
      ))}
      <span className="text-muted">{rating.toFixed(1)}</span>
    </div>
  );
}

export function UserAvatar({ user }: { user?: { name: string; avatar?: string; verified?: boolean } | null }) {
  return (
    <div className="avatar-wrap">
      <span className="avatar-ring">{user?.avatar || '👤'}</span>
      {user?.verified && <ShieldCheck size={14} className="verified-icon" />}
    </div>
  );
}

export function Button({ children, variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'success' | 'ghost' }) {
  return (
    <button className={`btn btn-${variant}`} {...props}>{children}</button>
  );
}

export function Modal({
  open,
  title,
  onClose,
  children
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="icon-button" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible || !message) return null;

  return <div className="toast">{message}</div>;
}

export function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="form-group">
      <label className="label">{label}</label>
      <input className="input" {...props} />
    </div>
  );
}

export function Select({ label, options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: { value: string; label: string }[] }) {
  return (
    <div className="form-group">
      <label className="label">{label}</label>
      <select className="select" {...props}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export function TextArea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="form-group">
      <label className="label">{label}</label>
      <textarea className="textarea" rows={4} {...props} />
    </div>
  );
}

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return <div className="app-shell">{children}</div>;
}

export { ArrowRight, Bell, ChevronDown, Menu, Search, Plus, User, MessageSquare, Home, LayoutGrid };

