import { User, Item, Request, Review, Message, Conversation, Notification } from '../types';
import {
  mockUsers,
  mockItems,
  mockRequests,
  mockReviews,
  mockMessages,
  mockConversations,
  mockNotifications
} from '../data/mockData';

const STORAGE_KEYS = {
  USERS: 'cs_users',
  ITEMS: 'cs_items',
  REQUESTS: 'cs_requests',
  REVIEWS: 'cs_reviews',
  MESSAGES: 'cs_messages',
  CONVERSATIONS: 'cs_conversations',
  NOTIFICATIONS: 'cs_notifications',
  CURRENT_USER: 'cs_current_user'
};

// Initialize storage with mock data if empty
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(mockItems));
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(mockRequests));
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(mockReviews));
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(mockMessages));
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(mockConversations));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(mockNotifications));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(mockUsers[5]));
  }
}

// Users
export function getUsers(): User[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
}

export function getUserById(id: string): User | undefined {
  return getUsers().find(u => u.id === id);
}

export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return users[index];
  }
  return undefined;
}

export function getCurrentUser(): User | null {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

// Items
export function getItems(): Item[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.ITEMS);
  return data ? JSON.parse(data) : [];
}

export function getItemById(id: string): Item | undefined {
  return getItems().find(i => i.id === id);
}

export function createItem(item: Item): Item {
  const items = getItems();
  items.push(item);
  localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
  return item;
}

export function updateItem(id: string, updates: Partial<Item>): Item | undefined {
  const items = getItems();
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
    return items[index];
  }
  return undefined;
}

export function deleteItem(id: string): boolean {
  const items = getItems();
  const filtered = items.filter(i => i.id !== id);
  if (filtered.length < items.length) {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(filtered));
    return true;
  }
  return false;
}

// Requests
export function getRequests(): Request[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
  return data ? JSON.parse(data) : [];
}

export function getRequestById(id: string): Request | undefined {
  return getRequests().find(r => r.id === id);
}

export function getRequestsByUser(userId: string, type: 'requester' | 'owner' = 'requester'): Request[] {
  const requests = getRequests();
  return type === 'requester'
    ? requests.filter(r => r.requesterId === userId)
    : requests.filter(r => r.ownerId === userId);
}

export function createRequest(request: Request): Request {
  const requests = getRequests();
  requests.push(request);
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  return request;
}

export function updateRequest(id: string, updates: Partial<Request>): Request | undefined {
  const requests = getRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    return requests[index];
  }
  return undefined;
}

// Reviews
export function getReviews(): Review[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
  return data ? JSON.parse(data) : [];
}

export function getReviewsByUser(userId: string): Review[] {
  return getReviews().filter(r => r.toUserId === userId);
}

export function createReview(review: Review): Review {
  const reviews = getReviews();
  reviews.push(review);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  return review;
}

// Messages
export function getMessages(): Message[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return data ? JSON.parse(data) : [];
}

export function getMessagesByConversation(conversationId: string): Message[] {
  return getMessages().filter(m => m.conversationId === conversationId);
}

export function createMessage(message: Message): Message {
  const messages = getMessages();
  messages.push(message);
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  return message;
}

// Conversations
export function getConversations(): Conversation[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
  return data ? JSON.parse(data) : [];
}

export function getConversationById(id: string): Conversation | undefined {
  return getConversations().find(c => c.id === id);
}

export function getConversationsByUser(userId: string): Conversation[] {
  return getConversations().filter(
    c => c.participant1Id === userId || c.participant2Id === userId
  );
}

export function getOrCreateConversation(user1Id: string, user2Id: string): Conversation {
  const conversations = getConversations();
  let conversation = conversations.find(
    c =>
      (c.participant1Id === user1Id && c.participant2Id === user2Id) ||
      (c.participant1Id === user2Id && c.participant2Id === user1Id)
  );

  if (!conversation) {
    conversation = {
      id: `conv-${Date.now()}`,
      participant1Id: user1Id,
      participant2Id: user2Id,
      createdAt: new Date().toISOString()
    };
    conversations.push(conversation);
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  }

  return conversation;
}

export function updateConversation(id: string, updates: Partial<Conversation>): Conversation | undefined {
  const conversations = getConversations();
  const index = conversations.findIndex(c => c.id === id);
  if (index !== -1) {
    conversations[index] = { ...conversations[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    return conversations[index];
  }
  return undefined;
}

// Notifications
export function getNotifications(): Notification[] {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  return data ? JSON.parse(data) : [];
}

export function getNotificationsByUser(userId: string): Notification[] {
  return getNotifications().filter(n => n.userId === userId);
}

export function getUnreadNotifications(userId: string): Notification[] {
  return getNotificationsByUser(userId).filter(n => !n.read);
}

export function createNotification(notification: Notification): Notification {
  const notifications = getNotifications();
  notifications.push(notification);
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  return notification;
}

export function markNotificationAsRead(id: string): Notification | undefined {
  const notifications = getNotifications();
  const index = notifications.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications[index].read = true;
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    return notifications[index];
  }
  return undefined;
}
