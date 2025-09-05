import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import Register from './pages/Register';
import { Login } from './pages/Login';
import { ProfileCreation } from './pages/ProfileCreation';
import { AdminDashboard } from './pages/AdminDashboard';
import { EscortDashboard } from './pages/EscortDashboard';
import { Blacklisted } from './pages/Blacklisted';
import { Reviews } from './pages/Reviews';
import { Testimonials } from './pages/Testimonials';
import { Events } from './pages/Events';
import { Videos } from './pages/Videos';
import { Adverts } from './pages/Adverts';
import { FAQ } from './pages/FAQ';
import { Tour } from './pages/Tour';
import Browse from './pages/Browse';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

export function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blacklisted" element={<Blacklisted />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/events" element={<Events />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/advertise" element={<Adverts />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/create-profile" element={
            <ProtectedRoute>
              <ProfileCreation />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <EscortDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}