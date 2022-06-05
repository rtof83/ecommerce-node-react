import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import Context from "./Context";

const Header = () => {
    // const [ data, setData ] = useContext(Context);

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">

                {/* <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>                        
                </button> */}

                <Link to={'/'}>
                    <div className="navbar-brand">EnaFood</div>
                </Link>

                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                    {/* <li className="active"><a>Home</a></li> */}
                    <li><Link to={'/customer'}>Clientes</Link></li>
                    <li><Link to={'/product'}>Produtos</Link></li>
                    <li><Link to={'/listCust'}>Lista Clientes</Link></li>
                    <li><Link to={'/listProd'}>Lista Produtos</Link></li>
                    <li><Link to={'/listOrder'}>Lista Pedidos</Link></li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                    <li><Link to={'/cart'}><span className="glyphicon glyphicon-shopping-cart"></span></Link></li>
                    <li><Link to={'/login'}><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
                </div>
            </div>
        </nav>
    )
};

export default Header;