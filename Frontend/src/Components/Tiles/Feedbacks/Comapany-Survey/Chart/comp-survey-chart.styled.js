import styled from "styled-components";

export const ChartParentDiv = styled.div`
margin-bottom: 2rem;
margin-left: 0;
margin-right: 0;
`;

export const DisplayOptionsDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 65vh;
  flex-direction: column;
`;

export const DisplayChartDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    flex-direction: column;
`;

export const OptionsButton = styled.button`
  width: 85%;
  margin: 0.3rem 0;
  height: 3rem;
  background-color: #E6E7E8;
  border: none;
  font-size:1.2rem;
  color: #414042;
  font-weight: bold;

  &:hover {
        color: #fff;
        background-color: #BCBEC0;
    }
    &:active{
        transform: translateY(1px);
    };
    &:after{
        color: #fff;
        background-color: #BCBEC0;
    }
`;
export const OptionsParent = styled.div`
display: flex;
flex-direction: column;
width: 90%;
justify-content: center;
align-items: center;
  
`;
export const DisplayValues = styled.div`
  margin: 0.3rem 0;
  font-size:1.2rem;
  color: #414042;
  font-weight: bold;
  text-align: center;
`;

export const ParaCount = styled.p`
  color: #F37037;
`;

