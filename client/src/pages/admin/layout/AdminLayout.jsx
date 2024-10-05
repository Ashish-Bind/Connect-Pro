import {
  Box,
  Drawer,
  Grid2,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Chat as ChatIcon,
  Person as UserIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material'
import { gray, mattBlack } from '../../../constants/color'
import { useState } from 'react'
import { Link } from '../../../components/styles/StyledComponent'
import ConfirmDialog from '../../../components/dialogs/ConfirmDialog'

const adminTabs = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    Icon: DashboardIcon,
  },
  {
    name: 'Users',
    path: '/admin/user-management',
    Icon: UserIcon,
  },
  {
    name: 'Chats',
    path: '/admin/chat-management',
    Icon: ChatIcon,
  },
]

const Sidebar = ({ w = '100%', handler }) => {
  return (
    <Stack width={w} direction={'column'} p={'3rem'} spacing={'3rem'}>
      <Typography variant="h5">ConnectPro.</Typography>

      <Stack spacing={'1rem'}>
        {adminTabs.map(({ path, name, Icon }) => (
          <Link
            to={path}
            key={name}
            sx={
              location.pathname === path
                ? { bgcolor: mattBlack, color: 'white' }
                : {}
            }
          >
            <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
              <Icon />
              <Typography>{name}</Typography>
            </Stack>
          </Link>
        ))}

        <Link onClick={handler}>
          <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  )
}

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)

  const handleMobile = () => setIsMobile(!isMobile)

  const handleMobileClose = () => setIsMobile(false)

  const handleLogout = () => setIsLogoutOpen(true)

  const closeLogout = () => setIsLogoutOpen(false)

  const logoutHandler = () => {
    console.log('logoutHandler')
  }

  return (
    <Grid2 container sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          right: '1rem',
          top: '1rem',
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid2
        sx={{ display: { xs: 'none', md: 'block' } }}
        size={{ lg: 3, md: 4 }}
      >
        <Sidebar handler={handleLogout} />
      </Grid2>
      <Grid2 size={{ lg: 9, md: 8, xs: 12 }} bgcolor={gray}>
        {children}
      </Grid2>

      <Drawer
        open={isMobile}
        onClose={handleMobileClose}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Sidebar handler={handleLogout} />
      </Drawer>

      {isLogoutOpen && (
        <ConfirmDialog
          open={isLogoutOpen}
          title={'Logout'}
          description={'Are you sure you want to logout?'}
          handleClose={() => setIsLogoutOpen(false)}
          deleteHandler={logoutHandler}
        />
      )}
    </Grid2>
  )
}

export default AdminLayout
