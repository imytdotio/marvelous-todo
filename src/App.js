import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./Page/Home";
import { Todo } from "./Page/Edit";
function App() {
  return (
    <div className="App m-8">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          {/* <Route path="/:id" element={<Todo />} exact /> */}
          <Route path="/:id" element={<Todo />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
