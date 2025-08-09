const axios = require('axios');
const { axiosCorreiosInstance } = require('../config/axiosConfig');

exports.enviarPrepostagem = async (req, res) => {
  try {
    const dados = req.body;
    console.log('Dados recebidos na prepostagem:', dados);

    const url = 'https://api.correios.com.br/prepostagem/v1/prepostagens';
    const resposta = await axiosCorreiosInstance.post(url, dados);

    res.json({
      status: 'sucesso',
      dadosRecebidos: resposta.data
    });

  } catch (erro) {
    console.error('Erro ao enviar dados para os Correios:', erro.message);

    res.status(500).json({
      status: 'erro',
      mensagem: 'Falha ao se comunicar com a API dos Correios',
      detalhe: erro.response ? erro.response.data : erro.message
    });
  }
};
