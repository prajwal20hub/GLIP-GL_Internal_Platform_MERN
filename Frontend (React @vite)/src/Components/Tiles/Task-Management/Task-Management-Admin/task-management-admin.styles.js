import styled from 'styled-components'

export const TableHeading = styled.h1`
    margin: 1rem 0 -2rem 0;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bolder;
    color: #F37037;
`; 

export const EmployeeListTable = styled.div`
    width: 80%;
    margin: 3rem auto 0 auto;
`

export const FilterIconDiv = styled.div`
    max-width:80%;
`
export const TableLengthIconDiv   = styled.div`
    width: 60%;
    margin:auto;
`
export const ButtonDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SubmitButton = styled.button`
    background-color: #F37037;
    border: 1px solid #F37037;
    border-radius: 10px;
    color: #fff;
    height: 2rem;
    min-width: 5rem;
    margin: 1rem 0 0.5rem 0;

    &:hover{
    background-color: #efa586;
    box-shadow: 0 0 10px #F37037;
    }
`;

export const DivCloseButton = styled.div`
    box-sizing: border-box;
    margin-left: 94%;
    margin-top: 1rem;
    font-size: 1rem;
    cursor: pointer;
`;

export const EmployeeDetailsModalParent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: auto;

`

export const EmployeeDetailsModal = styled.div`
    position: fixed;
    top: 50%;
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

export const EmployeeDetailsModalText = styled.div`
    font-family: Calibri, Arial, sans-serif;
    word-wrap: break-word;
    display: flex;
    text-align: start;
    
  
`;
export const ViewEmployeeDetailsHeading = styled.div`
    text-align: center;
`;

export const TableContainer2 = styled.div`
`