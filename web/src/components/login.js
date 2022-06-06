import { React, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import UserContext from '../contexts/UserContext';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = () => {

    const [ values, setValues ] = useState({ email: '', pass: '' });
    const [ user, setUser ] = useContext(UserContext);
    const { cart } = useParams();
    const navigate = useNavigate();

    const getUser = async () => {
        await api.post('customer/getUser', { email: values.email, password: values.pass })
          .then(({ data }) => {
            if (data.length > 0) {
              setUser(data[0]);
              cart ? navigate('/cart') : navigate('/');
            } else {
              setUser([]);
              alert('Usuário não encontrado!');
            }
          })
          .catch(e => console.log(e));
    }
    
      return (
        <>
        <h3>Login</h3>

        <div className="gridLogin">

        <Grid gap={3}
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
              className="gridCustomer">

            <TextField id="outlined-basic" label="Email" variant="outlined" value={values.email} onChange={e => setValues({...values, email: e.target.value})} />
            <TextField id="outlined-basic" label="Senha" variant="outlined" type="password" value={values.pass} onChange={e => setValues({...values, pass: e.target.value})} />
        
        </Grid>

        <Grid gap={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton">

            <Button onClick={() => getUser()} variant="contained">Continuar</Button>
        </Grid>
        </div>
        </>
      );
};

export default Login;
