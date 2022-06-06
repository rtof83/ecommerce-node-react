import { React, useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function ListProd() {
    const [ data, setData ] = useState([]);

    const getData = async () => {
        await api.get('order')
          .then(({ data }) => setData(data))
          .catch(e => console.log(e));
      }
    
      useEffect(() => {    
        getData();
      }, []);

      const deleteOrder = async (id) => {
        if (window.confirm(`Excluir pedido ${id}?`)) {
          await api.delete(`order/${id}`)
            .then(getData())
            .catch(e => console.log(e));
        }
      }

  return (
      <div className="tableProduct">

        <h3>Lista de Pedidos</h3>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                  <StyledTableCell align="left">Pedido</StyledTableCell>
                  <StyledTableCell align="left">Total</StyledTableCell>
                  <StyledTableCell align="center">Cliente</StyledTableCell>
                  <StyledTableCell align="right" />
              </TableRow>
              </TableHead>
              <TableBody>
              {data.map((item) => (
                  <StyledTableRow key={item._id}>

                  <StyledTableCell align="left">{item._id}</StyledTableCell>

                  <StyledTableCell align="left" component="th" scope="row">
                      {item.total.toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.customer}</StyledTableCell>
                  <StyledTableCell align="right"><button onClick={() => deleteOrder(item._id)}>Excluir</button></StyledTableCell>
                  </StyledTableRow>
              ))}
              </TableBody>
          </Table>
        </TableContainer>

        <Grid gap={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton">

          <Link to={'/'}>
            <Button variant="contained">Voltar</Button>
          </Link>
        </Grid>
    </div>
  );
}
