const jwt = require ('jsonwebtoken');
const {promisify} = require('util');

module.exports = {
    eAdmin: async function (req, res, next) {
        const autorizador = req.headers.authorization;
        
        if(!autorizador){
            return res.status(400).json({
                erro:true,
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            })
        }
        const [bearer, token]= autorizador.split(' ')

        if(!token){
            return res.status(400).json({
                erro:true,
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            })
        }
        try{
    const decode = await promisify(jwt.verify)(token, "4F8U4O6JH18O74DG3A1FH8J7DV21MN1D4FD69Y97QW1ASD4F6GJ8HU9")
    req.userId = decode.id;
    return next()
        }catch(err){
            return res.status(400).json({
                erro:true,
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            })
        }
    }
}