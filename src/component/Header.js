import React from "react";
import "../Style/Header.css";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory} from 'react-router-dom';

function Header() {

    const loadHome = () => {
        history.push('/home');
    }
    const history = useHistory();

    return (
        <div id="header">
            <div id="nav-left">
                <div className="nav-logo" onClick = {() => loadHome()}>
                    <span id="nav-logo-sprites"></span>
                    <span id="nav-logo-locale">.in</span>
                </div>

                <div className="nav-global-location">
                    <div id="nav-location-sprite" ></div>
                    <div id="nav-address">
                        <span>Deliver to Aravind</span>
                        <span className="address">Chennai 600072</span>
                    </div>
                </div>
            </div>


            <div className="nav-fill">
                <div className="nav-search-field"><input type="text" className="nav-input"/></div>
                <div className="nav-search"><SearchIcon fontSize="large"/></div>
            </div>



            <div id="nav-right">
                <div className="nav-accounts">
                    <span>Hello Aravind</span>
                    <span>Account & lists</span>
                </div>
                <div className="nav-order">
                    <span>Returns</span>
                    <span>& Orders</span>
                </div>
                <div className="nav-cart">
                    <MenuItem>
                        <IconButton aria-label="show 11 new notifications" color="inherit">
                            <Badge badgeContent={11} color="secondary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                        <p>cart</p>
                    </MenuItem>
                </div>
            </div>
        </div>
    );
};


export default Header;