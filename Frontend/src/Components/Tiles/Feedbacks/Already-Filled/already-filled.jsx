import React from 'react'
import { AlFillDiv,AlFillMessage } from './already-filled.style';
import Navbar from '../../../Navbar/navbar';


const AlreadyFill = () => {
  return (
    <>
    <Navbar/>
    <AlFillDiv>
        <AlFillMessage>You Have Already Filled the Survey </AlFillMessage>
    </AlFillDiv>
    </>
  )
}

export default AlreadyFill;