import React, { useContext, useEffect, useState } from 'react';
import { ListContext, UserContext } from '../contexts/Contexts';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Foods from '../assets/foods.png';
import api from '../api';

const Cart = () => {
  const [ list, setList ] = useContext(ListContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [ payment, setPayment ] = useState('');
  const [ total, setTotal ] = useState('');

  const order = async () => {
    if (user[0].length === 0) {
      if (window.confirm('Atenção! Para conclusão do pedido é necessário realizar o login.')) {
        navigate('/login/cart');
      }
    } else {
      if (payment === '') {
        alert('Atenção! Informe a forma de pagamento.');
      } else {
        const itemsPost = list.map(item => ({ product: item.sku,
                                              quantity: item.quantity }));

        const orderPost = { customer: user[0]._id,
                            payment: payment,
                            list: itemsPost };

        api.post('/orders', orderPost)
          .then(() => navigate('/listOrder'))
          .then(setList([]))
          .catch(e => console.log(e));
      };
    };
  };

  const counter = (sku, max, func) => {
    const index = list.findIndex(element => element.sku === sku);
    let quantity = list[index].quantity;

    if (func === 'increase' && quantity < max) quantity++;
    if (func === 'decrease' && quantity > 1) quantity--;

    const newList = list.map(obj => {
      if (obj.sku === sku) {
        return { ...obj, quantity: quantity };
      }
    
      return obj;
    });

    setList(newList);
  };

  useEffect(() => {
    let sum = 0
    for (let i = 0; i < list.length; i++) {
      sum += list[i].quantity * list[i].price;
    };

    setTotal(sum.toFixed(2));
  }, [list]);

  const removeItem = (sku) => {
    setList(list.filter(item => item.sku !== sku));
  };

  return (
    <div className='cartContainer'>
    { list.length === 0 ? <h3>Carrinho vazio</h3> : <>
    
      <h3>Carrinho</h3>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>

          { user[0].email && <>
          <Grid item xs={6} md={4}>
            <Item>{user[0].name}</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>{user[0].email}</Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <Item>{user[0].address}</Item>
          </Grid>

          <Grid item xs={6} md={8}>

            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-simple-select-label">Forma de Pagamento</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={payment}
                label="Forma de Pagamento"
                onChange={e => setPayment(e.target.value)}
              >
                <MenuItem value={'Cartão de Crédito'}>Cartão de Crédito</MenuItem>
                <MenuItem value={'Dinheiro'}>Dinheiro</MenuItem>
                <MenuItem value={'Débito'}>Débito</MenuItem>
                <MenuItem value={'Vale Alimentação'}>Vale Alimentação</MenuItem>
                <MenuItem value={'Pix'}>Pix</MenuItem>
              </Select>
            </FormControl>
            
          </Grid>
          </>}

        </Grid>

        <Divider className='divider' />

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="left">Produto</StyledTableCell>

                    <StyledTableCell align="center">Quantidade</StyledTableCell>

                    <StyledTableCell align="center">Preço</StyledTableCell>
                    <StyledTableCell align="right" />
                </TableRow>
                </TableHead>
                <TableBody>
                {list.map((item) => (
                    <StyledTableRow key={item.id}>

                    <StyledTableCell align="left">
                      <Avatar alt="food"
                              src={ item.image || Foods }
                              sx={{ width: 30, height: 30 }}
                            />
                    </StyledTableCell>

                    <StyledTableCell align="left" component="th" scope="row">
                        {item.name}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <div className='quantCart'>
                        <button onClick={() => counter(item.sku, item.quantMax, 'decrease')}>-</button>
                          {item.quantity}
                        <button onClick={() => counter(item.sku, item.quantMax, 'increase')}>+</button>
                      </div>
                    </StyledTableCell>
                      
                    <StyledTableCell align="center">{(item.quantity*item.price).toFixed(2)}</StyledTableCell>
                    <StyledTableCell align="right"><button onClick={() => removeItem(item.sku)}>Excluir</button></StyledTableCell>
                    
                    </StyledTableRow>
                ))}
                </TableBody>

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">{total}</TableCell>
                </TableRow>

            </Table>
          </TableContainer>

          <Grid gap={3}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="gridButton">

              <Button onClick={() => order()} variant="contained">Confirmar Pedido</Button>
          </Grid>
      </Box>
    </>}
    </div>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

export default Cart;
