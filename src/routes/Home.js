import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <TitleContainer>
        <SubTitle>고려대</SubTitle>
        <Title>지하철게임</Title>
        <SubTitle>안암</SubTitle>
      </TitleContainer>
      <ColorLine />
      <Line>
        <Doors
          onClick={() => {
            navigate("/game");
          }}
        >
          <LeftDoor />
          <RightDoor />
        </Doors>
        <Start>
          <StartText>→</StartText>
        </Start>
      </Line>
      <YellowLine />
    </Container>
  );
}

const leftDoorMove = keyframes`
  0% {
    margin-right: 0px;
  }
  30%{
    margin-right: 0px;
  }
  100% {
    margin-right: 100px;
  }
`;
const RightDoorMove = keyframes`
  0% {
    margin-left: 0px;
  }
  30% {
    margin-left: 0px;
  }
  100% {
    margin-left: 100px;
  }
`;
const Container = styled.div`
  background-color: #e0e0e0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -100px;
  margin-bottom: 10px;
  margin-right: 15px;
`;
const SubTitle = styled.p`
  font-size: 15px;
  font-weight: 700;
  margin-top: 0px;
  margin-bottom: 0px;
  opacity: 0.5;
`;
const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 40px;
  margin-right: 40px;
`;
const ColorLine = styled.div`
  width: 100vw;
  height: 5px;
  background-color: #cd7c2f;
  margin-top: 0px;
  margin-bottom: 5px;
`;
const YellowLine = styled.div`
  width: 100vw;
  height: 30px;
  background-color: #ffc342;
  margin-top: 30px;
`;
const Line = styled.div`
  background-color: black;
  width: 100vw;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-width: 10px;
  border-bottom-width: 10px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-color: black;
  border-style: solid;
`;
const Doors = styled.div`
  cursor: pointer;
  background-color: transparent;
  width: 200px;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: -200px;
  z-index: 100;
`;
const LeftDoor = styled.div`
  background-color: #505050;
  width: 100px;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 5px;
  border-color: black;
  border-style: solid;
  animation: ${leftDoorMove} 2s linear forwards;
`;
const RightDoor = styled.div`
  background-color: #505050;
  width: 100px;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 5px;
  border-color: black;
  border-style: solid;
  animation: ${RightDoorMove} 2s linear forwards;
`;
const Start = styled.div`
  background-color: white;
  width: 200px;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  z-index: 1;
`;
const StartText = styled.p`
  font-size: 40px;
  color: black;
  font-weight: 700;
  z-index: 3;
`;

export default Home;
