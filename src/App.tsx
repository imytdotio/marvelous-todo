import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="p-2 lg:w-1/3 md:w-2/3 w-full m-auto">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
