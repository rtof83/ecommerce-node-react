import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Foods from '../assets/foods.png';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import api from '../api';

const Product = () => {
    const [values, setValues] = useState({ id: '',
                                           sku: '',
                                           name: '',
                                           desc: '',
                                           quantity: '',
                                           price: '',
                                           image: '' });

    const navigate = useNavigate();
    const { sku } = useParams();

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
    };

    const insertProduct = async () => {
      if (!values.sku || !values.name || !values.quantity || !values.price) {
        alert('Atenção! Os campos obrigatórios devem ser preenchidos.')
      } else {
        const product = { sku: values.sku,
                          name: values.name,
                          desc: values.desc,
                          quantity: values.quantity,
                          price: values.price,
                          image: values.image };

        const query = sku ? api.patch(`products/${sku}`, product) : api.post('products', product);
        await query
          .then(() => navigate('/listProd'))
          .catch(e => console.log(e));
      };
    };

    const getProduct = async () => {
      if (sku) {
        await api.get(`products/${sku}`)
          .then(({ data }) => {
            setValues({ id: data._id,
                        sku: data.sku,
                        name: data.name,
                        desc: data.desc,
                        quantity: data.quantity,
                        price: data.price,
                        image: data.image });
          })
          .catch(e => console.log(e));
      };
    };

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

              { sku && <TextField id="txtId" label="ID" variant="outlined" value={values.id} disabled={sku} /> }
              <TextField id="txtSKU" label="SKU" variant="outlined" value={values.sku} onChange={e => setValues({...values, sku: e.target.value})} disabled={sku} />
              <TextField id="txtName" label="Nome" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
              <TextField id="txtDesc" label="Descrição" variant="outlined" value={values.desc} onChange={e => setValues({...values, desc: e.target.value})} />
              <TextField id="txtQuantity" label="Quantidade" type="number" variant="outlined" value={values.quantity} onChange={e => setValues({...values, quantity: e.target.value})} />
              <TextField id="txtPrice" label="Preço" type="number" variant="outlined" value={values.price} onChange={e => setValues({...values, price: e.target.value})} />
              <TextField id="txtImage" label="Imagem (link)" variant="outlined" size="255" value={values.image} onChange={e => checkImage(e.target.value)} />
          
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
