import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['RANKINGS', 'ABOUT US', 'ONGOING ACTIVITIES', 'FULFILLED ACTIVITIES', 'JOIN THE HIVE'];

function Navbar() {
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img
                        src={require('../../../assets/images/logo.png')} 
                        alt="logo" 
                        style={{marginRight: 15, marginLeft: 25}}
                    />

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, display: 'block' }}
                                className="navbar-button-link"
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Join the hive">
                            <Button variant="contained" className='navbar-button'>
                                SIGN IN
                            </Button>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;