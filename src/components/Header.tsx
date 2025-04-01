// src/components/Header.tsx
"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Tooltip,
    Badge,
    Box
} from '@mui/material';
import {
    Settings,
    Logout,
    Person,
    Menu as MenuIcon,
    Notifications,
    Dashboard,
    Login,
    HowToReg,
    LightMode,
    DarkMode
} from '@mui/icons-material';

interface HeaderProps {
    onMenuClick: () => void;
    onThemeToggle: () => void;
    darkMode: boolean;
    profileImage?: string | null;
    notificationCount?: number;
}

export const Header = ({
                           onMenuClick,
                           onThemeToggle,
                           darkMode,
                           profileImage,
                           notificationCount = 0
                       }: HeaderProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path: string) => {
        router.push(path);
        handleClose();
    };

    return (
        <header
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 shadow-md sticky top-0 z-10"
            role="banner"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <IconButton
                        color="inherit"
                        onClick={onMenuClick}
                        aria-label="Toggle sidebar"
                        className="hover:bg-blue-700"
                    >
                        <MenuIcon />
                    </IconButton>

                    <Link href="/Admin/Admin" className="flex items-center">
                        <Dashboard className="mr-2" />
                        <h1 className="text-xl font-bold hidden sm:block">Admin Dashboard</h1>
                    </Link>
                </div>

                <nav className="flex items-center space-x-4">
                    <Tooltip title="Toggle Dark Mode">
                        <IconButton
                            color="inherit"
                            onClick={onThemeToggle}
                            className="hover:bg-blue-700"
                        >
                            {darkMode ? <LightMode /> : <DarkMode />}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Notifications">
                        <IconButton color="inherit" className="hover:bg-blue-700">
                            <Badge badgeContent={notificationCount} color="error">
                                <Notifications />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Account menu">
                            <IconButton
                                onClick={handleMenuClick}
                                size="small"
                                color="inherit"
                                className="hover:bg-blue-700"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar
                                    sx={{ width: 36, height: 36 }}
                                    src={profileImage || undefined}
                                    alt="User profile"
                                >
                                    {!profileImage && <Person />}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 3,
                            sx: {
                                width: 220,
                                overflow: 'visible',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: 1,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => handleNavigation('/Profile')}>
                            <ListItemIcon>
                                <Person fontSize="small" />
                            </ListItemIcon>
                            My Profile
                        </MenuItem>
                        <MenuItem onClick={() => handleNavigation('/Settings')}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => handleNavigation('/Login')}>
                            <ListItemIcon>
                                <Login fontSize="small" />
                            </ListItemIcon>
                            Login
                        </MenuItem>
                        <MenuItem onClick={() => handleNavigation('/SignUp')}>
                            <ListItemIcon>
                                <HowToReg fontSize="small" />
                            </ListItemIcon>
                            Register
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => handleNavigation('/Login')}>
                            <ListItemIcon>
                                <Logout fontSize="small" color="error" />
                            </ListItemIcon>
                            <span className="text-red-500">Logout</span>
                        </MenuItem>
                    </Menu>
                </nav>
            </div>
        </header>
    );
};