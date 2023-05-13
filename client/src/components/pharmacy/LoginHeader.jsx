import { Stack, Typography } from '@mui/material'

function LoginHeader() {
  const textColorStyle = {
    backgroundImage: 'linear-gradient(to bottom right, #DB4FCB, #2E2AD6)',
    backgroundClip: 'text',
    color: 'transparent',
    marginTop: '10px',
    minHeight: 60
  }
  return (
    <Stack alignItems='center' textAlign='center' my={5}>
      <Typography variant='h3' sx={{ color: '#DB4FCB' }}>
        Welcome, Be part of
      </Typography>
      <Typography variant='h2' sx={textColorStyle} fontFamily='Pacifico, serif'>
        Tell your Pharmacist
      </Typography>
      <Typography sx={{...textColorStyle, letterSpacing: 3}}>TELEPHARMACY</Typography>
    </Stack>
  )
}

export default LoginHeader
