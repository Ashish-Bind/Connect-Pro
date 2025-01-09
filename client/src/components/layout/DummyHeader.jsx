import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { primary } from '../../constants/color'

const DummyHeader = () => {
  return (
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
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default DummyHeader
