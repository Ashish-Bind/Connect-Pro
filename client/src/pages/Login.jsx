import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { VisuallyHiddenInput } from '../components/styles/StyledComponent'
import { CameraAlt } from '@mui/icons-material'
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import { usernameValidator } from '../utils/validators'
import { secondary } from '../constants/color'
import axios from 'axios'
import { SERVER } from '../constants/config'
import { useDispatch } from 'react-redux'
import { userExists } from '../redux/reducer/auth'
import toast from 'react-hot-toast'

const Login = () => {
  const dispatch = useDispatch()

  const [isLogin, setIsLogin] = React.useState(true)

  const toggleLogin = () => {
    setIsLogin(!isLogin)
  }

  const name = useInputValidation('')
  const bio = useInputValidation('')
  const username = useInputValidation('', usernameValidator)
  const password = useStrongPassword()

  const avatar = useFileHandler('single')

  const handleLogin = async (e) => {
    e.preventDefault()

    const options = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    console.log(SERVER)

    try {
      const { data } = await axios.post(
        `${SERVER}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        options
      )

      dispatch(userExists(true))
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const options = {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const formdata = new FormData()

    formdata.append('name', name.value)
    formdata.append('bio', bio.value)
    formdata.append('username', username.value)
    formdata.append('password', password.value)
    formdata.append('avatar', avatar.file)

    try {
      const { data } = await axios.post(
        `${SERVER}/api/v1/user/new`,
        formdata,
        options
      )
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
      console.log(error)
    }
  }

  return (
    <div style={{ backgroundColor: secondary, overflow: 'auto' }}>
      <Container
        component={'main'}
        maxWidth="sm"
        sx={{
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form style={{ width: '100%' }} onSubmit={handleLogin}>
                <TextField
                  required
                  label="Username"
                  type="text"
                  fullWidth
                  margin="normal"
                  varaint="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  varaint="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  margin="normal"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  type="submit"
                >
                  Login
                </Button>

                <Typography
                  textAlign={'center'}
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  OR
                </Typography>

                <Button
                  margin="normal"
                  variant="text"
                  fullWidth
                  onClick={toggleLogin}
                >
                  {isLogin ? 'Sign up' : 'Login'} instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Register</Typography>
              <form style={{ width: '100%' }} onSubmit={handleRegister}>
                <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                  <Avatar
                    sx={{
                      width: '10rem',
                      height: '10rem',
                      objectFit: 'contain',
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      color: 'white',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      ':hover': {
                        bgcolor: 'rgba(0,0,0,0.7)',
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAlt />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                <TextField
                  required
                  label="Name"
                  type="text"
                  fullWidth
                  margin="normal"
                  varaint="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />

                <TextField
                  required
                  label="Bio"
                  type="text"
                  fullWidth
                  margin="normal"
                  varaint="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />

                <TextField
                  required
                  label="Username"
                  type="text"
                  fullWidth
                  margin="normal"
                  varaint="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  varaint="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  margin="normal"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  type="submit"
                >
                  Sign up
                </Button>

                <Typography
                  textAlign={'center'}
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  OR
                </Typography>

                <Button
                  margin="normal"
                  variant="text"
                  fullWidth
                  onClick={toggleLogin}
                >
                  {isLogin ? 'Sign up' : 'Login'} instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  )
}

export default Login
