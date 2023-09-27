import React from 'react'

const UserDetails = (props) => {
    const data = props?.location?.state?.data

  return (
    <>
    <div className="form-container" style={{borderRadius:'20px'}}>
      <div className="register-form">
       
        <div>First Name: {data.first_name}</div>
        <hr/>
        <div>Last Name:{data.last_name}</div>
        <hr/>
        <div>Email:{data.email}</div>
        <hr/>
        <div>Country {data.country}</div>
        <hr/>
        <div>State: {data.state}</div>
        <hr/>
        <div>City :{data.city}</div>
        <hr/>
        <div>Date of Birth:{data.dateOfBirth}</div>
        <hr/>
       <div>Age :{data.age}</div>
      </div>
    </div>
   
    </>
  )
}

export default UserDetails