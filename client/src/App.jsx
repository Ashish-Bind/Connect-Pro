import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import ProtectedRoute from './auth/ProtectedRoute.jsx'
import { LayoutLoader } from './components/layout/Loaders.jsx'
import { SERVER } from './constants/config.js'
import { useDispatch, useSelector } from 'react-redux'
import { userExists, userNotExists } from './redux/reducer/auth.js'
import SocketProvider from './utils/socket.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Group = lazy(() => import('./pages/Group.jsx'))
const Chat = lazy(() => import('./pages/Chat.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'))
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement.jsx'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement.jsx'))

function App() {
  const { user, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get(`${SERVER}/api/v1/user/profile`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data)
        dispatch(userExists(data.user))
      })
      .catch((err) => {
        dispatch(userNotExists())
      })
  }, [dispatch])

  return isLoading ? (
    <LayoutLoader />
  ) : (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectedRoute user={user} />
              </SocketProvider>
            }
          >
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

      <Toaster position="bottom-center" />
    </Router>
  )
}

export default App
