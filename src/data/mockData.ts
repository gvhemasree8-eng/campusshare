import { User, Item, Request, Review, Message, Conversation, Notification } from '../types';

const now = new Date();
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@college.edu',
    avatar: '👨‍🎓',
    college: 'State University',
    verified: true,
    rating: 4.8,
    reviewCount: 12,
    completedTransactions: 8,
    createdAt: '2024-01-15'
  },
  {
    id: 'user-2',
    name: 'Sarah Chen',
    email: 'sarah@college.edu',
    avatar: '👩‍🎓',
    college: 'State University',
    verified: true,
    rating: 4.9,
    reviewCount: 15,
    completedTransactions: 10,
    createdAt: '2024-01-10'
  },
  {
    id: 'user-3',
    name: 'Marcus Williams',
    email: 'marcus@college.edu',
    avatar: '👨‍🎓',
    college: 'State University',
    verified: true,
    rating: 4.6,
    reviewCount: 8,
    completedTransactions: 6,
    createdAt: '2024-02-01'
  },
  {
    id: 'user-4',
    name: 'Emma Davis',
    email: 'emma@college.edu',
    avatar: '👩‍🎓',
    college: 'State University',
    verified: false,
    rating: 4.7,
    reviewCount: 6,
    completedTransactions: 4,
    createdAt: '2024-02-15'
  },
  {
    id: 'user-5',
    name: 'James Rodriguez',
    email: 'james@college.edu',
    avatar: '👨‍🎓',
    college: 'State University',
    verified: true,
    rating: 4.5,
    reviewCount: 10,
    completedTransactions: 7,
    createdAt: '2024-01-20'
  },
  {
    id: 'current-user',
    name: 'You',
    email: 'you@college.edu',
    avatar: '👤',
    college: 'State University',
    verified: true,
    rating: 4.9,
    reviewCount: 11,
    completedTransactions: 9,
    createdAt: '2024-01-05'
  }
];

export const mockItems: Item[] = [
  {
    id: 'item-1',
    title: 'Scientific Calculator',
    description: 'High-end scientific calculator, perfect for engineering and math courses. Includes graphing capabilities and programmable functions.',
    category: 'Electronics',
    condition: 'like-new',
    images: ['📐', '🧮'],
    ownerId: 'user-1',
    location: 'Campus Library',
    available: true,
    borrowAvailable: true,
    rentAvailable: true,
    rentalPrice: 5,
    deposit: 50,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01'
  },
  {
    id: 'item-2',
    title: 'Drafting Board',
    description: 'Professional-grade drafting table with adjustable angles. Ideal for architecture, engineering, and design students. Includes drafting tools.',
    category: 'Art & Design',
    condition: 'excellent',
    images: ['📐', '🎨'],
    ownerId: 'user-2',
    location: 'Engineering Building',
    available: true,
    borrowAvailable: true,
    rentAvailable: true,
    rentalPrice: 15,
    deposit: 100,
    createdAt: '2024-03-02',
    updatedAt: '2024-03-02'
  },
  {
    id: 'item-3',
    title: 'Mountain Bike',
    description: 'Trek mountain bike in excellent condition. Lightweight aluminum frame, 21-speed gears. Perfect for weekend adventures around campus.',
    category: 'Sports & Outdoor',
    condition: 'excellent',
    images: ['🚴', '🏔️'],
    ownerId: 'user-3',
    location: 'Sports Complex',
    available: true,
    borrowAvailable: true,
    rentAvailable: true,
    rentalPrice: 10,
    deposit: 150,
    createdAt: '2024-03-03',
    updatedAt: '2024-03-03'
  },
  {
    id: 'item-4',
    title: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand. Reduces neck strain and improves ergonomics. Compatible with all laptops up to 17 inches.',
    category: 'Electronics',
    condition: 'like-new',
    images: ['💻', '📱'],
    ownerId: 'user-4',
    location: 'Library - 3rd Floor',
    available: true,
    borrowAvailable: true,
    rentAvailable: false,
    rentalPrice: undefined,
    deposit: 30,
    createdAt: '2024-03-04',
    updatedAt: '2024-03-04'
  },
  {
    id: 'item-5',
    title: 'Projector',
    description: 'High-lumen projector perfect for presentations and movie nights. 1080p resolution, 3000 lumens brightness. Includes HDMI and wireless connectivity.',
    category: 'Electronics',
    condition: 'good',
    images: ['📽️', '💡'],
    ownerId: 'user-5',
    location: 'Dormitory - Building C',
    available: true,
    borrowAvailable: false,
    rentAvailable: true,
    rentalPrice: 20,
    deposit: 200,
    createdAt: '2024-03-05',
    updatedAt: '2024-03-05'
  },
  {
    id: 'item-6',
    title: 'Engineering Textbook - Mechanics',
    description: 'Essential Mechanics textbook for engineering students. Brand new condition. Includes access code for online solutions.',
    category: 'Books & Textbooks',
    condition: 'like-new',
    images: ['📚', '🔧'],
    ownerId: 'user-1',
    location: 'Campus Bookstore',
    available: true,
    borrowAvailable: true,
    rentAvailable: true,
    rentalPrice: 8,
    deposit: 40,
    createdAt: '2024-03-06',
    updatedAt: '2024-03-06'
  },
  {
    id: 'item-7',
    title: 'Lab Coat & Safety Goggles',
    description: 'Complete lab safety kit including white lab coat, safety goggles, and gloves. Perfect for chemistry and biology labs.',
    category: 'School Supplies',
    condition: 'excellent',
    images: ['🥽', '🧪'],
    ownerId: 'user-2',
    location: 'Science Building',
    available: true,
    borrowAvailable: true,
    rentAvailable: true,
    rentalPrice: 4,
    deposit: 25,
    createdAt: '2024-03-07',
    updatedAt: '2024-03-07'
  },
  {
    id: 'item-8',
    title: 'DSLR Camera',
    description: 'Canon EOS 5D Mark IV with two lenses. Excellent for photography projects and documentaries. Includes tripod and camera bag.',
    category: 'Electronics',
    condition: 'excellent',
    images: ['📸', '📷'],
    ownerId: 'user-3',
    location: 'Media Building',
    available: true,
    borrowAvailable: false,
    rentAvailable: true,
    rentalPrice: 30,
    deposit: 300,
    createdAt: '2024-03-08',
    updatedAt: '2024-03-08'
  },
  {
    id: 'item-9',
    title: 'Skateboard',
    description: 'Well-maintained street skateboard with quality bearings and trucks. Great for commuting around campus.',
    category: 'Sports & Outdoor',
    condition: 'good',
    images: ['🛹', '🎯'],
    ownerId: 'user-4',
    location: 'Dormitory - Building A',
    available: true,
    borrowAvailable: true,
    rentAvailable: false,
    rentalPrice: undefined,
    deposit: 60,
    createdAt: '2024-03-09',
    updatedAt: '2024-03-09'
  },
  {
    id: 'item-10',
    title: 'Graphing Calculator',
    description: 'TI-84 Plus CE with full color display. Essential for calculus and engineering courses. Recently updated software.',
    category: 'Electronics',
    condition: 'like-new',
    images: ['🧮', '📊'],
    ownerId: 'user-5',
    location: 'Math Building',
    available: true,
    borrowAvailable: true,
    rentAvailable: true,
    rentalPrice: 6,
    deposit: 45,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10'
  },
  {
    id: 'item-11',
    title: 'Microphone & Stand',
    description: 'Professional USB condenser microphone with adjustable stand. Perfect for podcasts, voiceovers, and recordings.',
    category: 'Electronics',
    condition: 'excellent',
    images: ['🎤', '🎙️'],
    ownerId: 'user-1',
    location: 'Media Lab',
    available: true,
    borrowAvailable: false,
    rentAvailable: true,
    rentalPrice: 12,
    deposit: 80,
    createdAt: '2024-03-11',
    updatedAt: '2024-03-11'
  },
  {
    id: 'item-12',
    title: 'Yoga Mat & Blocks',
    description: 'Non-slip yoga mat with foam blocks and carrying strap. Great for fitness and wellness classes.',
    category: 'Sports & Outdoor',
    condition: 'like-new',
    images: ['🧘', '💪'],
    ownerId: 'user-2',
    location: 'Fitness Center',
    available: true,
    borrowAvailable: true,
    rentAvailable: false,
    rentalPrice: undefined,
    deposit: 20,
    createdAt: '2024-03-12',
    updatedAt: '2024-03-12'
  },
  {
    id: 'item-13',
    title: 'Portable Speaker',
    description: 'Waterproof Bluetooth speaker with excellent sound quality. Battery lasts up to 12 hours. Perfect for parties and outdoor events.',
    category: 'Electronics',
    condition: 'excellent',
    images: ['🔊', '🎵'],
    ownerId: 'user-3',
    location: 'Dormitory - Building B',
    available: true,
    borrowAvailable: true,
    rentAvailable: true,
    rentalPrice: 8,
    deposit: 60,
    createdAt: '2024-03-13',
    updatedAt: '2024-03-13'
  },
  {
    id: 'item-14',
    title: 'Tool Kit',
    description: 'Complete toolkit with 50+ tools including hammers, screwdrivers, wrenches, and pliers. Comes in organized carrying case.',
    category: 'Tools & Equipment',
    condition: 'excellent',
    images: ['🔨', '🔧'],
    ownerId: 'user-4',
    location: 'Campus Workshop',
    available: true,
    borrowAvailable: true,
    rentAvailable: true,
    rentalPrice: 10,
    deposit: 100,
    createdAt: '2024-03-14',
    updatedAt: '2024-03-14'
  },
  {
    id: 'item-15',
    title: 'Reference Books Bundle',
    description: 'Set of 5 programming reference books covering Python, JavaScript, Java, C++, and Data Structures. Excellent condition.',
    category: 'Books & Textbooks',
    condition: 'good',
    images: ['📖', '💻'],
    ownerId: 'user-5',
    location: 'Computer Science Building',
    available: true,
    borrowAvailable: true,
    rentAvailable: false,
    rentalPrice: undefined,
    deposit: 35,
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15'
  }
];

export const mockRequests: Request[] = [
  {
    id: 'request-1',
    itemId: 'item-1',
    requesterId: 'current-user',
    ownerId: 'user-1',
    type: 'borrow',
    startDate: tomorrow.toISOString().split('T')[0],
    endDate: nextWeek.toISOString().split('T')[0],
    message: 'Hi! I need the calculator for my upcoming exams. Will return it in perfect condition.',
    status: 'pending',
    createdAt: now.toISOString()
  },
  {
    id: 'request-2',
    itemId: 'item-3',
    requesterId: 'current-user',
    ownerId: 'user-3',
    type: 'borrow',
    startDate: tomorrow.toISOString().split('T')[0],
    endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    message: 'Would love to borrow the bike for a weekend trip!',
    status: 'accepted',
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'request-3',
    itemId: 'item-2',
    requesterId: 'user-5',
    ownerId: 'user-2',
    type: 'rent',
    startDate: tomorrow.toISOString().split('T')[0],
    endDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    message: 'Need this for my architecture project presentation next week.',
    status: 'accepted',
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    fromUserId: 'user-1',
    toUserId: 'current-user',
    requestId: 'request-1',
    rating: 5,
    text: 'Great borrower! Returned the calculator in perfect condition and communicated well.',
    createdAt: '2024-02-20'
  },
  {
    id: 'review-2',
    fromUserId: 'current-user',
    toUserId: 'user-1',
    requestId: 'request-1',
    rating: 5,
    text: 'Amazing lending experience. Alex is trustworthy and responsive.',
    createdAt: '2024-02-20'
  },
  {
    id: 'review-3',
    fromUserId: 'user-3',
    toUserId: 'current-user',
    requestId: 'request-2',
    rating: 5,
    text: 'Excellent borrower. Took great care of my bike.',
    createdAt: '2024-02-18'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant1Id: 'current-user',
    participant2Id: 'user-1',
    lastMessage: 'Thanks for lending me the calculator!',
    lastMessageTime: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
    createdAt: '2024-02-15'
  },
  {
    id: 'conv-2',
    participant1Id: 'current-user',
    participant2Id: 'user-3',
    lastMessage: 'I\'ll pick up the bike tomorrow morning',
    lastMessageTime: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    createdAt: '2024-02-10'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'current-user',
    receiverId: 'user-1',
    text: 'Hi Alex, can I borrow the scientific calculator for my exam prep?',
    createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'user-1',
    receiverId: 'current-user',
    text: 'Of course! When do you need it?',
    createdAt: new Date(now.getTime() - 2.5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'current-user',
    receiverId: 'user-1',
    text: 'Thanks for lending me the calculator!',
    createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString()
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'current-user',
    type: 'request',
    title: 'New borrow request',
    message: 'Someone requested to borrow your drafting board',
    relatedId: 'request-3',
    read: false,
    createdAt: now.toISOString()
  },
  {
    id: 'notif-2',
    userId: 'current-user',
    type: 'message',
    title: 'New message',
    message: 'Marcus sent you a message',
    relatedId: 'conv-2',
    read: false,
    createdAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-3',
    userId: 'current-user',
    type: 'accepted',
    title: 'Request accepted',
    message: 'Alex accepted your borrow request for the calculator',
    relatedId: 'request-1',
    read: true,
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-4',
    userId: 'current-user',
    type: 'reminder',
    title: 'Return reminder',
    message: 'Your borrowed bike is due back tomorrow',
    relatedId: 'request-2',
    read: true,
    createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString()
  }
];
