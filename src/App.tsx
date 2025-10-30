import Login from "../src/screens/Login";
import Main from "../src/screens/Main";
import Agenda from "../src/screens/Agenda";
import Suporte from "../src/screens/Suporte";
import Prontuario from "../src/screens/Prontuario";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../src/screens/Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Main />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/prontuario" element={<Prontuario />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
