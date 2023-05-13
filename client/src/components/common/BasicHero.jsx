import { Stack, Typography } from '@mui/material'

function BasicHero() {
  const textColorStyle = {
    backgroundImage: 'linear-gradient(to bottom right, #DB4FCB, #2E2AD6)',
    backgroundClip: 'text',
    color: 'transparent',
    
  }
  return (
    <Stack alignItems='center' textAlign='center' mb={1}>
      <Typography sx={{...textColorStyle, fontSize: '2em', lineHeight: 2}} fontFamily='Pacifico, serif'>
        Tell your Pharmacist
      </Typography>
      <Typography sx={{...textColorStyle, letterSpacing:3, fontSize: '0.85em'}}>TELEPHARMACY</Typography>
    </Stack>
  )
}

export default BasicHero
