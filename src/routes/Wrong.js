import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import DeveloperPage from "../components/developerPage/developerPage.component";

function Wrong() {
  const [clicked, setClicked] = useState(false);
  const location = useLocation();
  const visitedStations = location?.state?.value ?? [];
  console.log(visitedStations);

  const navigate = useNavigate();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return (
    <Container>
      {visitedStations.length > 0 && (
        <Ticket>
          <TicketTop>
            <TicketTopText>승차권</TicketTopText>
          </TicketTop>
          <TicketContents>
            <TicketLeft>
              <StationText>{visitedStations[0]}</StationText>
            </TicketLeft>
            <TicketCenter>
              <TicketCenterText>▶</TicketCenterText>
            </TicketCenter>
            <TicketRight>
              <StationText>
                {visitedStations[visitedStations.length - 1]}
              </StationText>
            </TicketRight>
          </TicketContents>
          <TicketBottom>
            <TicketBottomText>
              {year}년 {month}월 {day}일
            </TicketBottomText>
            <TicketBottomText>
              {visitedStations.length}개역 이동
            </TicketBottomText>
          </TicketBottom>
        </Ticket>
      )}
      <Button
        variant="contained"
        style={{
          width: "200px",
          color: "black",
          backgroundColor: "#c8d6a4",
          boxShadow: "0px 0px 0px 0px",
          borderRadius: "10px",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        다시하기
      </Button>
      <p
        onClick={() => {
          setClicked(true);
        }}
      >
        개발자에게 관심 주기
      </p>
      {clicked ? <DeveloperPage setClicked={setClicked} /> : null}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Ticket = styled.div`
  width: 80vw;
  height: 35vw;
  background-color: #f1f6e9;
  box-shadow: 0px 10px 30px #c8d6a490;
  border-radius: 4vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 50px;
`;
const TicketTop = styled.div`
  width: 80vw;
  height: 5vw;
  background-color: #c8d6a4;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const TicketTopText = styled.p`
  font-size: 2.5vw;
  margin-top: 0px;
  margin-bottom: 0px;
  color: black;
`;
const TicketBottom = styled.div`
  width: 80vw;
  height: 10vw;
  background-color: #c8d6a4;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const TicketBottomText = styled.p`
  font-size: 2.5vw;
  margin-top: 0px;
  margin-bottom: 0px;
  color: black;
  padding-left: 5vw;
  padding-right: 5vw;
`;
const TicketContents = styled.div`
  width: 80vw;
  height: 20vw;
  display: flex;
  flex-direction: row;
`;
const TicketLeft = styled.div`
  width: 37.5vw;
  height: 20vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const TicketCenter = styled.div`
  width: 5vw;
  height: 20vw;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TicketCenterText = styled.p`
  font-size: 5vw;
`;
const TicketRight = styled.div`
  width: 37.5vw;
  height: 20vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const StationText = styled.p`
  font-size: 4vw;
  font-weight: 700;
  white-space: nowrap;
  display: inline-block;
  text-align: center;
`;
export default Wrong;
