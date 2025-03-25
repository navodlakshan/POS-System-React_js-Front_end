"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    onMenuClick: () => void;
    profileImage?: string | null;
}

export const Header = ({ onMenuClick, profileImage }: HeaderProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewProfile = () => {
        router.push('/Profile');
        handleClose();
    };

    const handleSettings = () => {
        router.push('/Settings');
        handleClose();
    };

    const handleLogout = () => {
        // Add your logout logic here (clear tokens, etc.)
        router.push('/Login');
        handleClose();
    };

    return (
        <header className="bg-slate-600 text-foreground p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img
                    src="/Menu.svg"
                    alt="Menu"
                    className="w-6 h-6 mr-8 cursor-pointer"
                    onClick={onMenuClick}
                />
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>
            <nav>
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link href="/Login" className="text-white hover:text-blue-500">
                            Sign In
                        </Link>
                    </li>
                    <li>
                        <Link href="/SignUp" className="text-white hover:text-blue-500">
                            Sign Up
                        </Link>
                    </li>
                    <li>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar
                                    sx={{ width: 40, height: 40 }}
                                    src={profileImage || undefined}
                                >
                                    {!profileImage && <Person />}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
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
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleViewProfile}>
                                <ListItemIcon>
                                    <Person fontSize="small" />
                                </ListItemIcon>
                                View Profile
                            </MenuItem>
                            <MenuItem onClick={handleSettings}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </li>
                </ul>
            </nav>
        </header>
    );
};