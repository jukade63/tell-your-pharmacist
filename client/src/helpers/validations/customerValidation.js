export const validate = (value) => {
  const errors = {}
  const validPhone =
    /((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))|((\+๖๖|๐)([๐-๙]{1,2}\-?[๐-๙]{3}\-?[๐-๙]{3,4}))/gm

  if (!value.firstName) {
    errors.firstName = 'Firstname is required'
  }
  if (!value.lastName) {
    errors.lastName = 'Lastname is required'
  }
  if (!value.phoneNumber) {
    errors.phoneNumber = 'Phone number is required'
  } else if (!validPhone.test(value.phoneNumber)) {
    errors.phoneNumber = 'Phone number is invalid'
  }
  if (!value.email) {
    errors.email = 'Email is required'
  }
  if (!value.password) {
    errors.password = 'Password is required'
  }

  if (!value.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required'
  } else if (value.password !== value.confirmPassword) {
    errors.confirmPassword = 'Password and confirm password does not match'
  }

  return errors
}
