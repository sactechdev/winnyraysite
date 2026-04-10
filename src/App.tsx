/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CleaningPage from './pages/CleaningPage';
import RealEstatePage from './pages/RealEstatePage';
import BookingPage from './pages/BookingPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ContactPage from './pages/ContactPage';
import AdminCMS from './pages/AdminCMS';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import { ContentProvider } from './lib/ContentContext';

export default function App() {
  return (
    <ContentProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cleaning" element={<CleaningPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/real-estate" element={<RealEstatePage />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/admin/cms" element={<AdminCMS />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ContentProvider>
  );
}

