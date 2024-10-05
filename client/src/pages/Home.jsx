import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Typography } from '@mui/material'
import { gray } from '../constants/color'

const Home = () => {
  return (
    <Typography
      p={'2rem'}
      textAlign={'center'}
      variant="h5"
      sx={{ bgcolor: gray }}
      height={'100%'}
    >
      Chat with working professionals to grow
    </Typography>
  )
}

const WrappedHome = React.memo(AppLayout()(Home), () => true)
WrappedHome.displayName = 'WrappedHome' // add a display name

export default WrappedHome
