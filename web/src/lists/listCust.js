import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../contexts/Contexts';

import api from '../api';
import TableList from '../components/TableList';

const ListCust = () => {
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

    const query = !searchById ? 'customers?page=' + page + (searchByName ? '&name=' + searchByName : '') : 'customers/' + searchById;
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
    setSearchContext({ id: 'ID', name: 'Nome do Cliente' });
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
      { TableList( 'Clientes',

                   [ { align: 'center', fieldName: 'ID', field: '_id' },
                     { align: 'left', fieldName: 'Nome', field: 'name' },
                     { align: 'center', fieldName: 'Email', field: 'email' } ],

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
                   navigate, 'customer' )
      }
    </>
  );
}

export default ListCust;
