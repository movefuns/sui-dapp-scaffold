import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeChange from '../../components/ThemeChange';
import LocalChange from '../../components/LocalChange';
import { ConnectButton } from '@mysten/wallet-kit';
import {useTranslation} from "react-i18next";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function MiniDrawer() {
    const { t } = useTranslation();
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {t('trans.title')} &nbsp;&nbsp;&nbsp;
            <LocalChange/>
                    <ThemeChange/>
          </Typography>
     
                    <ConnectButton connectText={'Connect Wallet'}/>
                </Toolbar> 
            </AppBar>
    </Box>
    );
}