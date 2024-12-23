import { BrowserRouter, Routes, Route } from "react-router-dom";
import path from "./path/path";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
      <Header />
        <Routes>
          {Object.values(path).map((p, index) => (
            <Route key={index} path={p.path} element={<p.component />} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
