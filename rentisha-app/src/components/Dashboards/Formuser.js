import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}><MdClose /></div>
        <label htmlFor="name">Name : </label>
        <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name} />

        <label htmlFor="email">Email : </label>
        <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email} />

        <label htmlFor="mobile">Mobile : </label>
        <input type="number" id="mobile" name="phone" onChange={handleOnChange} value={rest.phone} />

        <label htmlFor="password">Password : </label>
        <input type="password" id="password" name="password" onChange={handleOnChange} value={rest.password} />

        <label htmlFor="confirmPassword">Confirm Password : </label>
        <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleOnChange} value={rest.confirmPassword} />

        <button className="btn">Submit</button>
      </form>
    </div>
  )
}

export default Formtable
