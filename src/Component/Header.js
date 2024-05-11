

import React from 'react'
import Avatar from "@mui/material/Avatar"
import "./Headers.css"

const Header = () => {
  return (
   <>
   <header>
    <nav>
        <h1>hp cloud</h1>
        <div className='avatar'>
        <Avatar style={{backgroundColor : "green"}}></Avatar>

        </div>
        
       
         

    </nav>


  </header>
   
   </>
  )
}

export default Header
