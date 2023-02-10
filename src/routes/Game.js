import { useState, useEffect } from "react";
import Subways from "../api/subwaysApi.json";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
let visitedStations = [];
let timer;
let nowLine = "";
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
  "경춘선",
  "경강선",
  "김포도시철도",
  "서해선",
  "용인경전철",
  "의정부경전철",
];

function Game() {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("환승안함");
  const [line, setLine] = useState("02호선");
  const [station, setStation] = useState("");
  const [subtext, setSubText] = useState("");
  const [player, setPlayer] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    visitedStations = [];
    const firstLine = lines[1 + Math.floor(Math.random() * 13)];
    setLine(firstLine);
    nowLine = firstLine;
  }, []);

  useEffect(() => {
    clearTimeout(timer);
    if (player === 0) {
      timer = setTimeout(() => {
        // alert("시간 초과");
        navigate("/timeover");
      }, 8000);
    }
  }, [player, navigate]);

  const checkIfCorrect = () => {
    setSubText("");
    const result = Subways.DATA.filter(
      (data) =>
        data.line_num === nowLine &&
        data.station_nm === input &&
        !visitedStations.includes(data.station_nm)
    );
    if (result.length > 0) {
      const result2 = Subways.DATA.filter(
        (data) =>
          data.line_num === select && data.station_nm === result[0].station_nm
      );
      if (select !== "환승안함" && result2.length === 0) return false;
      if (input === "신촌" && select !== "환승안함") return false;
      setStation(input);
      visitedStations.push(input);
      if (select !== "환승안함") {
        setLine(select);
        nowLine = select;
        setSubText(`에서 ${select} 환승`);
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
        if (nowLine !== newLineStation.line_num)
          setSubText(`에서 ${newLineStation.line_num} 환승`);
        setLine(newLineStation.line_num);
        nowLine = newLineStation.line_num;
      }
    }
    setStation(newStation.station_nm);
    visitedStations.push(newStation.station_nm);
  };
  return (
    <div>
      <p>{player}</p>
      <p>{line}</p>
      <p>
        {station}
        {subtext}
      </p>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <select
        onChange={(e) => {
          setSelect(e.target.value);
        }}
        value={select}
      >
        {lines
          .filter((v) => v !== line)
          .map((v) => (
            <option value={v}>{v}</option>
          ))}
      </select>
      <button
        onClick={() => {
          const correct = checkIfCorrect();
          setInput("");
          setSelect("환승안함");
          if (!correct) {
            clearTimeout(timer);
            // alert("틀렸습니다.");
            navigate("/wrong");
            return;
          }
          let count = 0;
          setPlayer(1);
          let loop = setInterval(() => {
            count++;
            setPlayer((count + 1) % 4);
            if (count >= 3) clearInterval(loop);
            calculateNext();
          }, 3000);
        }}
      >
        확인
      </button>
      {player === 0 && <Timer />}
    </div>
  );
}

const timeDecrease = keyframes`
  0% {
    width: 100px;
  }
  100% {
    width: 0px;
  }
`;
const Timer = styled.div`
  width: 100px;
  height: 20px;
  background-color: black;
  animation: ${timeDecrease} 8s linear;
`;

export default Game;
