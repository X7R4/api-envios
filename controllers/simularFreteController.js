const axios = require('axios');

exports.simularFrete = async (req, res) => {
  try {
    const dados = req.body;
    console.log('Dados recebidos na consulta de preço:', dados);

    const url = 'https://api.correios.com.br/preco/v1/nacional/';
    // Repasse o header Authorization da requisição do cliente
    const resposta = await axios.post(url, dados, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzM4MDE4MDcsImlzcyI6InRva2VuLXNlcnZpY2UiLCJleHAiOjE3NzM4ODgyMDcsImp0aSI6ImE0OTBiZjM2LTBmYTUtNGVkMy1hMDNlLWU3ZTk2ZjEzMTFmNiIsImFtYmllbnRlIjoiUFJPRFVDQU8iLCJwZmwiOiJQSiIsImlwIjoiMTc5LjEyNS44Ni45NiwgMTkyLjE2OC4xLjEzMiIsImNhdCI6IlBsMCIsImNhcnRhby1wb3N0YWdlbSI6eyJjb250cmF0byI6Ijk5MTI3MjEzNjQiLCJudW1lcm8iOiIwMDc5NjM0ODM0IiwiZHIiOjIwLCJhcGlzIjpbeyJhcGkiOjM0fSx7ImFwaSI6MzV9LHsiYXBpIjozNn0seyJhcGkiOjM3fSx7ImFwaSI6NDF9LHsiYXBpIjo3Nn0seyJhcGkiOjc4fSx7ImFwaSI6ODB9LHsiYXBpIjo4M30seyJhcGkiOjg3LCJncnVwb3MiOlt7ImNvIjoiMiIsInVybHMiOlsiKjsuKiJdfV19LHsiYXBpIjo5M30seyJhcGkiOjU2Nn0seyJhcGkiOjU4Nn0seyJhcGkiOjU4N31dfSwiaWQiOiI1OTY0Nzc3NDAwMDE1MSIsImNucGoiOiI1OTY0Nzc3NDAwMDE1MSJ9.v57OkiZmwytAaEOWvDyh-GVt_l9HknjAjwwnVFYbPnyjF6j9yDn7b04KmBaopzqm_A3FVzG2GKpu5UqvrCiE07Rdzl37_FvuBBKF9_HkMWqWAc4lGfKaUr3zYiVPlp_fkQtgM8mewcHul4os1zeStDZOaWPSW-H2Jx5bhN1LnV1_j1ATq20Lw46X9rCsrf-kySuKAdI-ZDU5udL8-pHL9IJ_r7lybuPPjqLe5kM5SExZxPWaHVo9liLStblKKAIIY8ampiFJv1ZtQjg92BDLdf5bJniHEVHE-mcTUCpBxO8UtQ7eUnB9t6kV2AQaFyIey7sDITlFLjNyen28Adud5Q',
        'Content-Type': 'application/json'

      }
    });

    res.json({
      status: 'sucesso',
      dadosRecebidos: resposta.data
    });

  } catch (erro) {
    console.error('Erro ao consultar preço dos Correios:', erro.message);

    res.status(500).json({
      status: 'erro',
      mensagem: 'Falha ao se comunicar com a API de preço dos Correios',
      detalhe: erro.response ? erro.response.data : erro.message
    });
  }
}
