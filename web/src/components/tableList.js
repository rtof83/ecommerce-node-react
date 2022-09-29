import React from 'react';
import { Link } from 'react-router-dom';
import searchPanel from '../components/searchPanel';
import deleteRecord from './deleteRecord';
import countPage from './countPage';

import { StyledTableCell, StyledTableRow } from './styledTable';

import CircularProgress from '@mui/material/CircularProgress';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Foods from '../assets/foods.png';

const tableList = ( listName,
                    tableCell,
                    loading,
                    srPanFn,
                    api,
                    data, getData,
                    page, setPage,
                    navigate, path ) => {

  // format specific cells
  const checkCell = (item, cell) => {
    if (cell.field === 'image') {
      return (<Avatar alt="food"
                src={ item.image ? item.image : Foods }
                sx={{ width: 30, height: 30 }}
              />
      );

    } else if (cell.field === 'list') {
      return item.list.map(i =>
          <div id={i._id}>{`${i.quantity} x ${i.product}`}</div>);

    } else if (cell.field === 'date') {
      return new Date(item.date).toLocaleDateString('pt-BR');

    } else if (cell.field === 'total' || cell.field === 'price') {
      return item[cell.field].toFixed(2);

    } else {
      return item[cell.field];
    };
  };

  return (
      <div className="tableCustomer">

      { loading ? <h3><CircularProgress /></h3> : <>

      <h3>Lista de {listName}</h3>

      {searchPanel( srPanFn.searchById,
                    srPanFn.searchByName,
                    srPanFn.setSearch,
                    srPanFn.setSearchById,
                    srPanFn.setSearchByName,
                    srPanFn.getDefault )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, mt: 3 }} aria-label="customized table">
            <TableHead>
              <TableRow>

                  {tableCell.map(head => 
                      <StyledTableCell align={head.align}>{head.fieldName}</StyledTableCell>)}

                  {/* render update button path exist */}
                  { path && <StyledTableCell align="right" /> }

                  <StyledTableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>

              {data && data.map((item) => (
                !item.page ?
                  <StyledTableRow key={item._id}>

                    { tableCell.map(cell =>
                      <StyledTableCell align={cell.align}>
                        {checkCell(item, cell)}
                      </StyledTableCell>)
                    }

                    {/* render update button path exist */}
                    { path && <StyledTableCell align="right"><button onClick={() => navigate(`/${path}/${path === 'product' ? item.sku : item._id}`)}>Alterar</button></StyledTableCell> }
                    
                    <StyledTableCell align="right"><button onClick={() => deleteRecord(path === 'product' ? item.sku : item._id, item.name, api, getData)}>Excluir</button></StyledTableCell>
                  </StyledTableRow>
                :
                <StyledTableCell colSpan={7} align="center">
                  <Button sx={{ mr: 1.5 }} variant="outlined" onClick={() => countPage('decrease', page, data, setPage)}>{'<'}</Button>Página {item.page} de {item.from}
                  <Button sx={{ ml: 1.5 }} variant="outlined" onClick={() => countPage('increase', page, data, setPage)}>{'>'}</Button>
                </StyledTableCell>
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

      </> }
  </div>
  );
};

export default tableList;
