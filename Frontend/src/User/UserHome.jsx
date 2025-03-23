import React from 'react'
import UserAbout from './UserPages/UserAbout'
import UserContact from './UserPages/UserContact'

const UserHome = () => {
  return (
    <div>
        <UserContact/>
        <br /><br /><br /><br />
        <UserAbout/>
      
    </div>
  )
}

export default UserHome
