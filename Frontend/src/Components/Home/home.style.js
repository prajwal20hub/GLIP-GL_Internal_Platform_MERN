import styled from "styled-components";

export const DivMainHome = styled.div`
    background:rgba(188, 190, 192, 0.2);
`
export const DivMainHomeCarousel = styled.div`
    padding-bottom: 1rem;

    @media (max-width: 767px) {
        display: none;
    }
`

export const ImgCarousel = styled.img`
height: 85vh;
width: 100%;
object-fit: cover;
`

export const DivBodyHome = styled.p`
font-family: Calibri, Arial, sans-serif;
padding-left: 8%;
padding-top: 10%;
padding-bottom: 10%;
padding-right: 8%;
font-weight: bold;
`

export const PHomeTaglineGL1 = styled.span`
    font-size: 3.3rem;
    font-size: 3rem;
`

export const PHomeTaglineGL2 = styled.span`
color: #EE9F41;
font-size: 3.3rem;
font-size: 3rem;

`
export const PHomeTaglineGL2Letters = styled.span`
 cursor: pointer;
  &:hover {
    color: #F37037;
}
`

export const PHomeTagDescription = styled.p`
font-size: 1.2rem;
`
