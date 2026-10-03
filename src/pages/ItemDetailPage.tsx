import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Item } from '../types';
import { getItemById, getUserById, getCurrentUser, getRequests, createRequest } from '../utils/storage';
import { calculateEstimatedCost, formatDate, generateId, validateDateRange } from '../utils/helpers';
import { Badge } from '../components/layout/Navbar';

export default function ItemDetailPage() {
  const { id } = useParams();
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestType, setRequestType] = useState<'borrow' | 'rent'>('borrow');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState('');

  const item = id ? getItemById(id) : undefined;
  const owner = item ? getUserById(item.ownerId) : undefined;
  const currentUser = getCurrentUser();

  const estimate = useMemo(() => {
    if (!item || !startDate || !endDate) return { rental: 0, deposit: item?.deposit ?? 0, total: item?.deposit ?? 0 };
    return calculateEstimatedCost(item, startDate, endDate, requestType);
  }, [item, startDate, endDate, requestType]);

  if (!item) {
    return <div className="container page-section"><div className="empty-state card"><h3>Item not found</h3><p>This item may have been removed or is unavailable.</p></div></div>;
  }

  const isOwner = currentUser?.id === item.ownerId;
  const canRequest = !isOwner && item.available;

  const handleSubmit = () => {
    if (!currentUser) {
      setToast('Please log in to request this item.');
      return;
    }
    if (isOwner) {
      setToast('You cannot request your own item.');
      return;
    }
    if (!item.available) {
      setToast('This item is currently unavailable.');
      return;
    }
    const dateValidation = validateDateRange(startDate, endDate);
    if (!dateValidation.valid) {
      setToast(dateValidation.error ?? 'Please choose valid dates.');
      return;
    }
    const existing = getRequests().find(req => req.itemId === item.id && req.status === 'accepted' || req.status === 'active');
    if (existing) {
      setToast('You already have an active request for this item.');
      return;
    }
    createRequest({
      id: generateId(),
      itemId: item.id,
      requesterId: currentUser.id,
      ownerId: item.ownerId,
      type: requestType,
      startDate,
      endDate,
      message: purpose + (message ? `\n${message}` : ''),
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    setToast('Request sent successfully.');
    setRequestOpen(false);
  };

  return (
    <div className="container page-section">
      <div className="detail-layout">
        <div className="detail-gallery card">
          <div className="detail-image">{item.images[0] || '📦'}</div>
          <div className="thumbnail-row">
            {item.images.map((img, idx) => <div key={idx} className="thumb">{img}</div>)}
          </div>
        </div>

        <div className="detail-content">
          <div className="title-row">
            <div>
              <p className="eyebrow">{item.category}</p>
              <h1>{item.title}</h1>
            </div>
            <Badge variant={item.available ? 'success' : 'warning'}>{item.available ? 'Available' : 'Unavailable'}</Badge>
          </div>

          <div className="meta-row">
            <span>Condition: {item.condition}</span>
            <span>Location: {item.location}</span>
          </div>

          <p className="detail-description">{item.description}</p>

          <div className="price-stack">
            <div className="price-box card">
              <span>Rental price</span>
              <strong>${item.rentalPrice ?? 0}</strong>
              <small>per day</small>
            </div>
            <div className="price-box card">
              <span>Deposit</span>
              <strong>${item.deposit ?? 0}</strong>
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn btn-primary" disabled={!canRequest} onClick={() => setRequestOpen(true)}>
              {canRequest ? 'Request to Borrow' : 'Unavailable'}
            </button>
            <button className="btn btn-secondary">Contact Owner</button>
          </div>

          <div className="owner-panel card">
            <div className="owner-inline">
              <div className="avatar-ring large">{owner?.avatar || '👤'}</div>
              <div>
                <strong>{owner?.name || 'Owner'}</strong>
                <div className="rating-row"><span>⭐ {owner?.rating || 4.8}</span><span className="text-muted">{owner?.completedTransactions || 8} transactions</span></div>
                <div><Badge variant="info">Verified student</Badge></div>
              </div>
            </div>
          </div>

          <div className="safety-box card">
            <h3>Safety & trust</h3>
            <ul>
              <li>Meet in a public place on campus</li>
              <li>Verify the item before accepting it</li>
              <li>Don’t share sensitive information</li>
            </ul>
          </div>
        </div>
      </div>

      {requestOpen && (
        <div className="modal-backdrop" onClick={() => setRequestOpen(false)}>
          <div className="modal-card wide" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>Request {item.title}</h3><button className="icon-button" onClick={() => setRequestOpen(false)}>×</button></div>
            <div className="request-form-grid">
              <div className="form-group">
                <label className="label">Start date</label>
                <input className="input" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="label">End date</label>
                <input className="input" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
              <div className="form-group full">
                <label className="label">Purpose</label>
                <input className="input" value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="Course project, exam prep, weekend trip..." />
              </div>
              <div className="form-group full">
                <label className="label">Borrow or rent</label>
                <select className="select" value={requestType} onChange={e => setRequestType(e.target.value as 'borrow' | 'rent')}>
                  <option value="borrow">Borrow</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div className="form-group full">
                <label className="label">Optional message</label>
                <textarea className="textarea" value={message} onChange={e => setMessage(e.target.value)} rows={4} />
              </div>
            </div>

            {startDate && endDate && (
              <div className="cost-summary card">
                <div><span>Owner</span><strong>{owner?.name}</strong></div>
                <div><span>Duration</span><strong>{Math.max(1, (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000)} days</strong></div>
                <div><span>Estimated cost</span><strong>${estimate.rental}</strong></div>
                <div><span>Deposit</span><strong>${estimate.deposit}</strong></div>
                <div><span>Total</span><strong>${estimate.total}</strong></div>
              </div>
            )}

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setRequestOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Send Request</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
