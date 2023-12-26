import styled from 'styled-components'

export const EmployeeDetailsModal = styled.div`
    position: fixed;
    top: 55%;
    left: 50%;
    max-width: 35vw;
    transform: translate(-50%, -50%);
    z-index: 1000;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
    border: none;

  &::after{
    transition: all .5s ease-in-out;
  }
  
    @media (max-width: 767px) {
        width: 40rem;
       
    }
`;