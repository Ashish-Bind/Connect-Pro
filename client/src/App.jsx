import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('./pages/Home.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Group = lazy(() => import('./pages/Group.jsx'))
const Chat = lazy(() => import('./pages/Chat.jsx'))

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/group" element={<Group />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
