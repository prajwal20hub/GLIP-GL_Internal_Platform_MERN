import styled from "styled-components";
import BgImage from '../../../Utils/Images/bg-image.png';

export const FormBackground = styled.div`
    height: 100vh;
    width: 100vw;
    background-image: url(${BgImage});
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
`

export const FormLogo = styled.img`
    width: 8rem;
    height: 8rem;
    margin-top: 2rem;
    margin-left: 2rem;
    border-radius: 2rem;

    :hover {
        /* width: 9rem;
        height: 9rem; */
        box-shadow: rgba(0, 0, 0, 0.8) 0px 5px 15px;
    }
`

export const FormContainer = styled.div`
    background-image: url("https://www.transparenttextures.com/patterns/brushed-alum.png");
    position: fixed;
    width: 35vw;
    max-height: 80vh;
    border: 1px solid rgb(227, 224, 229);
    margin-top: 10vh;
    margin-left: 60vw;
    padding: 0.8rem;
    padding-top: 0;
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

// export const FormHeadDiv = styled.div`
//     background-image: url("https://www.transparenttextures.com/patterns/brushed-alum.png");
//     background-color: rgb(255, 255, 255);
//     border-radius: 2rem;
//     position: sticky;
//     top: 0;
// `

export const FormHeading = styled.p`
    margin-bottom: 1.3rem;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bolder;
    color: #F37037;
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
    width: 94%;
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
    margin-bottom: 1.5rem;
`;

export const SubmitButton = styled.button`
    background-color: #F37037;
    border: 1px solid #F37037;
    border-radius: 10px;
    box-shadow: 0 0 10px #F37037;
    color: #fff;
    height: 2rem;
    min-width: 5rem;
    font-size: large;

    &:hover{
    background-color: #efa586;
    background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
    box-shadow: rgb(53, 3, 99);
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

export const SpanText = styled.p`
    color: #333;
    margin-right: 0.3rem;
    cursor: pointer;
`;

export const FormLinks = styled.p`
    color: #333;
    text-decoration: underline;

    &:hover {
    color: #F37037;
  }
`;




