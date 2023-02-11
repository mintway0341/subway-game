import { useState, useEffect } from "react";
import Subways from "../api/subwaysApi.json";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select, TextField, Button } from "@mui/material";
import TextTransition, { presets } from "react-text-transition";
let visitedStations = [];
let timer;
let nowLine = "";
let countCorrect = 0;
const lines = [
  "환승안함",
  "01호선",
  "02호선",
  "03호선",
  "04호선",
  "05호선",
  "06호선",
  "07호선",
  "08호선",
  "09호선",
  "수인분당선",
  "신분당선",
  "공항철도",
  "경의선",
  "신림선",
  "인천선",
  "인천2호선",
  "우이신설경전철",
  // "경춘선",
  // "경강선",
  // "김포도시철도",
  // "서해선",
  // "용인경전철",
  // "의정부경전철",
];

function Game() {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("환승안함");
  const [line, setLine] = useState("");
  const [station, setStation] = useState("시작해주세요");
  const [subtext, setSubText] = useState("");
  const [player, setPlayer] = useState(0);
  const colors = {
    "01호선": "#0052A4",
    "02호선": "#00A84D",
    "03호선": "#EF7C1C",
    "04호선": "#00A5DE",
    "05호선": "#996CAC",
    "06호선": "#CD7C2F",
    "07호선": "#747F00",
    "08호선": "#E6186C",
    "09호선": "#BDB092",
    수인분당선: "#FABE00",
    신분당선: "#D31145",
    공항철도: "#0065B3",
    경의선: "#77C4A3",
    신림선: "#6789CA",
    인천선: "#759CCE",
    인천2호선: "#F5A251",
    우이신설경전철: "#B7C450",
    경춘선: "#178C72",
    경강선: "#0054A6",
    김포도시철도: "#AD8605",
    서해선: "#8FC31F",
    용인경전철: "#56AD2D",
    의정부경전철: "#FD8100",
  };
  const realLines = {
    환승안함: "환승안함",
    "01호선": "1호선",
    "02호선": "2호선",
    "03호선": "3호선",
    "04호선": "4호선",
    "05호선": "5호선",
    "06호선": "6호선",
    "07호선": "7호선",
    "08호선": "8호선",
    "09호선": "9호선",
    수인분당선: "수인분당선",
    신분당선: "신분당선",
    공항철도: "공항철도",
    경의선: "경의중앙선",
    신림선: "신림선",
    인천선: "인천1호선",
    인천2호선: "인천2호선",
    우이신설경전철: "우이신설선",
  };

  const players = [0, 1, 2, 3];

  const navigate = useNavigate();

  useEffect(() => {
    visitedStations = [];
    countCorrect = 0;
    const firstLine = lines[1 + Math.floor(Math.random() * 13)];
    setLine(firstLine);
    nowLine = firstLine;
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    clearTimeout(timer);
    if (player === 0) {
      timer = setTimeout(() => {
        // alert("시간 초과");
        navigate("/wrong", { state: { value: visitedStations } });
        console.log(countCorrect);
      }, 10000);
    }
  }, [player, navigate]);

  const handleClick = () => {
    const correct = checkIfCorrect();
    setInput("");
    setSelect("환승안함");
    if (correct) countCorrect++;
    if (!correct) {
      clearTimeout(timer);
      // alert("틀렸습니다.");
      navigate("/wrong", { state: { value: visitedStations } });
      console.log(countCorrect);
      return;
    }
    let count = 0;
    setPlayer(1);
    let loop = setInterval(() => {
      count++;
      setPlayer((count + 1) % 4);
      if (count >= 3) clearInterval(loop);
      calculateNext();
    }, 2500);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleClick();
  };
  const checkIfCorrect = () => {
    setSubText("");
    var result = Subways.DATA.filter(
      (data) =>
        data.line_num === nowLine &&
        data.station_nm === input &&
        !visitedStations.includes(data.station_nm)
    );
    if (input === "이수") {
      result = Subways.DATA.filter(
        (data) =>
          data.line_num === nowLine &&
          data.station_nm === "총신대입구" &&
          !visitedStations.includes(data.station_nm)
      );
    }
    if (result.length > 0) {
      const result2 = Subways.DATA.filter(
        (data) =>
          data.line_num === select && data.station_nm === result[0].station_nm
      );
      if (select !== "환승안함" && result2.length === 0) return false;
      if (input === "신촌" && select !== "환승안함") return false;
      setStation(input);
      visitedStations.push(input === "이수" ? "총신대입구" : input);
      if (select !== "환승안함") {
        setLine(select);
        nowLine = select;
        setSubText(`에서 ${realLines[select]} 환승`);
      }
      return true;
    }
    return false;
  };
  const calculateNext = () => {
    setSubText("");
    console.log(nowLine);
    const result = Subways.DATA.filter(
      (data) =>
        data.line_num === nowLine && !visitedStations.includes(data.station_nm)
    );
    if (result.length === 0) {
      // 종료
    }
    console.log(result.length);
    const newStation = result[Math.floor(Math.random() * result.length)];
    console.log(newStation);
    const transferStations = Subways.DATA.filter(
      (data) =>
        data.station_nm === newStation.station_nm && data.line_num !== nowLine
    );
    console.log(transferStations);
    if (transferStations.length > 0 && newStation.station_nm !== "신촌") {
      const willTransfer = Math.random() >= 0.55 ? 1 : 0;
      if (willTransfer) {
        const newLineStation =
          transferStations[Math.floor(Math.random() * transferStations.length)];
        if (
          nowLine !== newLineStation.line_num &&
          lines.includes(newLineStation.line_num)
        ) {
          setSubText(`에서 ${realLines[newLineStation.line_num]} 환승`);
          setLine(newLineStation.line_num);
          nowLine = newLineStation.line_num;
        }
      }
    }
    setStation(newStation.station_nm);
    visitedStations.push(newStation.station_nm);
  };
  return (
    <div>
      {player === 0 ? <Timer color={colors[nowLine]} /> : <NoTimer />}
      <MainContainer>
        <PlayersContainer>
          {players.map((v) =>
            v === player ? (
              <Player color={colors[nowLine]}></Player>
            ) : (
              <NotPlayer color={colors[nowLine]}></NotPlayer>
            )
          )}
        </PlayersContainer>
        <LineNumber color={colors[nowLine]}>{realLines[line]}</LineNumber>
        <Box color={colors[nowLine]} />
        <Circle color={colors[nowLine]}>
          <StationName
            springConfig={presets.wobbly}
            // inline={true}
            color={colors[nowLine]}
          >
            {station}
          </StationName>
          <SubText color={colors[nowLine]}>{subtext}</SubText>
        </Circle>
        {player === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Inputs onKeyDown={handleKeyPress}>
              <TextField
                autoFocus
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                style={{ width: "160px" }}
              />
              <Select
                style={{ marginLeft: "10px", width: "130px" }}
                onChange={(e) => {
                  setSelect(e.target.value);
                }}
                value={select}
              >
                {lines
                  .filter((v) => v !== line)
                  .map((v) => (
                    <MenuItem value={v}>{realLines[v]}</MenuItem>
                  ))}
              </Select>
            </Inputs>
            <Button
              variant="contained"
              style={{
                width: "200px",
                marginTop: "10px",
                backgroundColor: colors[nowLine],
                boxShadow: "0px 0px 0px 0px",
                borderRadius: "10px",
              }}
              onClick={handleClick}
            >
              확인
            </Button>
          </div>
        )}
      </MainContainer>
    </div>
  );
}

const timeDecrease = keyframes`
  0% {
    width: 100vw;
  }
  100% {
    width: 0px;
  }
`;
const Timer = styled.div`
  width: 100vw;
  height: 20px;
  background-color: ${(props) => props.color};
  animation: ${timeDecrease} 10s linear;
  position: absolute;
  bottom: 0;
`;
const NoTimer = styled.div`
  width: 100vw;
  height: 20px;
  background-color: transparent;
  position: absolute;
  bottom: 0;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PlayersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`;
const Player = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 18.75px;
  background-color: ${(props) => props.color};
`;
const NotPlayer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 15px;
  background-color: ${(props) => props.color};
  opacity: 0.3;
`;
const Box = styled.div`
  width: 100vw;
  height: 50px;
  margin-top: 200px;
  margin-bottom: -170px;
  background-color: ${(props) => props.color};
`;
const Circle = styled.div`
  width: 250px;
  height: 250px;
  background-color: white;
  border-width: 20px;
  border-color: ${(props) => props.color};
  border-style: solid;
  border-radius: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 0;
`;
const LineNumber = styled.p`
  color: ${(props) => props.color};
  font-size: 20px;
  z-index: 10;
  margin-top: 100px;
  margin-bottom: -160px;
`;
const StationName = styled(TextTransition)`
  color: ${(props) => props.color};
  font-size: 28px;
  font-weight: 700;
  margin-top: 0px;
  margin-bottom: 0px;
  white-space: nowrap;
  display: inline-block;
  text-align: center;
`;
const SubText = styled.p`
  color: ${(props) => props.color};
  font-size: 15px;
  margin-top: 0px;
  margin-bottom: 0px;
`;
const Inputs = styled.div`
  flex-direction: row;
  margin-top: 20px;
  flex: 1;
`;

export default Game;
