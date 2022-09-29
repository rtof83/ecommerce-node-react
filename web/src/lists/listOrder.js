import React, { useEffect, useState } from 'react';
import api from '../api';
import tableList from '../components/tableList';

const ListOrder = () => {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ searchById, setSearchById ] = useState('');
  const [ searchByName, setSearchByName ] = useState('');
  const [ page, setPage ] = useState(1);

  const getData = async () => {
    setLoading(true);

    const query = !searchById ? 'orders?page=' + page + (searchByName ? '&customer=' + searchByName : '') : 'orders/' + searchById;
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
    getData();
  }, [page, search]);

  const getDefault = () => {
    setSearchById('');
    setSearchByName('');
    setPage(1);
    setSearch('');
  };

  return (
    <>
      { tableList( 'Pedidos',

                   [ { align: 'center', fieldName: 'Pedido', field: '_id' },
                     { align: 'center', fieldName: 'Total', field: 'total' },
                     { align: 'left', fieldName: 'Cliente', field: 'customer_name' },
                     { align: 'center', fieldName: 'Data', field: 'date' },
                     { align: 'center', fieldName: 'Itens', field: 'list' } ],

                   loading,

                   { searchById,
                     searchByName,
                     setSearch,
                     setSearchById,
                     setSearchByName,
                     getDefault },

                   api,
                   data, getData,
                   page, setPage )
      }
    </>
  );
};

export default ListOrder;
