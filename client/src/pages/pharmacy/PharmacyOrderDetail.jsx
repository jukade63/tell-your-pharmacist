import React from 'react'
import OrderDetail from '../../components/common/OrderDetail'
import PageTitle from '../../components/common/PageTitle'

function PharmacyOrderDetail() {
  return (
    <>
    <PageTitle title='Order detail' toPage='/pharmacy/orders'/>
    <OrderDetail/>
    </>
  )
}

export default PharmacyOrderDetail