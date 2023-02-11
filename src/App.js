import { Routes, Route } from "react-router-dom";
import Game from "./routes/Game";
import Home from "./routes/Home";
import Wrong from "./routes/Wrong";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/wrong" element={<Wrong />} />
    </Routes>
  );
}
export default App;
