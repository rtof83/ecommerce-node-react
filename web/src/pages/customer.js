import { React, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from '../api';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Customer = () => {
    const [values, setValues] = useState({ name: '',
                                           address: '',
                                           email: '',
                                           pass: ''
                                        });

    const navigate = useNavigate();
    const { id } = useParams();

    const insertCustomer = async () => {
      if (!values.name || !values.address || !values.pass) {
        alert('Atenção! Os campos obrigatórios devem ser preenchidos.')
      } else {
        const customer = { name: values.name,
                           address: values.address,
                           email: values.email,
                           password: values.pass,
                           access: 'user' }
        if (id) {
          await api.patch(`/customer/${id}`, customer)
            .then(navigate('/listCust'));
        } else {
          await api.post('/customer', customer)
              .then(navigate('/listCust'));
        }
      }
    }
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const getCustomer = async () => {
        if (id) {
          await api.get(`customer/${id}`)
            .then(({ data }) => {
              setValues({ name: data.name,
                          address: data.address,
                          email: data.email,
                          pass: data.password });
            })
            .catch(e => console.log(e));
        }
      }

      useEffect(() => {
        getCustomer();
      }, []);
    
      return (
        <>
        <h3>Cadastro de Clientes</h3>

        <div className="gridCustomer">

        <Grid gap={3}
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
              className="gridCustomer">

            { id && <TextField id="outlined-basic" label="Id" variant="outlined" value={id} disabled /> }
            <TextField required id="outlined-basic" label="Nome" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
            <TextField id="outlined-basic" label="Endereço" variant="outlined" value={values.address} onChange={e => setValues({...values, address: e.target.value})} />
            <TextField required id="outlined-basic" label="E-mail" variant="outlined" value={values.email} onChange={e => setValues({...values, email: e.target.value})} />
            {/* <TextField id="outlined-basic" label="Senha" variant="outlined" type="password" value={values.pass} onChange={e => setValues({...values, pass: e.target.value})} /> */}
        
            <FormControl required variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.pass}
                onChange={e => setValues({...values, pass: e.target.value})}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
        </FormControl>
        
        </Grid>

        <Grid gap={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton">

          <Button onClick={() => insertCustomer()} variant="contained">Salvar</Button>

          <Link to={'/'}>
            <Button variant="contained">Cancelar</Button>
          </Link>
        </Grid>
        </div>
        </>
      );
};

export default Customer;
