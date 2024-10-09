import {
  CameraAlt,
  Face as FaceIcon,
  AlternateEmail as EmailIcon,
  CalendarMonth as CalendarIcon,
  Face,
} from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import moment from 'moment'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)

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
        src={user.avatar.url}
      />
      <ProfileCard text={'Bio'} Icon={<CameraAlt />} heading={user.bio} />
      <ProfileCard
        text={'Username'}
        Icon={<EmailIcon />}
        heading={user.username}
      />
      <ProfileCard text={'Name'} Icon={<FaceIcon />} heading={user.name} />
      <ProfileCard
        text={'Joined'}
        Icon={<CalendarIcon />}
        heading={moment(user.createdAt).fromNow()}
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
