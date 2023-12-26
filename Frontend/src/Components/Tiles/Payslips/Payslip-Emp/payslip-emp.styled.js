import styled from "styled-components";

export const FormHeading = styled.h1`
    margin: 1rem 0;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bolder;
    color: #F37037;
`;

export const ParentPayslipEmpDiv = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
`;

export const ComponentsParentPayslipEmpDiv = styled.div`
    display: flex;
    justify-content: space-around;
    font-family: Calibri, Arial, sans-serif;
    
    @media (max-width: 767px) {
        flex-direction: column;
    }
`;
export const ComponentPayslipEmpDiv1 = styled.div`
    width: 35rem;
    margin: 2rem 2rem 2rem 4rem;
    border: 2px solid #BCBEC0;
    box-shadow: 0.5rem 0.5rem 0 #BCBEC0;

    @media (max-width: 767px) {
        width: 90%;
        margin: 2rem 5%;
        padding: 1rem 2rem;
    }
`;
export const ComponentPayslipEmpDiv2 = styled.div`
    width: 70rem;
    margin: 2rem 4rem 2rem 1rem;
    border: 2px solid #BCBEC0;
    box-shadow: 0.5rem 0.5rem 0 #BCBEC0;

    @media (max-width: 767px) {
        width: 90%;
        margin: 2rem 5%;
        padding: 1rem 2rem;
    }
`;

export const Component1HeadingDiv = styled.div`
    /* color: #414042; */
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    background-color: #fff;
    margin: 0.7rem;
`;

export const Component1BodyDiv = styled.div`
    padding: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 1.2rem;
    background-color: #fff;
    letter-spacing: 0.1rem;
`;

export const Component2BodyDiv = styled.div`
    display: flex;
    padding: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 1.2rem;
    background-color: #fff;
    letter-spacing: 0.1rem;
    @media (max-width: 650px) {
        width: 100%;
        /* margin: 2rem 5%; */
        padding: 1rem 0rem;
        flex-direction: column;
    }
`;

export const Component2HeadingDiv = styled.div`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    background-color: #fff;
    margin: 0.7rem;
`;

export const PayslipEmpPreviewButton = styled.button`
    background-color: #F37037;
    border: 1px solid #F37037;
    border-radius: 6px;
    /* box-shadow: 0 0 10px #F37037; */
    color: #fff;
    height: 2rem;
    min-width: 5rem;
    font-size: large;
    margin: 0.5rem 0.5rem;
    &:hover{
    /* background-color: #efa586; */
    box-shadow: 0 0 5px #F37037;
    }
    &:active{
        transform: translateY(1px);
    };
`;

export const PayslipEmpDownloadButton = styled.button`
  background-color: #F37037;
    border: 1px solid #F37037;
    border-radius: 6px;
    /* box-shadow: 0 0 10px #F37037; */
    color: #fff;
    height: 2rem;
    min-width: 5rem;
    font-size: large;
    margin: 0.5rem 0.5rem;
    &:hover{
    /* background-color: #efa586; */
    box-shadow: 0 0 5px #F37037;
    }
    &:active{
        transform: translateY(1px);
    };
`;

export const InfoP = styled.p`
    background-color: #E6E7E8;
    border: 1px;
    border-radius: 4px;
    padding: 1rem;
    overflow-wrap: break-word;
    &:hover{
        background-color: #BCBEC0;
    }
   
`;

export const ComponentsButton = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Component2BodyChild1Div = styled.div`
    margin: 0.5rem auto;
    /* width: 35%; */
    display: grid;
    justify-content: center;
    @media (max-width: 650px) {
        width: 90%;
        margin: 2rem 5%;
        padding: 1rem 2rem;
    }
`;

export const Component2BodyChild2Div = styled.div`
    width: 40%;
    margin: 0.5rem 1rem;
    @media (max-width: 650px) {
        width: 90%;
        margin: 2rem 5%;
        padding: 1rem 2rem;
    }
`;

export const PayslipEmpSubmitButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F37037;
    border: 1px solid #F37037;
    border-radius: 6px;
    /* box-shadow: 0 0 10px #F37037; */
    color: #fff;
    height: 2rem;
    width: 15rem;
    font-size: large;
    margin: 0.5rem auto;
    &:hover{
    /* background-color: #efa586; */
    box-shadow: 0 0 5px #F37037;
    cursor: pointer;
    }
    &:active{
        transform: translateY(1px);
    };
   
`;

export const CurrentYearDiv = styled.div`
    display: flex;
    align-items: center;
`;

export const CurrentYearLable = styled.div`
    margin-left: 1rem;
    font-weight: 400;
`;

export const NotAvailableErrorDiv = styled.div`
    text-align: center;
    color: rgb(95, 3, 3);
    background-color: rgba(246, 86, 86, 0.8);
    border-radius: 5px;
`;

export const ShowMonthYearDiv = styled.div`
    /* text-align: center; */
    margin-bottom: 0.5rem;
    /* border: solid 0.1rem #F37037; */
    /* width: 6rem; */
`;

export const PdfParentDiv = styled.div`
 /* text-align: center; */
width: 100;
/* height: 100vh; */

`;

export const DivCloseButtonDiv = styled.div`
    box-sizing: border-box;
    margin-left: 94%;
    font-size: 1rem;
    cursor: pointer;
`;

export const TransportDetailsModalDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 50rem;
    height: 83vh;

    margin: auto;
    background-color: 'background.paper';
    border: '2px solid #000';
    padding: 4rem;
    &::-webkit-scrollbar {
        background: transparent;
        width: 10px;
    };
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 5px;
    }
    @media (max-width: 767px) {
        width: 40rem;
    }
`;

export const ViewTransportDetailsHeadingDiv = styled.div`
    font-family: Calibri, Arial, sans-serif;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
`;

export const ViewDetailsSpan = styled.span`
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
`;