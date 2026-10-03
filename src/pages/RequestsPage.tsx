import { useEffect, useState } from 'react';
import { getCurrentUser, getRequestsByUser, updateRequest, getItems } from '../utils/storage';
import { formatDate } from '../utils/helpers';

export default function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return;
    setRequests([
      ...getRequestsByUser(user.id, 'requester'),
      ...getRequestsByUser(user.id, 'owner')
    ]);
  }, []);

  const handleAction = (id: string, status: 'accepted' | 'rejected') => {
    updateRequest(id, { status });
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="container page-section">
      <div className="page-header">
        <div>
          <p className="eyebrow">My Requests</p>
          <h1>Track and manage requests</h1>
        </div>
      </div>

      <div className="card section-panel">
        <div className="list-table">
          {requests.length === 0 ? <p className="text-muted">No requests to show.</p> : requests.map(request => {
            const item = getItems().find(item => item.id === request.itemId);
            return (
              <div key={request.id} className="row-card request-row">
                <div>
                  <strong>{item?.title || 'Item'}</strong>
                  <p>{request.type} • {formatDate(request.startDate)} to {formatDate(request.endDate)}</p>
                </div>
                <span className={`status-tag ${request.status}`}>{request.status}</span>
                {request.ownerId === getCurrentUser()?.id && request.status === 'pending' && (
                  <div className="inline-actions">
                    <button className="btn btn-success" onClick={() => handleAction(request.id, 'accepted')}>Accept</button>
                    <button className="btn btn-secondary" onClick={() => handleAction(request.id, 'rejected')}>Reject</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
