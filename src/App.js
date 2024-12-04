// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import AdminDashboard from './pages/AdminDashboard';
import CommentEdit from './pages/CommentEdit';
import ProtectedRoute from './services/ProtectedRoute';
import CategoryJobs from './pages/CategoryJobs';
import AllComments from './pages/AllComments';
import AdminJobs from './pages/AdminJobs';
import EditJob from './pages/EditJob';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/jobs/:id/edit"
            element={
              <ProtectedRoute adminOnly>
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute adminOnly>
                <AdminJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/comments"
            element={
              <ProtectedRoute adminOnly>
                <AllComments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:id/jobs"
            element={
              <ProtectedRoute>
                <CategoryJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/comments/:id/edit"
            element={
              <ProtectedRoute>
                <CommentEdit />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
