import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/game">
        <p>게임하기</p>
      </Link>
    </div>
  );
}

export default Home;
