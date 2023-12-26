import React from 'react'
import { useState } from 'react'
import {FaArrowCircleUp} from 'react-icons/fa';
import { ButtonBackToTop } from './back-to-top.style';


const BackToTop = () => {

  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
     
    });
  };
  
  window.addEventListener('scroll', toggleVisible);


  return (
 <>

<ButtonBackToTop id="bttn" style={{display: visible ? 'flex' : 'none'}}>
     <FaArrowCircleUp onClick={scrollToTop} 
     style={{display: visible ? 'flex' : 'none'}} />
</ButtonBackToTop>

 </>
  )
}

export default BackToTop;