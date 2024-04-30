import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Contacts from "./pages/Contacts/Contacts";
import NotFound from "./pages/NotFound/NotFound";
import MainLayout from "./layouts/MainLayout";
import Products from "./pages/Products/Products";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
