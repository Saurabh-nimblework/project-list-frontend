import {SideNav} from "../Components/SideNav"
import { AppBar, Toolbar, Typography, Box, Stack } from "@mui/material";
import {ProjectList} from "./ProjectList";

export const Layout = () => {
    return (
        <>
        <SideNav/>  
        <Stack direction='column'>
          <Box>
            <AppBar position="fixed" sx={{width: 'calc(100% - 280px)'}} >
              <Toolbar sx={{display: 'flex',justifyContent: 'center', alignItems: 'center', height:64}}>
                <Typography variant="h4">
                  Project Lisitng
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          
          <ProjectList/>
            
        </Stack>
        </>
    );
}