import React from 'react'
import { AccDeniedDiv, AccDeniedMessage } from './access-denied.style'

const AccessDenied = () => {
  return (
    <AccDeniedDiv>
        <AccDeniedMessage>You Dont Have Access To This Page ☹️ </AccDeniedMessage>
    </AccDeniedDiv>
  )
}

export default AccessDenied;