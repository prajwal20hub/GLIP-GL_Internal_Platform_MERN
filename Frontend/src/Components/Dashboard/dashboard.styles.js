import styled from "styled-components";
import { keyframes } from "styled-components";

export const UserDetails = styled.div`
    font-family: Calibri,Arial,sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
`

export const DashboardMainDiv = styled.div`
    background-color: #e6e7e8;
    box-sizing: border-box;
    overflow: hidden;
    padding-bottom: 10rem;
`

export const DashboardTiles = styled.span`
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
`

export const TileItem = styled.button`
/* text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden; */
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

export const flip = keyframes`
  0% {
		opacity: 0.1;
	}
	100% {
		opacity: 1;
	}
`;

export const Quote = styled.div`
  font-family: Calibri, Arial, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0px 11px 10px rgba(81,67,21,0.5);
  border-radius: 2%;
  color: rgb(245 87 20);
  font-style: italic;
  text-align: start;
  word-wrap: break-word;
  box-sizing: border-box;
  animation-name: ${flip};
  animation-duration: 5s;
  animation-iteration-count: 1;
`;

export const loadingAnimation = keyframes`
 0% { transform: rotate(0deg)}
  25% { transform: rotate(180deg)}
  50% { transform: rotate(180deg)}
  75% { transform: rotate(360deg)}
  100% { transform: rotate(360deg)}
`;

export const loadingAnimationInner = keyframes`
  0% { height: 0%}
    25% { height: 0%}
    50% { height: 100%}
    75% { height: 100%}
    100% { height: 0%}
  `;

export const BeforeAnimationDash = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(109, 110, 113, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SpanAnimationDash = styled.span`
    display: inline-block;
    width: 30px;
    height: 30px;
    position: relative;
    border: 4px solid  rgb(109, 110, 113);
    animation-name: ${loadingAnimation};
    animation-duration: 2s;
    animation-iteration-count: infinite;
`;

export const InnerSpanAnimationDash = styled.span`
    vertical-align: top;
    display: inline-block;
    width: 100%;
    background-color: rgb(245 87 20);
    animation-name: ${loadingAnimationInner};
    animation-duration: 2s;
    animation-iteration-count: infinite;
`;


