import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const Login = () => {
  const [isLogin, setIsLogin] = React.useState(true)

  const toggleLogin = () => {
    setIsLogin(!isLogin)
  }

  return (
    <Container
      component={'main'}
      maxWidth="sx"
      sx={{
        marginTop: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
        }}
      >
        {isLogin ? (
          <>
            <Typography varaint="h5">Login</Typography>
            <form>
              <TextField
                required
                label="Username"
                type="text"
                fullWidth
                margin="normal"
                varaint="outlined"
              />
              <TextField
                required
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                varaint="outlined"
              />
              <Button
                variant="contained"
                fullWidth
                margin="normal"
                color="primary"
              >
                Login
              </Button>
              <Typography textAlign={'center'}>OR</Typography>
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
            <Typography varaint="h1">Register</Typography>
            <form>
              <TextField
                required
                label="Username"
                type="text"
                fullWidth
                margin="normal"
                varaint="outlined"
              />
              <TextField
                required
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                varaint="outlined"
              />
              <Button
                variant="contained"
                fullWidth
                margin="normal"
                color="primary"
              >
                Sign up
              </Button>
              <Typography textAlign={'center'}>OR</Typography>
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
  )
}

export default Login
