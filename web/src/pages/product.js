import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Foods from '../assets/foods.png';
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
import Avatar from '@mui/material/Avatar';
import api from '../api';

const Product = () => {
    const [values, setValues] = useState({ name: '',
                                           desc: '',
                                           quant: '',
                                           price: '',
                                           image: ''
                                        });

    const navigate = useNavigate();

    const [ showImage, setShowImage ] = useState(Foods);
    const checkImage = (img) => {
      let image = new Image();
      image.src = img;
      setValues({...values, image: img})

      image.onload = () => {
        setShowImage(img);
      }

      image.onerror = () => {
        setShowImage(Foods);
      }
    }

    const insertProduct = async () => {
      if (!values.name || !values.quant || !values.price) {
        alert('Atenção! Os campos obrigatórios devem ser preenchidos.')
      } else {
        await api.post('/product', { name: values.name,
                                     desc: values.desc,
                                     quant: values.quant,
                                     price: values.price,
                                     image: values.image })
            .then(navigate('/listProd'));
      }
    }
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      return (
        <div className="gridCustomer">

          <h3>Cadastro de Produtos</h3>

          <Grid gap={3}
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                className="gridCustomer">

              <TextField id="outlined-basic" label="Nome" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
              <TextField id="outlined-basic" label="Descrição" variant="outlined" value={values.desc} onChange={e => setValues({...values, desc: e.target.value})} />
              <TextField id="outlined-basic" label="Quantidade" variant="outlined" value={values.quant} onChange={e => setValues({...values, quant: e.target.value})} />
              <TextField id="outlined-basic" label="Preço" variant="outlined" value={values.price} onChange={e => setValues({...values, price: e.target.value})} />
              <TextField id="outlined-basic" label="Imagem (link)" variant="outlined" value={values.image} onChange={e => checkImage(e.target.value)} />
              {/* <TextField id="outlined-basic" label="Imagem (link)" variant="outlined" value={values.image} onChange={e => setValues({...values, image: e.target.value})} /> */}
          
        <Avatar className="avatarFood"
          alt="food"
          src={showImage}
          sx={{ width: 150, height: 150 }}
        />

          </Grid>

          <Grid gap={3}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="gridButton">

            <Button onClick={() => insertProduct()} variant="contained">Salvar</Button>

            <Link to={'/'}>
              <Button variant="contained">Cancelar</Button>
            </Link>
          </Grid>
        </div>
      );
};

export default Product;
