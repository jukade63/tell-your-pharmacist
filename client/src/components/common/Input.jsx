import { TextField, Typography } from '@mui/material'
import React from 'react'

function Input({
  required,
  label,
  value,
  name,
  type,
  onChange,
  error,
  helperText,
  onClick,
}) {
  const inputStyle = {
    fontSize: 15,
    color: '#1C419A',
    background: 'white',
  }
  return (
    <TextField
      variant='outlined'
      error={error}
      helperText={
        <Typography variant='body3' color='error'>
          {helperText}
        </Typography>
      }
      type={type}
      fullWidth
      required={required}
      inputProps={{ style: inputStyle }}
      InputLabelProps={{ style: {fontSize: 15}}}
      sx={{ mb: 2 }}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  )
}

export default Input
