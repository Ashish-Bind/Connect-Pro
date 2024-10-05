import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProtectedRoute from './auth/ProtectedRoute.jsx'

import { LayoutLoader } from './components/layout/Loaders.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Group = lazy(() => import('./pages/Group.jsx'))
const Chat = lazy(() => import('./pages/Chat.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'))
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement.jsx'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement.jsx'))

let user = true

function App() {
  return (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/group" element={<Group />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/admin">
            <Route index element={<AdminLogin />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="chat-management" element={<ChatManagement />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
