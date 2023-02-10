import { Link } from "react-router-dom";

function Wrong() {
  return (
    <div>
      <p>틀렸습니다 ㅜㅡㅜ</p>
      <Link to="/game">
        <p>다시하기</p>
      </Link>
    </div>
  );
}

export default Wrong;
