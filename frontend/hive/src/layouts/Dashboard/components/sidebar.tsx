import * as React from 'react';
import { Link } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { rootStore } from '../../../stores';

const drawerWidth = 240;

interface IDrawerProps {
	menu: Array<any>;
};

export default function ResponsiveDrawer(props: IDrawerProps) {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const user = rootStore.userStore.getUserData();
	
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	
	const drawer = (
		<div>
			<div className="sidebar-account">
				<AccountBoxIcon />
				<div className="sidebar-account-info">
					<p className="sidebar-account-title">{user.name}</p>
					<p className="sidebar-account-email">info@nable.com</p>
				</div>
			</div>
			<Divider />
			<List>
				{props.menu.map((item, index) => (
					<ListItem key={item?.text} disablePadding component={Link} to={item.link}>
						<ListItemButton>
							<ListItemIcon>
								{item?.icon}
							</ListItemIcon>
							<ListItemText primary={item?.text} style={{color: 'black'}}/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<ListItem disablePadding component={Link} to="/" className="sidebar-logout">
				<ListItemButton>
					<ListItemIcon>
						<ExitToAppIcon />
					</ListItemIcon>
					<ListItemText primary="Logout" style={{color: 'black'}}/>
				</ListItemButton>
			</ListItem>
		</div>
	);
								
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar className="sidebar-toolbar">
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Hive Dashboard
					</Typography>
					<NotificationsIcon />
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
			>
				<Toolbar />
			</Box>
		</Box>
	);
}