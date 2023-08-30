import {SideNav} from "../Components/SideNav"
import { AppBar, Toolbar, Typography, Box, Stack, TableContainer, Table, TableHead, TableRow, TableBody  } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {ProjectList} from "./ProjectList";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


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