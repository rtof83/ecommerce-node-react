import { React, useContext, useEffect, useState } from 'react';
import api from '../api';
import Carousel from "../components/carousel";
import CardFood from "../components/card";
import UserContext from '../contexts/UserContext';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListContext from '../contexts/ListContext';

const Home = () => {
    const [ data, setData ] = useState([]);
    const [ user ] = useContext(UserContext);

    const list = useContext(ListContext);

    const getProducts = async () => {
        await api.get('product')
            .then(({ data }) => setData(data))
            .catch(e => console.log(e));
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <Carousel />
            
            <div className="container text-center">    
                <h3>Olá { user.name || `Visitante` }, faça seu pedido!</h3><br />
                <h3>{console.log(list)}</h3><br />

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        { data.map((item, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <CardFood id={item._id}
                                      image={item.image}
                                      name={item.name}
                                      desc={item.desc}
                                      price={item.price}
                                      quant={item.quant} />
                        </Grid>
                        ))}
                    </Grid>
                </Box>

            </div>
        </>
    )
}

export default Home;
