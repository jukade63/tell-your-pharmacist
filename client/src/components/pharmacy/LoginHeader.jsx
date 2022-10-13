import { Stack, Typography } from '@mui/material'

function LoginHeader() {
  const textColorStyle = {
    backgroundImage: 'linear-gradient(to bottom right, #DB4FCB, #2E2AD6)',
    backgroundClip: 'text',
    color: 'transparent',
    marginTop: '10px',
  }
  return (
    <Stack alignItems='center' textAlign='center' my={5}>
      <Typography variant='h3' sx={{ color: '#DB4FCB' }}>
        ร่วมเป็นส่วนหนึ่งของ
      </Typography>
      <Typography variant='h2' sx={textColorStyle} fontFamily='Pacifico, serif'>
        Tell your Pharmacist
      </Typography>
      <Typography sx={textColorStyle}>TELEPHARMACY</Typography>
    </Stack>
  )
}

export default LoginHeader
