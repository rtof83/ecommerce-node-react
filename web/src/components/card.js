import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Foods from '../assets/foods.png';
import ListContext from '../contexts/ListContext';

export default function CardFood({ id, image, name, desc, price, quant }) {
// export default function CardFood(props) {
  const [ list, setList ] = useContext(ListContext);
  const navigate = useNavigate();

  const order = (add) => {
    setList(prevList => ([ ...prevList, add ]));
    navigate('/cart');
    // let listTemp = list;
    // listTemp.push(name);
    // console.log(list);
    // console.log(teste);
  }

  return (
    <Card className='cardList'
          onClick={() => order({ id: id,
                                 image: image,
                                 name: name,
                                 quant: 1,
                                 quantMax: quant,
                                 price: price })} sx={{ maxWidth: 265, height: 345 }}>
      <CardHeader
        title={name}
      />
      <CardMedia
        component="img"
        height="190"
        image={image ? image : Foods}
        alt={name}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <AttachMoneyIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
      </CardActions>
    </Card>
  );
}
