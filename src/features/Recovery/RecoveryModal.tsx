import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import { useState } from "react";

export const RecoveryModal = () => {
    const[navigate, setNavigate] = useState(false)
    const recoveryEmail = useSelector((state: AppStateType) => state.recovery.recoveryEmail)

    const onClickButtonHandler = () => {
        setNavigate(true)
    }

    if(navigate) {
        return <Navigate to="/login"/>
    }

    return (
        <Container component="main" maxWidth="xs">
            <Card sx={{minWidth: 275, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 30px"}}>
                <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography variant="h6" component="div">
                        We have sent a recovery link to your email
                    </Typography>
                    <Typography variant="h6" component="div">
                        {recoveryEmail}
                    </Typography>
                </CardContent>
                <CardActions >
                    <Button onClick={onClickButtonHandler} variant="outlined" size="small">Thank you</Button>
                </CardActions>
            </Card>
        </Container>
    )
}
