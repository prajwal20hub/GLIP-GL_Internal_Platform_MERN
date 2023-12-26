import styled from "styled-components";

export const Para = styled.p`
    color: #f37038;
    font-family: Calibri, Arial, sans-serif;
`;

export const ParaNoOfEmployee = styled.p`
    color: #f37038;
    font-family: Calibri, Arial, sans-serif;
    font-size: 2rem;
`;
export const UL = styled.ul`
    text-align: center;
    list-style-type: none;
`;

export const TermsAndConditions = styled.div`
    /* background-color: #424142; */
    overflow: auto;
    position: sticky;
    bottom: 0;
    max-height: 83vh;
    border-radius: 3rem;
    margin-top: 5rem;
    background-color: rgba(255,255,255, 0.92);
    padding: 1rem;

    &::-webkit-scrollbar {
    background: transparent;
    width: 10px;
    };

    &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    }
`;

export const TermsAndConditionsText = styled.div`
    font-family: Calibri, Arial, sans-serif;
    word-wrap: break-word;
    /* display: flex; */
    text-align: start;
`;
export const Li = styled.li`
    color: #fff;
`;
export const FooterA = styled.p`
    font-family: Calibri, Arial, sans-serif;
    text-decoration: none;
    margin-bottom: 1rem;
    color: #fff;
    font-size: 1.1rem;

    &:hover {
        color: #F37037;
    }

`;
export const Button = styled.button`
    color: white;
    text-decoration: none;
`;
export const DivCloseButton = styled.div`
    box-sizing: border-box;
    margin-left: 94%;
    font-size: 1rem;
    cursor: pointer;
`;
export const ButtonTnC = styled.p`
    color: #f37038;
    text-decoration: none;
    cursor: pointer;
    &:hover {
        color: white;
    }
`;
export const ButtonCloseTnC = styled.button`
    color: white;
    background-color: rgb(109, 110, 113);
    align-items: center;
    text-align: center;
    width: 5rem;
    border: none;
    border-radius: 10%;
    /* position: absolute; */
    bottom: 0;
    padding: 0.25rem 1rem 0.25rem 1rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    cursor: pointer;
    &:hover {
        background: #f37038;
    }
`;

export const DivTnC = styled.div`
    text-align: center;
    vertical-align: bottom;
    box-sizing: border-box;
    margin-left: 12rem;
    margin-top: 3rem;
    @media (max-width: 767px) {
        flex-direction: column-reverse;
        margin-left: 4rem;

       
    }
`;
export const Flex = styled.div`
    /* display: flex; */
    padding-top: 1rem;
    background-color: #424142;
    position: fixed;
    bottom: 0px;
    width: 100%;
    margin-left: 0;
    position: relative;
`;

export const BottomDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding-right: 2rem;


    @media (max-width: 767px) {
        flex-direction: column-reverse;
       
    }
`;

export const DivNoE = styled.div`
    text-align: center;
    color: white;
    margin-left: 10rem;
    padding-top: 1.5rem;
    @media (max-width: 767px) {
        margin-left: 5rem;
    }
`;
