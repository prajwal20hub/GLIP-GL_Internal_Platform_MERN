import styled from "styled-components";

export const AccessEmpBody = styled.div`
    width: 100vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.5rem 0
`;

export const AccessDetailsModalDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 50vw;
    max-height: 75vh;
    margin: 76% auto 0 auto;
    border: none;
    padding: 4rem;
    @media (max-width: 767px) {
        width: 40rem;
    }
`;

export const EmpAccessReqsTableDiv = styled.div`
    width: 85%;
    margin: 2rem auto 2rem auto; 
`;

export const AccessDetailsHeadingDiv = styled.div`
    font-family: Calibri, Arial, sans-serif;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
`;