import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { usePharmacy } from '../../contexts/PharmacyContext'
import axios from '../../config/axios'
import { useEffect, useState } from 'react'
import { useCustomer } from '../../contexts/CustomerContext'

function FindPharmacies() {
  const navigate = useNavigate()
  const {customer} = useCustomer()
  const { setPharmacies } = usePharmacy()
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')

  const getUserLocation = () => {
    const success = ({ coords }) => {
      setLat(coords.latitude)
      setLng(coords.longitude)
    }

    const error = (err) => {
      if (err.message === 'User denied Geolocation') {
        alert('Location permisson is necessary')
        location.reload()
      }
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  useEffect(()=>{
    getUserLocation()
  }, [lat, lng])

  const handleFindPharmacies = async () => {
    try {
      if(!customer) navigate('/login')
      if (lat && lng) {
        const result = await axios.get(`/pharmacies/${lat}/${lng}`)
        setPharmacies(result.data.pharmacies)
        console.log(lat);
        console.log(lng);
        navigate(`/stores-found/${lat}/${lng}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button
      variant='contained'
      sx={{ display: 'block', margin: '20px auto' }}
      fullWidth
      onClick={handleFindPharmacies}
    >
      ค้นหาร้านยาใกล้ตัว
    </Button>
  )
}

export default FindPharmacies
