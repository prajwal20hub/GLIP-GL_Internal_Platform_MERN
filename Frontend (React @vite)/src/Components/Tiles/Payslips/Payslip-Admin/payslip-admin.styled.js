import styled from 'styled-components'

export const TableHeading = styled.h1`
    margin: 1rem 0 -2rem 0;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bolder;
    color: #F37037;
`;

export const PayslipAdminTable = styled.div`
    width: 80%;
    margin: 4rem auto 0 auto; 
`

export const DivCloseButton = styled.div`
    box-sizing: border-box;
    margin-left: 94%;
    font-size: 1rem;
    cursor: pointer;
`;

export const PayslipDetailsModal = styled.div`
    display: flex;
    justify-content: center;
    width: 45vw;
    max-height: 70vh;
    margin: auto;
    margin-top: 15vh;
    background-color: 'background.paper';
    border: none;
    padding: 4rem;
    z-index: 1000;
    @media (max-width: 767px) {
        width: 40rem;
    }
`;

export const DivViewDetails = styled.span`
width: 100%;
height: 100%;
z-index: 999;
background-color: rgba(0, 0, 0, 0.5);
pointer-events: auto;
`;

export const ViewPayslipDetailsHeading = styled.div`
    font-family: Calibri, Arial, sans-serif;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
`;

export const ButtonSubmitData = styled.button`
    background-color: #f37037;
    border: 1px solid #f37037;
    border-radius: 10px;
    color: #fff;
    height: 2rem;
    min-width: 5rem;
    font-size: large;
    margin: 1rem 0 0.5rem 0;

    &:hover {
      background-color: #efa586;
      box-shadow: 0 0 10px #f37037;
    }
`;

export const SubmitButtonDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: auto;`