import { Step, Stepper, StepLabel, Typography, Box } from '@mui/material'

function ServiceStepper() {
  return (
    <Box sx={{ margin: '10px 0 10px 5px' }}>
      <Typography variant='h3' color='#102e75'>
        ขั้นตอนการใช้งาน
      </Typography>
      <Stepper
        orientation='vertical'
        activeStep={1}
        sx={{ width: '300px', mx: 'auto' }}
      >
        <Step>
          <StepLabel>ลงทะเบียน</StepLabel>
        </Step>
        <Step>
          <StepLabel>เลือกร้านยาเพื่อรับบริการ</StepLabel>
        </Step>
        <Step>
          <StepLabel>แจ้งอาการและพูดคุยกับเภสัชกร</StepLabel>
        </Step>
        <Step>
          <StepLabel>เภสัชกรจัดยา แนะนำวิธีรับประทานยา</StepLabel>
        </Step>
        <Step>
          <StepLabel>รับยาที่ร้าน หรือรอรับที่บ้าน</StepLabel>
        </Step>
      </Stepper>
    </Box>
  )
}

export default ServiceStepper
