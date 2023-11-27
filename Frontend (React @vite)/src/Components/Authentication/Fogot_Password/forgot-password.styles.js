import styled from 'styled-components'

export const OtpInputModal = styled.div`
background-color: rgba(255, 255, 255, 0.9);
    position: fixed;
    top: 55%;
    left: 50%;
    max-width: 35vw;
    transform: translate(-50%, -50%);
    z-index: 2;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  &::after{
    transition: all .5s ease-in-out;
  }
  
    @media (max-width: 767px) {
        width: 40rem;
       
    }
`;
export const ModalParentDiv = styled.div`
background-color: rgba(0, 0, 0, 0.6 );
width: 100vw;
z-index: 2;
height: 100vh;
position: fixed;
top: 0;
   
`;

export const TableHeading = styled.h1`
    margin: 1rem 0 -2rem 0;
    text-align: center;
    font-size: 2rem;
    font-weight: bolder;
    color: #F37037;
`; 

export const DivCloseButton = styled.div`
    box-sizing: border-box;
    margin-left: 94%;
    margin-top: 1rem;
    font-size: 1rem;
    cursor: pointer;
`;