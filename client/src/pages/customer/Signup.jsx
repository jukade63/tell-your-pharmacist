import { Box, Button } from '@mui/material'
import Input from '../../components/common/Input'
import PageTitle from '../../components/common/PageTitle'
import { validate } from '../../helpers/validations/customerValidation'
import { useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const { signup } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setFormErrors(validate(formValues))
      setIsSubmit(true)
      await signup('customerAuth', formValues)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate('/login')
    }
  }, [formErrors])
  return (
    <div>
      <PageTitle title='ลงทะเบียน' toPage='/login' />
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
