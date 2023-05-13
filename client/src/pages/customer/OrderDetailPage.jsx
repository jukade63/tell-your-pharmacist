import React from 'react'
import OrderDetail from '../../components/common/OrderDetail'
import PageTitle from '../../components/common/PageTitle'

function OrderDetailPage() {
  return (
    <>
    <PageTitle title='Order details' toPage='/orders'/>
    <OrderDetail/>
    </>
  )
}

export default OrderDetailPage