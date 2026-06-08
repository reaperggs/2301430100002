import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Notifications
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        All Notifications
                    </Button>
                    <Button color="inherit" component={Link} to="/priority">
                        Priority Inbox
                    </Button>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </>
    );
}
