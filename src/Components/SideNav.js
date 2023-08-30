import { Drawer, Box, Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

const drawerWidth = 280;

const listItem = [
    {
        text: 'Project',
        icon : <AssignmentOutlinedIcon/>
    },
    {
        text: 'Help',
        icon : <HelpIcon/>
    },
];

export const SideNav = () => {

    return (
        <>
          <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  backgroundColor: '#145496'
                },
            }}
            anchor="left"
            variant="permanent"
          >
            <Toolbar/>
            <Divider/>  
            <List>
            {listItem.map((item) => (
              <ListItem key={item}>
              <ListItemButton href="#">
                  <ListItemIcon sx={{color: '#fff'}}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText sx={{color:'white', fontWeight: 'medium' }} primary={item.text} />
              </ListItemButton>
              </ListItem>
            ))}
        </List>
          </Drawer>
        </>
    );
}