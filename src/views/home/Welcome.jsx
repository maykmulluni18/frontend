import React from "react";
import { useSelector } from "react-redux";
import "./everybody.scss";
import "./welcome.css"
const Welcome = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="Container">
            <div className="listtitle">
                Bienvenido al Sub - Almacen central
                
            </div>
            <div className="listtitle_1">
                <p><strong>{user && user.nombre}</strong></p> 
            </div>
        </div>
        
    )
}

export default Welcome;
