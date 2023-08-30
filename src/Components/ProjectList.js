import { Box, TableContainer, Table, TableHead, TableRow, TableBody, TextField  } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { width } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      width: '10%'
      
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      height: 56,
      padding:8
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
  
  function createData(serialNo, id, name, owner, priority) {
    return { serialNo, id, name, owner, priority };
  }
  
  const rows = [
    createData('1', 'PRJ1', 'Nimble Cafe', 'AK', 'Critical'),
    createData('2', 'PRJ2', 'Nimble Retro', 'SN', 'High'),
  ];


export const ProjectList = () => {
  const [clickInput,setClickInput] = useState(false);
  const [selectedRow,setSelectedRow] = useState('');

  const handleClickInput = (e) => {
    setClickInput(true);
    setSelectedRow(e.target.id);
  }

    return (
        <>
          <Box sx={{position:'relative', left: 280, top: 120,px:'4%', width: 'calc(92% - 280px)' }}>
            <TableContainer component={Paper}>
                <Table  aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell style={{width:'5%'}} align="center">#</StyledTableCell>
                        <StyledTableCell align="center">Project ID</StyledTableCell>
                        <StyledTableCell align="center">Project Name</StyledTableCell>
                        <StyledTableCell align="center">Owner</StyledTableCell>
                        <StyledTableCell align="center">Priority</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}  >
                          <StyledTableCell align="center">{row.serialNo}</StyledTableCell>
                          <StyledTableCell align="center" id={row.id} onClick={handleClickInput}>{clickInput && selectedRow===row.id?<TextField id={row.id} variant="outlined" placeholder="hello" />:row.id}</StyledTableCell>
                          <StyledTableCell align="center" id={row.id} onClick={handleClickInput}>{clickInput && selectedRow===row.id?<TextField id={row.id} variant="outlined" />:row.name}</StyledTableCell>
                          <StyledTableCell align="center" id={row.id} onClick={handleClickInput}>{clickInput && selectedRow===row.id?<TextField id={row.id} variant="outlined" />:row.owner}</StyledTableCell>
                          <StyledTableCell align="center" id={row.id} onClick={handleClickInput}>{clickInput && selectedRow===row.id?<TextField id={row.id} variant="outlined" />:row.priority}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
          </Box>
        </>
    );
}