import React from 'react'
import Achievements from './Achievements'
import UserAccountCreate from './UserAccountCreate'
import UserBody from './UserBody'

const HomeBody = () => {
  return (
    <div>
      <UserBody/>
      <Achievements/>
      <UserAccountCreate/>
    </div>
  )
}

export default HomeBody
