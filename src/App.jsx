import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import About from '@/pages/About';
import Projects from '@/pages/Projects';
import CaseTemplatePreview from '@/pages/CaseTemplatePreview';
import Admin from './pages/Admin';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import ProtectedRoute from '@/components/ProtectedRoute';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings } = useAuth();

  const { pathname } = useLocation();
  const needsBackend = ['/admin', '/login', '/register', '/forgot-password', '/reset-password'].includes(pathname);

  if (needsBackend && import.meta.env.VITE_ENABLE_BASE44_ADMIN !== 'true') {
    return <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <p>El panel de Base44 está desactivado en esta versión local.</p>
      <a href="/">Volver al portafolio</a>
    </main>;
  }

  // Show loading spinner while checking app public settings or auth
  if (needsBackend && (isLoadingPublicSettings || isLoadingAuth)) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render the main app — public pages render regardless of auth state.
  // ProtectedRoute handles auth gating for /admin.
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/proyectos" element={<Projects />} />
      <Route path="/casos" element={<Navigate to="/proyectos" replace />} />
      <Route path="/sobre-mi" element={<About />} />
      <Route path="/plantilla-caso" element={<CaseTemplatePreview />} />
      <Route path="/proyectos/:slug" element={<ProjectDetail />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthProvider>
          <ScrollToTop />
          <AuthenticatedApp />
          </AuthProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
  )
}

export default App