import {NavLink} from "react-router-dom"
import classes from './Sidebar.module.css'



export const Sidebar = () => {

    return (
        <nav className={classes.sidebarWrp}>
            <NavLink className={classes.linkItem} to="/login">Login</NavLink>
            <NavLink className={classes.linkItem} to="/profile">Profile</NavLink>
            <NavLink className={classes.linkItem} to="/recovery">Recovery</NavLink>
            <NavLink className={classes.linkItem} to="/registration">Registration</NavLink>
            <NavLink className={classes.linkItem} to="/">Packs</NavLink>
            <NavLink className={classes.linkItem} to="/Cards">Cards</NavLink>
        </nav>
    )
}
