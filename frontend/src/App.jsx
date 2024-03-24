import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import SendMoney from "./components/SendMoney";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/send" element={<SendMoney />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
