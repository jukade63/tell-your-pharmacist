import { Alert, Box, Button } from '@mui/material'
import Input from '../../components/common/Input'
import { AuthContext } from '../../contexts/AuthContext'
import PageTitle from '../../components/common/PageTitle'
import { useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { validate } from '../../helpers/validations/pharmacyValidation'
import { reverseGeocode } from '../../services/reverseGeocode'

function Signup() {
  const { signup} = useContext(AuthContext)
  const navigate = useNavigate()
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    storeName: '',
    password: '',
    confirmPassword: '',
  }

  const [getLatLng, setGetLatLng] = useState({ latitude: '', longitude: '' })
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [addressValue, setAddressValue] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setFormErrors(validate({ ...formValues, ...getLatLng }))
      setIsSubmit(true)
      setSubmitError('')
      await signup('pharmacyAuth', { ...formValues, ...getLatLng })
      navigate('/pharmacy/login')
    } catch (error) {
      const errorMsg = error.response.data.message
      setSubmitError(errorMsg)
      setTimeout(() => {
        setSubmitError('')
      }, 3000);
    }
  }

  const handleGetLocation = () => {
    const showPosition = ({ coords }) => {
      setGetLatLng({ latitude: coords.latitude, longitude: coords.longitude })
      reverseGeocode(getLatLng.latitude, getLatLng.longitude, setAddressValue)
      console.log(addressValue)
    }

    const showError = (error) => {
      if (error.message === 'User denied Geolocation') {
        alert('Allow app to access your location')
        location.reload()
      }
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError)
    }
  }

  useEffect(() => {
    handleGetLocation()
  }, [])

  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && submitError === '' && isSubmit) {
      handleSubmit()
    }
  }, [submitError])

  return (
    <div>
      <PageTitle title='ลงทะเบียน' toPage='/pharmacy/login' />
      {submitError && <Alert severity='error'>{submitError}</Alert>}
      <Box
        component='form'
        autoComplete='off'
        mt='10px'
        mx='auto'
        maxWidth={600}
        onSubmit={handleSubmit}
      >
        <Input
          label='ชื่อ'
          helperText={formErrors.firstName}
          name='firstName'
          onChange={handleChange}
          value={formValues.firstName}
        />
        <Input
          label='นามสกุล'
          helperText={formErrors.lastName}
          name='lastName'
          onChange={handleChange}
          value={formValues.lastName}
        />
        <Input
          label='เบอร์มือถือ'
          helperText={formErrors.phoneNumber}
          name='phoneNumber'
          onChange={handleChange}
          value={formValues.phoneNumber}
        />
        <Input
          label='อีเมล'
          type='email'
          helperText={formErrors.email}
          name='email'
          onChange={handleChange}
          value={formValues.email}
        />
        <Input
          label='ชื่อร้าน'
          helperText={formErrors.storeName}
          name='storeName'
          onChange={handleChange}
          value={formValues.storeName}
        />
        <Input
          label='ที่อยู่'
          helperText={formErrors.latitude}
          value={addressValue}
          onClick={handleGetLocation}
        />
        <Input
          label='รหัสผ่าน'
          type='password'
          helperText={formErrors.password}
          name='password'
          onChange={handleChange}
          value={formValues.password}
        />
        <Input
          label='ยืนยันรหัสผ่าน'
          type='password'
          helperText={formErrors.confirmPassword}
          name='confirmPassword'
          onChange={handleChange}
          value={formValues.confirmPassword}
        />

        <Button
          variant='contained'
          type='submit'
          fullWidth
          color='secondary'
          sx={{ display: 'block', m: '15px auto 0 auto' }}
        >
          ยืนยัน
        </Button>
      </Box>
    </div>
  )
}

export default Signup
