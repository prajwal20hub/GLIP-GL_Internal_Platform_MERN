import styled from "styled-components";

export const NavContainer = styled.div`
    min-height: 5rem;
    border: none;
    background-color: #BCBEC0;
    box-shadow: 0 0 10px #F37037;

    &:hover {
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 10px rgb(3, 0, 6);
    }
`;

export const NavHeadingDiv = styled.div`
    display: flex;
    float: left;
    padding: 0.3rem;
    padding-bottom: 0;
    color: rgb(35, 3, 64);
`;

export const NavLogo = styled.img`
    margin-right: 0.4rem;
    width: 4rem;
    height: 4rem;
    border-radius: 15px;
    margin-left: 2%;

    &:hover {
        width: 4.2rem;
        height: 4.2rem;
    }
`

export const NavHeading = styled.h1`
    color: #fff;
    padding: 0.5rem;

    &:hover {
    color: #F37037;
    }
`
export const NavButtonDiv = styled.div`
    padding-top: 1.1rem;
    float: right;
    /* display: flex; */
`;

export const NavButton = styled.button`
    background-color: #F37037;
    border: 1px solid #F37037;
    border-radius: 10px;
    /* box-shadow: 0 0 10px #F37037; */
    color: #fff;
    font-size: 1.2rem;
    height: 2.2rem;

    margin: 0.5rem ;
    padding: auto;
    border-top-right-radius: 0px;

    &:hover {
        height: 2.3rem;
        background-color: #efa586;
        box-shadow: 0 0 10px #F37037;
    }
`;

//-----------------------GK---------------------------------------------

export const IconButton = styled.button`
          border-radius: 50%;
          background-color: #f37038;
          margin-right:5px;
          color:white;
          cursor: pointer;
          padding: 7px;
`;

export const SettingDiv = styled.div`
    position: absolute;
    max-height: 10vh;
    top: 5rem;
    right: 5rem;
    width: 200vw;
    inline-size:250px;
    /* box-shadow: 0 10px 5px rgba(0, 0, 0 ); */
    overflow-wrap: break-word;
    height: 50vh;
    background-color: rgba(245 87 20);
    padding: 10px;
    border: 0px;
    background-color:  rgba(245, 87, 20, 0.8);
    padding: 2.5rem 0rem;
    font-size: 2rem;
    text-align: center;
    animation: showMe 0.3s forwards;
    z-index: 1000;

  @keyframes showMe{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
`;

export const Text = styled.h5`
    font-size:1.5rem;

`;

export const NavLinkSpan = styled.span`
    display:flex;
    /* justify-content:space-between; */
    align-items:center;
    font-size:0.8rem;
    &:hover {

    }
   
`



