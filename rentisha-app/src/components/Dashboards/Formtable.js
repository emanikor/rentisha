import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'

const Formtable = ({handleSubmit,handleOnChange,handleclose,rest}) => {
  return (
    <div className="addContainer">
            <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleclose}><MdClose/></div>
              <label htmlFor="name">Name : </label>
              <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>

              <label htmlFor="description">Description : </label>
              <input type="text" id="email" name="description" onChange={handleOnChange} value={rest.description}/>

             

              <button className="btn">Submit</button>
            </form>
    </div>
  )
}

export default Formtable