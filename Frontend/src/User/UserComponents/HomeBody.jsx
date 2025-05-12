import React from 'react'
import Services from './Services'
import UserAccountCreate from './UserAccountCreate'
import UserBody from './UserBody'

const HomeBody = () => {
  return (
    <div>
      <UserBody/>
      <Services/>
      <UserAccountCreate/>
    </div>
  )
}

export default HomeBody