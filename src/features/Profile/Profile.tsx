import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import classes from "./Profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import { useEffect } from 'react';
import {changeNameTC, fetchUserTC, logoutTC, setIsChecked} from "./profile-reducer";
import {Navigate} from "react-router-dom";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
export const Profile = () => {
    const isChecked = useSelector((state: AppStateType) => state.profile.isChecked)
    const name = useSelector((state: AppStateType) => state.profile.name)
    const email = useSelector((state: AppStateType) => state.profile.email)
    const publicCardPacksCount = useSelector((state: AppStateType) => state.profile.publicCardPacksCount)
    const avatar = useSelector((state: AppStateType) => state.profile.avatar)
    const isLoggedIn = useSelector((state: AppStateType) => state.login.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isLoggedIn) {
            // @ts-ignore
            dispatch(fetchUserTC())
        }
    }, [])

    const logoutBtnHandler = () => {
        // @ts-ignore
        dispatch(logoutTC())
    }

    const isCheckedHandler = () => {
        dispatch(setIsChecked({isChecked: true}))
    }

    const onChangeInputHandler = (e: any) => {
        const name = e.currentTarget.value
        // @ts-ignore
        dispatch(changeNameTC({name}))
    }

    const inputChangeAvatarHandler = (e: any) => {
        console.log(e.currentTarget)
    }


    if(!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <Container component="main" maxWidth="xs">
            <Card sx={{minWidth: 275, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 30px"}}>
                <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography variant="h5" component="div">
                        Personal Information
                    </Typography>
                    <div className={classes.avatarWrp}>
                        <Avatar sx={{ width: 96, height: 96, mt: 2, mb: 3}} alt="Avatar" src={avatar} />
                        <label htmlFor="avatar" className={classes.label}><AddAPhotoOutlinedIcon/></label>
                        <input onChange={e => inputChangeAvatarHandler(e)} style={{display: "none"}}type="file"
                               id="avatar"
                               name="avatar"
                               accept="image/png, image/jpeg" />
                    </div>
                    <div className={classes.userInfo}>
                        <div>
                            <label htmlFor="name"><span style={{fontWeight: "bold"}}>Name: </span> </label>
                            {isChecked ? <input onBlur={(e) => onChangeInputHandler(e)} type="text" name="name" id="name"/> : <span onDoubleClick={isCheckedHandler}>{name}</span>}
                        </div>
                       <div><span style={{fontWeight: "bold"}}>Email: </span> {email}</div>
                       <div><span style={{fontWeight: "bold"}}>Cards sets: </span> {publicCardPacksCount}</div>

                    </div>
                </CardContent>
                <CardActions >
                    <Button onClick={logoutBtnHandler} variant="outlined" size="small">LOGOUT</Button>
                </CardActions>
            </Card>
        </Container>
    )
}



