export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  completedTransactions: number;
  createdAt: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: 'like-new' | 'excellent' | 'good' | 'fair';
  images: string[];
  ownerId: string;
  location: string;
  available: boolean;
  borrowAvailable: boolean;
  rentAvailable: boolean;
  rentalPrice?: number;
  deposit?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Request {
  id: string;
  itemId: string;
  requesterId: string;
  ownerId: string;
  type: 'borrow' | 'rent';
  startDate: string;
  endDate: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  requestId: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participant1Id: string;
  participant2Id: string;
  lastMessage?: string;
  lastMessageTime?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'request' | 'accepted' | 'rejected' | 'message' | 'reminder' | 'review';
  title: string;
  message: string;
  relatedId?: string;
  read: boolean;
  createdAt: string;
}
