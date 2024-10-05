var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var nomeEmpresa = req.body.nomeEmpresaServer;
  var emailEmpresa = req.body.emailEmpresaServer;
  var cnpj = req.body.cnpjServer;
  var NR = req.body.NRempresaServer;

  if(nomeEmpresa == undefined){
    res.status(400).send("Seu nome de empresa está indefinido!");
  }else if(emailEmpresa == undefined){
    res.status(400).send("Seu email de empresa está indefinido!");
  }else if(cnpj == undefined){
    res.status(400).send("Seu cnpj está indefinido!");
  }else if(NR == undefined){
    res.status(400).send("Seu NR está indefinido!");
  }else{
  
    empresaModel.cadastrar(nomeEmpresa, emailEmpresa, cnpj, NR)
      .then(
        function (resultado){
          res.json(resultado)
        }
      ).catch (
        function (erro){
          console.log(erro);
          console.log(
            "\n Houve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage)
        }
      )

  }


  // não precisa agora, vai que no futuro
  // empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
  //   if (resultado.length > 0) {
  //     res
  //       .status(401)
  //       .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
  //   } else {
  //     empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
  //       res.status(201).json(resultado);
  //     });
  //   }
  // });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
