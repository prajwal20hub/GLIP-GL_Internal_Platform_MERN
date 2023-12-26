import styled from "styled-components";

export const FeedbackHomeDiv = styled.div`
  min-height: 100vh;
`

export const DashboardMainDiv = styled.div`
  background-color: #e6e7e8;
  min-height: 76.5vh;
  box-sizing: border-box;
  overflow: hidden;
`

export const DashboardTiles = styled.span`
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  margin-top: 15vh;
`

export const TileItem = styled.button`
  border: none;
  min-width: 17vw;
  min-height: 23vh;
  background-color:  rgba(109, 110, 113, 0.8);
  padding: 1.5rem;
  font-size: 2rem;
  text-align: center;
  border-radius: 1rem;
  color: white;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  &:hover {
    background-color: rgb(245 87 20);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }    
    &:active{
        transform: translateY(4px);
    };
`;

export const FooterDiv = styled.div `
  margin-top: auto;
`