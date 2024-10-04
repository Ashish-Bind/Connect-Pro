import {
  CameraAlt,
  Face as FaceIcon,
  AlternateEmail as EmailIcon,
  CalendarMonth as CalendarIcon,
  Face,
} from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import moment from 'moment'

const Profile = () => {
  return (
    <Stack
      spacing={'2rem'}
      direction={'column'}
      alignItems={'center'}
      sx={{ padding: '1rem' }}
    >
      <Avatar
        sx={{
          width: '10rem',
          height: '10rem',
          objectFit: 'contain',
          border: '2px solid black',
          marginBottom: '1rem',
        }}
      />
      <ProfileCard text={'Bio'} Icon={<CameraAlt />} heading={'Trust God'} />
      <ProfileCard text={'Username'} Icon={<EmailIcon />} heading={'johndoe'} />
      <ProfileCard text={'Name'} Icon={<FaceIcon />} heading={'John Doe'} />
      <ProfileCard
        text={'Joined'}
        Icon={<CalendarIcon />}
        heading={moment('2024-03-06T18:30:00.000Z').fromNow()}
      />
    </Stack>
  )
}

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={'1rem'}
      color={'black'}
      textAlign={'center'}
    >
      {Icon && Icon}

      <Stack>
        <Typography variant="body1">{heading}</Typography>
        <Typography variant="caption" color="gray">
          {text}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Profile
