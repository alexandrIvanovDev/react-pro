import { BrowserRouter, Route, Routes } from 'react-router';

import './styles/index.css';
import { AuthProvider } from './providers/authProvider/AuthContext';
import { ProtectedRoute } from './providers/ProtectedRoute/ProtectedRoute';
import { LoginPage } from 'features/authRouting/LoginPage';
import { Header } from 'widgets/Header/Header';
import { Profile } from 'pages/profile/ProfilePage';
import { PublicPage } from 'pages/public/PublicPage';
import { PortalShowcase } from 'pages/PortalShowcase/ui/PortalShowcase';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<div>Home</div>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/public' element={<PublicPage />} />
          <Route path='/portal' element={<PortalShowcase />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
