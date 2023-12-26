import styled from "styled-components";

export const AccessTableDiv = styled.div`
    width: 85%;
    margin: 2rem auto 2rem auto; 
`

export const AccessDetailsModalDiv = styled.div`
display: flex;
justify-content: center;
  width: 50vw;
  height: 85vh;
  margin: auto;
  margin-top: 15vh;
  border: none;
  padding: 4rem;

    @media (max-width: 767px) {
        width: 40rem;
    }
`;

export const AccessDetailsHeadingDiv = styled.div`
    font-family: Calibri, Arial, sans-serif;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
`;

export const FormHeading = styled.h1`
    margin: 1rem 0;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bolder;
    color: #F37037;
`;  

export const ViewDetailsDiv = styled.div`
width: 100%;
height: 100%;
z-index: 999;
background-color: rgba(0, 0, 0, 0.5);
pointer-events: auto;
`;



export const DivCloseButtonDiv = styled.div`
    box-sizing: border-box;
    margin-left: 90%;
    font-size: 1rem;
    cursor: pointer;
`;

