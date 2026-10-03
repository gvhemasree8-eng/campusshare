import { useState, useCallback } from 'react';
import { User } from '../types';
import { getCurrentUser, setCurrentUser, getUsers } from '../utils/storage';

export function useAuth() {
  const [currentUser, setCurrentUserState] = useState<User | null>(getCurrentUser());

  const login = useCallback((email: string, password: string) => {
    const users = getUsers();
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setCurrentUserState(user);
      return { success: true, user };
    }
    return { success: false, error: 'User not found' };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentUserState(null);
  }, []);

  const signup = useCallback((name: string, email: string, college: string) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: '👤',
      college,
      verified: false,
      rating: 0,
      reviewCount: 0,
      completedTransactions: 0,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('cs_users', JSON.stringify(users));
    setCurrentUser(newUser);
    setCurrentUserState(newUser);
    return { success: true, user: newUser };
  }, []);

  return {
    currentUser,
    login,
    logout,
    signup,
    isAuthenticated: !!currentUser
  };
}
