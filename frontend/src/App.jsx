import React from 'react';
import { Divider, Layout } from 'antd';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import HelpPage from './components/pages/HelpPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import FindDonorPage from './components/pages/FindDonorPage';
import CreateClinicPage from './components/pages/auth/CreateClinicPage';
import AuthPage from './components/pages/auth/AuthPage';
import CreatePetPage from './components/pages/CreatePetPage';
import CreateDonorPage from './components/pages/CreateDonorPage';
import UserProfilePage from './components/pages/UserProfilePage';
import ClinicsPage from './components/pages/ClinicsPage';
import RecipientsPage from './components/pages/RecipientsPage';
import AdminPage from './components/pages/AdminPage';
import AdminClinicPage from './components/pages/AdminClinicPage';
import PetProfilePage from './components/pages/PetProfilePage';
import HowToBecomeDonorPage from './components/pages/HowToBecomeDonorPage';
import FAQPage from './components/pages/FAQPage';
import SuccessStoriesPage from './components/pages/SuccessStoriesPage';
import DonationPage from './components/pages/DonationPage';
import AnalyticsPage from './components/pages/AnalyticsPage';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  lineHeight: '120px',
  color: '#000',
  backgroundColor:"white", //'#ebeeff',
  padding: "1rem",
  justifyContent: 'center'
};

const App = () => (
  <Router>
    <Layout>
      <AppHeader />
      <Layout.Content style={contentStyle}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/donor/find" element={<FindDonorPage />} />
          <Route path="/donor" element={<CreateDonorPage />} />
          <Route path="/clinic" element={<CreateClinicPage />} />
          <Route path="/pet" element={<CreatePetPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route path="/profile" element={<UserProfilePage />} />

          <Route path="/pet/profile/:id" element={<PetProfilePage />} />


          <Route path="/clinics" element={<ClinicsPage />} />

          <Route path="/recipients" element={<RecipientsPage />} />

          <Route path="/admin" element={<AdminPage />} />

          <Route path="/clinics/requests" element={<AdminClinicPage />} />

          <Route path="/donor/how-to" element={<HowToBecomeDonorPage />} />
          <Route path="/donor/faq" element={<FAQPage />} />
          <Route path="/donor/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/donation" element={<DonationPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </Layout.Content>
      
      <AppFooter />
    </Layout>
  </Router>
);
export default App;