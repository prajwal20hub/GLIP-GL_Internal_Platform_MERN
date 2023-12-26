import styled from 'styled-components'

export const TasksTableDiv = styled.div`
    width: 85%;
    margin: 2rem auto 2rem auto; 
`

export const TaskDetailsModalDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 45vw;
  height: 45vh;
  margin: auto;
  margin-top: 15vh;
  border: none;
  padding: 4rem;

    @media (max-width: 767px) {
        width: 40rem;
    }
`;

export const TaskDetailsHeadingDiv = styled.div`
    font-family: Calibri, Arial, sans-serif;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
`;