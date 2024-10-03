import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { primary } from '../../constants/color'
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import React, { Suspense } from 'react'

const SearchDialog = React.lazy(() => import('../Search'))
const NotificationsDialog = React.lazy(() => import('../Notifications'))
const NewGroupDialog = React.lazy(() => import('../NewGroup'))

const Header = () => {
  const navigate = useNavigate()

  const [isMobileOpen, setIsMobileOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [isNewGroupOpen, setIsNewGroupOpen] = React.useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false)

  const handleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const addGroup = () => {
    setIsNewGroupOpen(!isNewGroupOpen)
  }

  const openGroup = () => {
    navigate('/group')
  }

  const handleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  const handleLogout = () => {
    console.log('handleLogout')
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={'4rem'}>
        <AppBar position="static" sx={{ bgcolor: primary }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              ConnectPro.
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Box>
                <IconButton color="inherit" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>

                <Tooltip title="New Group">
                  <IconButton color="inherit" onClick={addGroup}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Manage Groups">
                  <IconButton color="inherit" onClick={openGroup}>
                    <GroupIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Notifications">
                  <IconButton color="inherit" onClick={handleNotification}>
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Logout">
                  <IconButton color="inherit" onClick={handleLogout}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearchOpen && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNewGroupOpen && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}

      {isNotificationOpen && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialog />
        </Suspense>
      )}
    </>
  )
}

export default Header
