import React from 'react'
import Services from './Services'
import UserBody from './UserBody'
import UserAccountCreate from './UserAccountCreate'

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