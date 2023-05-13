import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageTitle from '../../components/common/PageTitle'
import CustomerCard from '../../components/pharmacy/CustomerCard'
import axios from '../../config/axios'

function CustomerInfo() {
const [customer, setCustomer] = useState(null)
const [healthInfo, setHealthInfo] = useState(null)
const {id} = useParams()

const fetchCustomerData = async () => {
  const res = await axios.get(`/customers/customer/${id}`)
  setCustomer(res.data.customer)
}

const fetchHealthInfo = async ()=>{
  const res = await axios.get(`/customers/healthInfo/${id}`)
  setHealthInfo(res.data.healthInfo)
  
}

useEffect(()=>{
  fetchCustomerData()
  fetchHealthInfo()
},[id])


  return (
    <div>
      <PageTitle title='ข้อมูลสุขภาพ' toPage={'/pharmacy/contacts'}/>
      <CustomerCard {...customer} {...healthInfo}/>
    </div>
  )
}

export default CustomerInfo
