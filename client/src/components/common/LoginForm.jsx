import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Input from './Input'
import { useLocation, useNavigate } from 'react-router-dom'
import BasicSnackbar from './BasicSnackbar'

function LoginForm({ endpoint, toHome, toSignup }) {
  const navigate = useNavigate()
  const location = useLocation()
  const {login} = useAuth()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault()
      await login(endpoint, phoneNumber, password)
      navigate(toHome)
      
    } catch (error) {
      setError(error.response.data.message)
      setOpen(true)
      console.log(error);
    }
  }

  return (
    <>
      {error && <BasicSnackbar open={open} message={error} severity='error' onClose={handleClose}/>}
      <Box
        component='form'
        noValidate
        autoComplete='off'
        mt='10px'
        mx='auto'
        maxWidth={600}
        onSubmit={handleOnSubmit}
      >
        <Input
          label='เบอร์โทร'
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
        <Input
          label='รหัสผ่าน'
          type='password'
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Stack spacing={2} width={200} display='flex' mx='auto' mt={1}>
          <Button variant='contained' type='submit'>
            เข้าสู่ระบบ
          </Button>
          <Button variant='outlined' color='secondary' onClick={()=>navigate(toSignup)}>
            สมัครใหม่
          </Button>
        </Stack>
        <Typography
          variant='body1'
          textAlign='center'
          mt={1}
          sx={{ textDecoration: 'underline' }}
        >
          ลืมรหัสผ่าน
        </Typography>
      </Box>
    </>
  )
}

export default LoginForm
