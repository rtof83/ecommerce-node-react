import React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const searchPanel = (searchById, searchByName, setSearch, setSearchById, setSearchByName, getDefault) => {
    return (
        <FormControl sx={{ mx: 7, display: 'inline' }}>
            <FormControl sx={{ width: 300, mx: 1 }}>
                <TextField id="txtSearchById" label="Digite o ID" variant="outlined" value={searchById} onChange={e => setSearchById(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchById && setSearch(searchById)} />
                <Button variant='outlined' onClick={() => searchById && setSearch(searchById)}>Localizar por ID</Button>
            </FormControl>

            <FormControl sx={{ width: 300, mx: 1 }}>
                <TextField id="txtSearchByName" label="Digite o Nome" variant="outlined" value={searchByName} onChange={e => setSearchByName(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchByName && setSearch(searchByName)} />
                <Button variant='outlined' onClick={() => searchByName && setSearch(searchByName)}>Localizar por Nome</Button>
            </FormControl>

            <FormControl sx={{ mx: 1 }}>
                <Button variant='contained' onClick={() => getDefault()}>Todos os registros</Button>
            </FormControl>
        </FormControl>
    );
};

export default searchPanel;
