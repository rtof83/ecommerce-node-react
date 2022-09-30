const DeleteRecord = async (id, name, api, getData) => {
    if (window.confirm(`Excluir ${name}?`)) {
        await api.delete(`customers/${id}`)
        .then(() => getData())
        .catch(e => console.log(e));
    };
};

export default DeleteRecord;
