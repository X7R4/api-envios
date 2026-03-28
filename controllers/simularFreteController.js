const axios = require('axios');

exports.simularFrete = async (req, res) => {
  try {
    const dados = req.body;
    console.log('Dados recebidos na consulta de preço:', dados);

    const url = 'https://api.correios.com.br/preco/v1/nacional/';
    // Repasse o header Authorization da requisição do cliente
    const resposta = await axios.post(url, dados, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzQzMTIwODgsImlzcyI6InRva2VuLXNlcnZpY2UiLCJleHAiOjE3NzQzOTg0ODgsImp0aSI6IjU5MzdkYTFkLWRiNTgtNDRjMi04OGU5LTNhM2I1OGNjNGFiZCIsImFtYmllbnRlIjoiUFJPRFVDQU8iLCJwZmwiOiJQSiIsImlwIjoiMTc5LjEyNS44Ni45NiwgMTkyLjE2OC4xLjEzMiIsImNhdCI6IlBsMCIsImNhcnRhby1wb3N0YWdlbSI6eyJjb250cmF0byI6Ijk5MTI3MjEzNjQiLCJudW1lcm8iOiIwMDc5NjM0ODM0IiwiZHIiOjIwLCJhcGlzIjpbeyJhcGkiOjM0fSx7ImFwaSI6MzV9LHsiYXBpIjozNn0seyJhcGkiOjM3fSx7ImFwaSI6NDF9LHsiYXBpIjo3Nn0seyJhcGkiOjc4fSx7ImFwaSI6ODB9LHsiYXBpIjo4M30seyJhcGkiOjg3LCJncnVwb3MiOlt7ImNvIjoiMiIsInVybHMiOlsiKjsuKiJdfV19LHsiYXBpIjo5M30seyJhcGkiOjU2Nn0seyJhcGkiOjU4Nn0seyJhcGkiOjU4N31dfSwiaWQiOiI1OTY0Nzc3NDAwMDE1MSIsImNucGoiOiI1OTY0Nzc3NDAwMDE1MSJ9.EFXK4ng0AU-felgagK-0tSqG08iUvq7Zov8QrsNPtRXZo8r4nbfCPurq2m4fzPvX5DZNBSVll_JDZz8QGrqAKMi68POzo1evjWSvf1jyBVncgdjwBhVa3msYPBWpObFBkzEtDv7sL7K38yRzimBBe04L7r-6E5HVk05sfIWP8H83EIG5ALqMG7xSu4hu0gDPHY5wUYwXUdtZV3OJq_YkErf5YqmsZ1u10aLPmGA02Zt4LCiyJYf-YfuSwKlxUSUk5T-InMwOwUbjoC28a4I8RVpsGsnBXAWrl4QCEjYc-q-2O6fnC_0XuQPvhRS2ff7UVVlFbbzgujjvruPZSEL4Jg',
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
