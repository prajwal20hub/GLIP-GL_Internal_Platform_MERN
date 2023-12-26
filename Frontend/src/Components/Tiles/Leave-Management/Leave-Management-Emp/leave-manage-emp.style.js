import styled from "styled-components";

export const FormHeading = styled.h1`
    margin: 1rem 0;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bolder;
    color: #F37037;
`;

export const LeaveEmpBody = styled.div`
    width: 95vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.5rem 0;
`

export const LightBox = styled.div`
    min-height: 2rem;
    max-width: 18vw;
    margin-bottom: 0.4rem;
    padding: 0.5rem;
    border-radius: 10px 0px 10px 10px;
    background-color: rgba(109, 110, 113, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
`
export const InnerBox = styled.div`
    font-size: 1rem;
    width: 70%;
`

export const Values = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 1rem;
    color: #000;
    font-weight: bolder;
`

export const EmpLeavesReqsTableDiv = styled.div`
    width: 85%;
    margin: 2rem auto 2rem auto; 
`

export const LeaveRecordDiv = styled.div`
    width: 30vw;
`

export const LeaveFormDiv = styled.div`
    width: 55vw;
`
export const DataContainer = styled.div`
    background-image: url("https://www.transparenttextures.com/patterns/brushed-alum.png");
    width: 25vw;
    max-height: 65vh;
    border: 1px solid rgb(227, 224, 229);
    margin: 0.7vh 2vw;
    padding: 1.5rem 3rem;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: auto;

    &::-webkit-scrollbar {
    /* visibility: hidden; */
    background: transparent;
    width: 10px;
    };

    &::-webkit-scrollbar-thumb {
    background: rgba(109, 110, 113, 0.7);
    border-radius: 5px;
    }
`;
export const FormContainer = styled.div`
    background-image: url("https://www.transparenttextures.com/patterns/brushed-alum.png");
    width: 50vw;
    max-height: 55vh;
    border: 1px solid rgb(227, 224, 229);
    margin: 0.7vh 2vw;
    padding: 1.5rem 3rem;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: auto;

    &::-webkit-scrollbar {
    /* visibility: hidden; */
    background: transparent;
    width: 10px;
    };

    &::-webkit-scrollbar-thumb {
    background: rgba(109, 110, 113, 0.7);
    border-radius: 5px;
    }
`;
export const FormInputArea = styled.textarea`
    background-image: url("https://www.transparenttextures.com/patterns/brushed-alum.png");
    border: none;
    border-bottom: 2px solid #6D6E71;
    margin-bottom: 0.1rem;
    height: 5rem;
    padding-left: 0.4rem;
    width: 97%;
    border-radius: 5px;
    margin-bottom: 1.5rem;
    background: transparent;

    &:focus{
        outline: none;
    }
    &::-webkit-scrollbar {
    /* visibility: hidden; */
    background: transparent;
    width: 10px;
    };

    &::-webkit-scrollbar-thumb {
    background: rgba(109, 110, 113, 0.7);
    border-radius: 5px;
    }
`;


export const FormLabel = styled.label`
    color: #333;
`;

export const FormAstric = styled.span`
    color: red;
`;

export const FormInput = styled.input`
    background-image: url("https://www.transparenttextures.com/patterns/brushed-alum.png");
    border: none;
    border-bottom: 2px solid #6D6E71;
    margin-bottom: 0.1rem;
    height: 3rem;
    padding-left: 0.4rem;
    width: 97%;
    border-radius: 5px;
    margin-bottom: 1.5rem;
    background: transparent;

    &:focus{
        outline: none;
    }
`;

export const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.3rem;
`;

export const SubmitButton = styled.button`
    background-color: #F37037;
    border: 1px solid #F37037;
    border-radius: 10px;
    /* box-shadow: 0 0 10px #F37037; */
    color: #fff;
    height: 2rem;
    min-width: 5rem;
    font-size: large;

    margin: 0 0.5rem;

    &:hover{
    background-color: #efa586;
    box-shadow: 0 0 10px #F37037;
    background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
    }
`;

export const ErrorMessage = styled.span`
    text-align: center;
    color: rgb(95, 3, 3);
    background-color: rgba(246, 86, 86, 0.6);
    padding: 0.2rem 0.7rem;
    border-radius: 5px;
    max-width: 40vw;
`;

export const LinksDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -0.7rem ;
`;

export const FormLinks = styled.p`
    color: #333;

    &:hover {
    color: #F37037;
  }
`;

/* ------------------------------------------------- */

export const ViewDetailsDiv = styled.div`
    width: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
    display: flex;
`;

export const LeaveDetailsModalDiv = styled.div`
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

export const DivCloseButtonDiv = styled.div`
    box-sizing: border-box;
    margin-left: 90%;
    font-size: 1rem;
    cursor: pointer;
`;

export const LeaveDetailsHeadingDiv = styled.div`
    font-family: Calibri, Arial, sans-serif;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
`;



