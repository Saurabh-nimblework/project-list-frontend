import { Box, TableContainer, Table, TableHead, TableRow, TableBody, TextField, Button  } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import axios from "axios";
import url from '../Config/config'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      width: '10%'
      
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      height: '4px',
      padding: 4  
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

const StyledTableButton = styled(Button)(({ theme }) => ({
  margin: '8px',
  borderRadius: '24px',
}));

export const ProjectList = () => {
  const [selectedRow,setSelectedRow] = useState('');
  const [data,setData] = useState([]);
  const [lastId,setLastId] = useState('');
  const [listItem,setListItem] = useState({
    id: '',
    name: '',
    owner: '',
    priority: ''
  });

  useEffect(()=> {
    (async () => await Load())();
  },[]);

  async function Load() {
    try {
      let result = await axios.get(url.api);
      result = result.data._embedded.list;

      result = result.map((element) => {
        let id = element._links.projectList.href;
        id = id.substr(id.lastIndexOf('/')+1);

        return {
        id: id,
        name: element.name,
        owner: element.owner,
        priority: element.priority,
        created: true,
        }
      });
      setData(result); 
      result.length ? setLastId(result[result.length-1].id) : setLastId('PRJ1');
    }
    catch(err) {
      alert(`Loading Project List Failed !! ${err}`);
    }
    
  }

  async function save(e) {
    e.preventDefault();

    const obj = {
      id: listItem.id,
      name: listItem.name,
      owner: listItem.owner,
      priority: listItem.priority
    }
    
    if(!listItem.created) {
      try {
        let id = lastId.substr(0,lastId.length-1) + (Number(lastId.substr(-1))+1);
        await axios.post(url.api, obj);
        Load();
        console.log('POST Request');
      }
      catch(err) {
        alert("Project List Addition Failed !!");
      }
    }
    else {
      try {
        await axios.put(url.api + listItem.id , obj);
        Load();
        console.log('PUT Request');
      }
    catch(err) {
        alert("Project List Update Failed !!");
      }
    }

    setSelectedRow('');
    setListItem({
      id: '',
      name: '',
      owner: '',
      priority: ''
    });
  }

  async function remove(e,idx) {
    e.preventDefault();

    if(data[idx].id === '') {
      removeRow();
      return;
    }

    try {
      await axios.delete(url.api + data[idx].id);
      Load();
      setSelectedRow('');
      }
    catch(err) {
        alert("Project List Deletion Failed !!");
      }
  }

  const handleClickInput = (e,idx) => {
    const item = data[idx];
    setSelectedRow(e.target.id);
    setListItem({
      id: item.id,
      name: item.name,
      owner: item.owner,
      priority: item.priority,
      created: data[idx].created ? true: false
    });
  }

  const handleTextChange = (e,idx) => {
    let temp = {...data[idx]};
    let tempArray = [...data];
    temp = {
      ...temp,
      [e.target.name]: e.target.value 
    };
    tempArray[idx] = temp;
    setData(tempArray);
    if(e.target.name === 'id') setSelectedRow(e.target.value); 

    setListItem({
      id: temp.id,
      name: temp.name,
      owner: temp.owner,
      priority: temp.priority,
      created: data[idx].created ? true: false
    });
  }

  const addRow = () => {
    let temp = [...data];
    temp.push({
      id: '',
      name: '',
      owner: '',
      priority: ''
    });
    setData(temp);
    // setSelectedRow('');
  }

  const removeRow = () => {
    let temp = [...data];
    temp.pop();
    setData(temp);
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
                        {data.length !== 0 && <StyledTableCell align="center">Option</StyledTableCell>}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row,idx) => (
                        <StyledTableRow key={`key-${idx}`}>
                          <StyledTableCell align="center">{idx+1}</StyledTableCell>
                          { Object.keys(row).map((key,i)=>{
                              return (
                                (key !== 'created') && <StyledTableCell key={i} align="center" id={row.id} onClick={(e) => handleClickInput(e,idx)}>
                                  { ((selectedRow===row.id) && !(key === 'id')) || row.id==='' ?
                                    <TextField
                                      autoComplete="on"
                                      id={row.id}
                                      variant="outlined"
                                      value={row[key]}
                                      onChange={(e)=>handleTextChange(e,idx)}
                                      inputProps={{
                                        name: key,
                                        style: {
                                          height: '12px',
                                          fontSize: 18,
                                          textAlign: 'center'
                                        }
                                      }}
                                     />
                                    :row[key] }
                                </StyledTableCell>
                                );
                            }) }
                            <StyledTableCell align="center">
                              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                <StyledTableButton size="medium" variant="contained" endIcon={<DeleteIcon />} onClick={(e)=>remove(e,idx)}>Delete</StyledTableButton>
                                <StyledTableButton size="medium" disabled={!(selectedRow===row.id && listItem.id !== '')} variant="contained" endIcon={<SaveIcon />} onClick={save}>Save</StyledTableButton>
                              </Box>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="outlined" startIcon={<AddCircleIcon/>} onClick={addRow} size="small" sx={{float: 'right',mr:0,mt:2, borderRadius: '24px', border: 1}} >
              Add
            </Button>
          </Box>
        </>
    );
}