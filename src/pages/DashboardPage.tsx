import { useEffect, useState } from 'react';
import { getCurrentUser, getItems, getRequestsByUser } from '../utils/storage';
import { formatDate } from '../utils/helpers';

export default function DashboardPage() {
  const [requests, setRequests] = useState(() => getRequestsByUser(getCurrentUser()?.id ?? ''));
  const [items, setItems] = useState(() => getItems().filter(item => item.ownerId === getCurrentUser()?.id));

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return;
    setRequests(getRequestsByUser(user.id, 'requester'));
    setItems(getItems().filter(item => item.ownerId === user.id));
  }, []);

  const activeRequests = requests.filter(r => ['pending', 'accepted', 'active'].includes(r.status)).length;
  const completed = requests.filter(r => r.status === 'completed').length;
  const listed = items.length;

  return (
    <div className="container page-section">
      <div className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Your dashboard</h1>
        </div>
      </div>

      <div className="stats-grid dashboard-cards">
        <div className="stat-card card"><strong>{activeRequests}</strong><span>Active Requests</span></div>
        <div className="stat-card card"><strong>{requests.filter(r => r.status === 'active').length}</strong><span>Items Borrowed</span></div>
        <div className="stat-card card"><strong>{listed}</strong><span>Items Listed</span></div>
        <div className="stat-card card"><strong>{completed}</strong><span>Completed Transactions</span></div>
      </div>

      <div className="dashboard-layout">
        <div className="card section-panel">
          <h3>My Requests</h3>
          <div className="list-table">
            {requests.length === 0 ? <p className="text-muted">No requests yet.</p> : requests.map(request => (
              <div key={request.id} className="row-card">
                <div>
                  <strong>{getItems().find(item => item.id === request.itemId)?.title || 'Item'}</strong>
                  <p>{request.type} • {formatDate(request.startDate)} to {formatDate(request.endDate)}</p>
                </div>
                <span className={`status-tag ${request.status}`}>{request.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card section-panel">
          <h3>My Items</h3>
          <div className="list-table">
            {items.length === 0 ? <p className="text-muted">You haven’t posted any items yet.</p> : items.map(item => (
              <div key={item.id} className="row-card">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.location}</p>
                </div>
                <span className={`status-tag ${item.available ? 'available' : 'unavailable'}`}>{item.available ? 'Available' : 'Unavailable'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
