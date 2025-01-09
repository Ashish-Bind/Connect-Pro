import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { primary } from '../../constants/color'

import axios from 'axios'
import { lazy, Suspense, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { SERVER } from '../../constants/config'
import { userNotExists } from '../../redux/reducer/auth'
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from '../../redux/reducer/misc'
import ConfirmDialog from '../dialogs/ConfirmDialog'
import { resetNotificationCount } from '../../redux/reducer/chat'

const SearchDialog = lazy(() => import('../Search'))
const NotificationsDialog = lazy(() => import('../Notifications'))
const NewGroupDialog = lazy(() => import('../NewGroup'))

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isMobile, isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  )
  const { notificationCount } = useSelector((state) => state.chat)

  const [isLogoutOpen, setIsLogoutOpen] = useState(false)

  const handleMobileOpen = () => {
    dispatch(setIsMobile(true))
  }

  const handleSearch = () => {
    dispatch(setIsSearch(true))
  }

  const handleNewGroupOpen = () => {
    dispatch(setIsNewGroup(true))
  }

  const openGroup = () => {
    navigate('/group')
  }

  const handleNotificationOpen = () => {
    dispatch(setIsNotification(true))
    dispatch(resetNotificationCount(0))
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
                  <IconButton color="inherit" onClick={handleNewGroupOpen}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Manage Groups">
                  <IconButton color="inherit" onClick={openGroup}>
                    <GroupIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Notifications">
                  <IconButton
                    color="inherit"
                    onClick={handleNotificationOpen}
                    size="large"
                  >
                    <Badge badgeContent={notificationCount} color="error">
                      <NotificationsIcon />
                    </Badge>
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

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}

      {isNotification && (
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
