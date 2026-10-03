import { Item, User, Review } from '../types';
import { getReviewsByUser } from './storage';

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatDateLong(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return formatDate(dateString);
}

export function getConditionColor(condition: string): string {
  switch (condition) {
    case 'like-new':
      return 'bg-green-100 text-green-800';
    case 'excellent':
      return 'bg-blue-100 text-blue-800';
    case 'good':
      return 'bg-yellow-100 text-yellow-800';
    case 'fair':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Electronics': '💻',
    'Art & Design': '🎨',
    'Sports & Outdoor': '⛹️',
    'Books & Textbooks': '📚',
    'School Supplies': '✏️',
    'Tools & Equipment': '🔧',
    'Clothing & Accessories': '👕'
  };
  return icons[category] || '📦';
}

export function calculateDuration(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function calculateEstimatedCost(item: Item, startDate: string, endDate: string, type: 'borrow' | 'rent'): { rental: number; deposit: number; total: number } {
  const days = calculateDuration(startDate, endDate);
  const rentalCost = type === 'rent' && item.rentalPrice ? item.rentalPrice * days : 0;
  const depositCost = item.deposit || 0;
  return {
    rental: rentalCost,
    deposit: depositCost,
    total: rentalCost + depositCost
  };
}

export function getUserRating(user: User): number {
  return user.rating || 0;
}

export function getTrustScore(user: User): number {
  let score = 50; // Base score
  
  // Verified bonus
  if (user.verified) score += 20;
  
  // Rating bonus (0-20)
  if (user.rating >= 4.5) score += 15;
  else if (user.rating >= 4.0) score += 10;
  else if (user.rating >= 3.5) score += 5;
  
  // Completed transactions bonus (0-15)
  const txBonus = Math.min(15, Math.floor(user.completedTransactions / 2));
  score += txBonus;
  
  return Math.min(100, score);
}

export function getTrustBadge(score: number): string {
  if (score >= 85) return '⭐';
  if (score >= 70) return '✓';
  return '';
}

export function validateDateRange(startDate: string, endDate: string): { valid: boolean; error?: string } {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (start < now) {
    return { valid: false, error: 'Start date cannot be in the past' };
  }

  if (end <= start) {
    return { valid: false, error: 'End date must be after start date' };
  }

  return { valid: true };
}

export function filterItems(
  items: Item[],
  filters: {
    search?: string;
    category?: string;
    type?: 'borrow' | 'rent';
    condition?: string;
    priceRange?: [number, number];
  }
): Item[] {
  return items.filter(item => {
    if (!item.available) return false;

    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search);
      if (!matchesSearch) return false;
    }

    if (filters.category && item.category !== filters.category) return false;

    if (filters.type === 'borrow' && !item.borrowAvailable) return false;
    if (filters.type === 'rent' && !item.rentAvailable) return false;

    if (filters.condition && item.condition !== filters.condition) return false;

    if (filters.priceRange && item.rentalPrice) {
      if (item.rentalPrice < filters.priceRange[0] || item.rentalPrice > filters.priceRange[1]) {
        return false;
      }
    }

    return true;
  });
}

export const CATEGORIES = [
  'Electronics',
  'Art & Design',
  'Sports & Outdoor',
  'Books & Textbooks',
  'School Supplies',
  'Tools & Equipment',
  'Clothing & Accessories'
];

export const CONDITIONS = [
  { value: 'like-new', label: 'Like New' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' }
];
