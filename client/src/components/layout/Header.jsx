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

import { lazy, Suspense, useState } from 'react'
import ConfirmDialog from '../dialogs/ConfirmDialog'
import toast from 'react-hot-toast'
import axios from 'axios'
import { userNotExists } from '../../redux/reducer/auth'
import { useDispatch } from 'react-redux'
import { SERVER } from '../../constants/config'
import { setIsMobile } from '../../redux/reducer/misc'

const SearchDialog = lazy(() => import('../Search'))
const NotificationsDialog = lazy(() => import('../Notifications'))
const NewGroupDialog = lazy(() => import('../NewGroup'))

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)

  const handleMobileOpen = () => {
    dispatch(setIsMobile(true))
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
    setIsLogoutOpen(true)
    console.log('handleLogout')
  }

  const logoutHandler = () => {
    axios
      .post(`${SERVER}/api/v1/user/logout`, {}, { withCredentials: true })
      .then((response) => {
        const { data } = response
        dispatch(userNotExists())
        toast.success(data.message)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Something went wrong')
      })
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={'4rem'}>
        <AppBar position="static" sx={{ bgcolor: primary }}>
          <Toolbar>
            <Typography
              variant="h5"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block', fontWeight: 'bold' },
              }}
            >
              ConnectPro.
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="inherit" onClick={handleMobileOpen}>
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

      <ConfirmDialog
        open={isLogoutOpen}
        handleClose={() => setIsLogoutOpen(false)}
        deleteHandler={logoutHandler}
        title="Logout"
        description="Are you sure you want to logout?"
      />
    </>
  )
}

export default Header
