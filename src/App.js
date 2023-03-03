import {
    RouterProvider
} from "react-router-dom";
import React, {Fragment} from "react";
import router from "./routes/router";
import {ToastContainer, cssTransition} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "animate.css/animate.min.css";

function App() {

    const animation = cssTransition({
        enter: 'animate__animated animate__bounceIn',
        exit: 'animate__animated animate__bounceOut',
    })
    return (
        <Fragment>
            <RouterProvider router={router}/>
            <ToastContainer
                theme={'dark'}
                draggable
                transition={animation}
            />
        </Fragment>
    );
}

export default App;
