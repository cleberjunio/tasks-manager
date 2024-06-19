const notFoundError = (res) => {
    return res
        .status(404)
        .send("Este registro não foi encontrado no banco de dados");
};

module.exports = {
    notFoundError,
};
