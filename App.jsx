import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Movie from "./Pages/Movie";
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* default page / or index */}
        <Route path="/" element={<Home/>}/>
        <Route path="/movie" element={<Movie/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;