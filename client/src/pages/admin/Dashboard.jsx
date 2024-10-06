import React from 'react'
import AdminLayout from './layout/AdminLayout'
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Message as MessageIcon,
} from '@mui/icons-material'
import moment from 'moment'
import { mattBlack } from '../../constants/color'
import { DoughnutChart, LineChart } from '../../components/Charts'

const Appbar = (
  <Paper elevation={3} sx={{ padding: '2rem', margin: '2rem 0' }}>
    <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
      <AdminPanelSettingsIcon sx={{ fontSize: '3rem' }} />

      <TextField placeholder="Search..." color="black" variant="standard" />

      <Button
        startIcon={<SearchIcon />}
        sx={{ backgroundColor: 'black', color: 'white' }}
        variant="contained"
        size="large"
      >
        Search
      </Button>
      <Box flexGrow={1} />
      <Typography
        display={{
          xs: 'none',
          lg: 'block',
        }}
        color={'rgba(0,0,0,0.7)'}
        textAlign={'center'}
      >
        {moment().format('dddd, D MMMM YYYY')}
      </Typography>

      <NotificationsIcon />
    </Stack>
  </Paper>
)

const Widget = ({ title, value, Icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: '2rem',
        margin: '2rem 0',
        width: '20rem',
      }}
    >
      <Stack alignItems={'center'} spacing={'1rem'}>
        <Typography
          sx={{
            color: 'rgba(0,0,0,0.7)',
            borderRadius: '50%',
            border: `5px solid ${mattBlack}`,
            width: '5rem',
            height: '5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {value}
        </Typography>
        <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
          {Icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

const Widgets = (
  <Stack
    direction={{
      xs: 'column',
      sm: 'row',
    }}
    spacing="2rem"
    justifyContent="space-between"
    alignItems={'center'}
    margin={'2rem 0'}
  >
    <Widget title={'Users'} value={65} Icon={<PersonIcon />} />
    <Widget title={'Chats'} value={32} Icon={<GroupIcon />} />
    <Widget title={'Messages'} value={578} Icon={<MessageIcon />} />
  </Stack>
)

const Dashboard = () => {
  return (
    <AdminLayout>
      <Container component={'main'}>
        {Appbar}

        <Stack
          direction={{
            xs: 'column',
            lg: 'row',
          }}
          flexWrap={'wrap'}
          justifyContent={'center'}
          alignItems={{
            xs: 'center',
            lg: 'stretch',
          }}
          sx={{ gap: '2rem' }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: '2rem 3.5rem',
              width: '100%',
              maxWidth: '45rem',
            }}
          >
            <Typography margin={'2rem 0'} variant="h5">
              Last Messages
            </Typography>

            <LineChart value={[1, 4, 13, 29, 35, 21, 66]} />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: '1rem ',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: '100%', sm: '50%' },
              position: 'relative',
              maxWidth: '25rem',
            }}
          >
            <DoughnutChart
              labels={['Single Chats', 'Group Chats']}
              value={[87, 13]}
            />

            <Stack
              position={'absolute'}
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              spacing={'0.5rem'}
              width={'100%'}
              height={'100%'}
            >
              <GroupIcon /> <Typography>Vs </Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  )
}

export default Dashboard