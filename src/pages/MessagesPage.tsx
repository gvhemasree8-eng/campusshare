import { useEffect, useState } from 'react';
import { getCurrentUser, getConversationsByUser, getMessagesByConversation, getOrCreateConversation, createMessage } from '../utils/storage';

export default function MessagesPage() {
  const [user, setUser] = useState(getCurrentUser());
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversationId, setActiveConversationId] = useState('');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const convs = getConversationsByUser(user.id);
    setConversations(convs);
    if (convs[0]) {
      setActiveConversationId(convs[0].id);
      setMessages(getMessagesByConversation(convs[0].id));
    }
  }, [user]);

  const sendMessage = () => {
    if (!user || !activeConversationId || !draft.trim()) return;
    const conversation = conversations.find(c => c.id === activeConversationId);
    if (!conversation) return;
    const recipientId = conversation.participant1Id === user.id ? conversation.participant2Id : conversation.participant1Id;
    const message = createMessage({
      id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      senderId: user.id,
      receiverId: recipientId,
      text: draft.trim(),
      createdAt: new Date().toISOString()
    });
    setMessages(prev => [...prev, message]);
    setDraft('');
  };

  return (
    <div className="container page-section">
      <div className="page-header">
        <div>
          <p className="eyebrow">Messages</p>
          <h1>Stay connected with campus peers</h1>
        </div>
      </div>

      <div className="chat-layout card">
        <aside className="conversation-list">
          {conversations.map(conv => (
            <button key={conv.id} className={`conversation-item ${activeConversationId === conv.id ? 'active' : ''}`} onClick={() => { setActiveConversationId(conv.id); setMessages(getMessagesByConversation(conv.id)); }}>
              <span className="avatar-ring">👤</span>
              <div>
                <strong>{conv.participant2Id}</strong>
                <p>{conv.lastMessage || 'Start a conversation'}</p>
              </div>
            </button>
          ))}
        </aside>

        <div className="chat-panel">
          <div className="chat-header">
            <strong>Conversation</strong>
          </div>
          <div className="messages-pane">
            {messages.map(msg => (
              <div key={msg.id} className={`message-row ${msg.senderId === user?.id ? 'outgoing' : 'incoming'}`}>
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="composer">
            <input className="input" value={draft} onChange={e => setDraft(e.target.value)} placeholder="Type a message" />
            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
