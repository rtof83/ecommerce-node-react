import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../contexts/Contexts';
import TableList from '../components/TableList';
import api from '../api';

const ListProd = () => {
  const navigate = useNavigate();
  const [ , setSearchContext ] = useContext(SearchContext);

  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ searchById, setSearchById ] = useState('');
  const [ searchByName, setSearchByName ] = useState('');
  const [ page, setPage ] = useState(1);

  const getData = async () => {
    setLoading(true);

    const query = !searchById ? 'products?page=' + page + (searchByName ? '&name=' + searchByName : '') : 'products/' + searchById;
    await api.get(query)
      .then(({ data }) => {
        data.length === undefined ? setData([data]) : setData(data);
      })
      .catch(e => {
        console.log(e);
        if (e.response.status === 400 || e.response.status === 422) setData([]);
      });

    setLoading(false);
  };

  useEffect(() => {
    setSearchContext({ id: 'SKU', name: 'Nome do Produto' });
  }, []);
  
  useEffect(() => {    
    getData();
  }, [page, search]);

  const getDefault = () => {
    setSearchByName('');
    setSearchById('');
    setPage(1);
    setSearch('');
  };

  return (
    <>
      { TableList( 'Produtos',

                   [ { align: 'left', fieldName: '', field: 'image' },
                     { align: 'center', fieldName: 'SKU', field: 'sku' },
                     { align: 'left', fieldName: 'Nome', field: 'name' },
                     { align: 'center', fieldName: 'Quantidade', field: 'quantity' },
                     { align: 'center', fieldName: 'Preço', field: 'price' } ],

                   loading,

                   { searchById,
                     searchByName,
                     setSearch,
                     setSearchById,
                     setSearchByName,
                     getDefault },

                   api,
                   data, getData,
                   page, setPage,
                   navigate, 'product' )
      }
    </>
  );
};

export default ListProd;
