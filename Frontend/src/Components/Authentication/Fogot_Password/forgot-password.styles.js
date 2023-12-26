import styled from 'styled-components'

export const OtpInputModal = styled.div`
background-color: rgba(255, 255, 255, 0.9);
    position: fixed;
    top: 55%;
    left: 50%;
    min-width: 25vw;
    transform: translate(-50%, -50%);
    z-index: 2;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

  &:after{
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
    text-align: center;
    font-size: 2rem;
    font-weight: bolder;
    color: #F37037;
`; 

export const DivCloseButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #F37037;
  margin-left: auto;

  &:hover{
   background-color: #efa586;;
  }
`;