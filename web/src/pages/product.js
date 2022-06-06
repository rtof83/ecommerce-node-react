import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Foods from '../assets/foods.png';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import api from '../api';

const Product = () => {
    const [values, setValues] = useState({ name: '',
                                           desc: '',
                                           quant: '',
                                           price: '',
                                           image: '' });

    const navigate = useNavigate();
    const { id } = useParams();

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
        const product = { name: values.name,
                          desc: values.desc,
                          quant: values.quant,
                          price: values.price,
                          image: values.image };

        if (id) {
          await api.patch(`/product/${id}`, product)
            .then(navigate('/listProd'));
        } else {
          await api.post('/customer', product)
            .then(navigate('/listProd'));
        } 
      }
    }

    const getProduct = async () => {
      if (id) {
        await api.get(`product/${id}`)
          .then(({ data }) => {
            setValues({ name: data.name,
                        desc: data.desc,
                        quant: data.quant,
                        price: data.price,
                        image: data.image });
          })
          .catch(e => console.log(e));
      }
    }

    useEffect(() => {
      getProduct();
    }, []);
    
      return (
        <div className="gridCustomer">

          <h3>Cadastro de Produtos</h3>

          <Grid gap={3}
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                className="gridCustomer">

              { id && <TextField id="outlined-basic" label="Id" variant="outlined" value={id} disabled /> }
              <TextField id="outlined-basic" label="Nome" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
              <TextField id="outlined-basic" label="Descrição" variant="outlined" value={values.desc} onChange={e => setValues({...values, desc: e.target.value})} />
              <TextField id="outlined-basic" label="Quantidade" variant="outlined" value={values.quant} onChange={e => setValues({...values, quant: e.target.value})} />
              <TextField id="outlined-basic" label="Preço" variant="outlined" value={values.price} onChange={e => setValues({...values, price: e.target.value})} />
              <TextField id="outlined-basic" label="Imagem (link)" variant="outlined" value={values.image} onChange={e => checkImage(e.target.value)} />
          
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
