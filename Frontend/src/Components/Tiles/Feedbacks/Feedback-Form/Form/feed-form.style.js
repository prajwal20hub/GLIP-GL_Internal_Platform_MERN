import styled from "styled-components";

export const FeedFormBody = styled.div`
    width: 100vw;
    max-height: 90vh;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    margin: 1.5rem 0
`

export const FormContainer = styled.div`
    background-image: url("https://www.transparenttextures.com/patterns/brushed-alum.png");
    width: 58vw;
    max-height: 70vh;
    border: 1px solid rgb(227, 224, 229);
    margin: 0 2vw;
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

export const FormHeading = styled.h1`
    margin: 0.5rem 0;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bolder;
    color: #F37037;
`;

export const FormLabel = styled.label`
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
`;

export const FormAstric = styled.span`
    color: red;
    font-weight: bold;
    font-size: 1.1rem;
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




