import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
import ProtectedRoute from './auth/ProtectedRoute.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Group = lazy(() => import('./pages/Group.jsx'))
const Chat = lazy(() => import('./pages/Chat.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

let user = true

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/group" element={<Group />} />
        </Route>
        
        <Route
          path="/login"
          element={
            <ProtectedRoute user={!user} redirect='/'>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
