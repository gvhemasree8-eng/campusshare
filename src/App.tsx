import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import BrowsePage from './pages/BrowsePage';
import ItemDetailPage from './pages/ItemDetailPage';
import DashboardPage from './pages/DashboardPage';
import PostItemPage from './pages/PostItemPage';
import RequestsPage from './pages/RequestsPage';
import MessagesPage from './pages/MessagesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuthContext } from './context/AuthContext';

export default function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <LoginPage />} />
        <Route path="/post-item" element={isAuthenticated ? <PostItemPage /> : <LoginPage />} />
        <Route path="/my-requests" element={isAuthenticated ? <RequestsPage /> : <LoginPage />} />
        <Route path="/messages" element={isAuthenticated ? <MessagesPage /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Layout>
  );
}
