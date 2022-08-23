import Alert from "@mui/material/Alert"

export const Error = (props: any) => {
    return <Alert variant="filled" severity="error">
        {props.errorText}
    </Alert>
}
