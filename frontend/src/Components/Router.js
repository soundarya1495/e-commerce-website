import React from "react";
import { Route ,Routes, BrowserRouter} from "react-router-dom";


import Home from "./Home";
import Cart from "./cart";

const Router = () =>{
    return(
    <Routes>
        <Route exact path ="/" element ={<Home />}/>
        <Route  path ="/home" element ={<Home />}/>
    </Routes>
    )
}

export default Router;
