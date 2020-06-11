import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Hidden } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { isUserLoggedIn, logout, getUserRole } from '../../service/authService';
import { Link } from 'react-router-dom';


const Header = (props) => {

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            justifyContent: "space-between",
        },
        link: {
            flexGrow: 1,
        },
    }));

    const linkStyle = {
        textDecoration: 'none'
    }

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutUser = () => {
        logout();
        window.location.href = "/";
    }

    const userLoggedIn = (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <Hidden mdUp={getUserRole() === "ROLE_GUEST"}>
                <MenuItem><Link to="/profile" style={linkStyle}>My Profile</Link></MenuItem>
                </Hidden>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </Menu>
        </div>
    );

    const userNotLoggedIn = (
        <div>
            <Link to="/"><Button style={{ color: '#FFF' }}>Sign In</Button></Link>
            <Link to="/registration"><Button style={{ color: '#FFF' }}>Sign Up</Button></Link>
        </div>
    );

    const adminLinks = (
        <Link to="/admin-panel"><Button style={{ color: '#FFF' }}>Admin Panel</Button></Link>
    );

    const managerLinks = (
        <div>
            <Link to="/resource-template"><Button style={{ color: '#FFF' }}>Resources</Button></Link>
        </div>
    );

    let headerLinks;
    if (isUserLoggedIn()) {
        headerLinks = userLoggedIn;
    } else {
        headerLinks = userNotLoggedIn;
    }

    let userRoleLinks;
    if (getUserRole() === "ROLE_ADMIN") {
        userRoleLinks = adminLinks;
    } else if (getUserRole() === "ROLE_MANAGER" || getUserRole() === "ROLE_REGISTER" || getUserRole() === "ROLE_USER") {
        userRoleLinks = managerLinks;
    }else{
        userRoleLinks = (<div></div>);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ background: '#64b5f6' }}>
                <Toolbar className={classes.title}>
                    {userRoleLinks}
                    {headerLinks}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;