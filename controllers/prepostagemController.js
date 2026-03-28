const axios = require('axios');

exports.enviarPrepostagem = async (req, res) => {
  try {
    const dados = req.body;

    const TOKEN = 'eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzQzMTIwODgsImlzcyI6InRva2VuLXNlcnZpY2UiLCJleHAiOjE3NzQzOTg0ODgsImp0aSI6IjU5MzdkYTFkLWRiNTgtNDRjMi04OGU5LTNhM2I1OGNjNGFiZCIsImFtYmllbnRlIjoiUFJPRFVDQU8iLCJwZmwiOiJQSiIsImlwIjoiMTc5LjEyNS44Ni45NiwgMTkyLjE2OC4xLjEzMiIsImNhdCI6IlBsMCIsImNhcnRhby1wb3N0YWdlbSI6eyJjb250cmF0byI6Ijk5MTI3MjEzNjQiLCJudW1lcm8iOiIwMDc5NjM0ODM0IiwiZHIiOjIwLCJhcGlzIjpbeyJhcGkiOjM0fSx7ImFwaSI6MzV9LHsiYXBpIjozNn0seyJhcGkiOjM3fSx7ImFwaSI6NDF9LHsiYXBpIjo3Nn0seyJhcGkiOjc4fSx7ImFwaSI6ODB9LHsiYXBpIjo4M30seyJhcGkiOjg3LCJncnVwb3MiOlt7ImNvIjoiMiIsInVybHMiOlsiKjsuKiJdfV19LHsiYXBpIjo5M30seyJhcGkiOjU2Nn0seyJhcGkiOjU4Nn0seyJhcGkiOjU4N31dfSwiaWQiOiI1OTY0Nzc3NDAwMDE1MSIsImNucGoiOiI1OTY0Nzc3NDAwMDE1MSJ9.EFXK4ng0AU-felgagK-0tSqG08iUvq7Zov8QrsNPtRXZo8r4nbfCPurq2m4fzPvX5DZNBSVll_JDZz8QGrqAKMi68POzo1evjWSvf1jyBVncgdjwBhVa3msYPBWpObFBkzEtDv7sL7K38yRzimBBe04L7r-6E5HVk05sfIWP8H83EIG5ALqMG7xSu4hu0gDPHY5wUYwXUdtZV3OJq_YkErf5YqmsZ1u10aLPmGA02Zt4LCiyJYf-YfuSwKlxUSUk5T-InMwOwUbjoC28a4I8RVpsGsnBXAWrl4QCEjYc-q-2O6fnC_0XuQPvhRS2ff7UVVlFbbzgujjvruPZSEL4Jg'; // 🔥 ideal: usar variável de ambiente

    // 🔹 1. Criar pré-postagem
    const prePostagemResponse = await axios.post(
      'https://api.correios.com.br/prepostagem/v1/prepostagens',
      dados,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const id = prePostagemResponse.data.id;

    if (!id) {
      return res.status(400).json({
        status: 'erro',
        mensagem: 'ID da pré-postagem não retornado'
      });
    }

    console.log('ID da pré-postagem gerado:', id);

    // 🔹 2. Gerar rótulo com o ID correto
    const rotuloResponse = await axios.post(
      'https://api.correios.com.br/prepostagem/v1/prepostagens/rotulo/assincrono/pdf',
      {
        idsPrePostagem: [id], // ✅ USANDO ID DINÂMICO
        tipoRotulo: "P",
        formatoRotulo: "ET"
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Resposta do rótulo:', rotuloResponse.data.idRecibo);

    const idRecibo = rotuloResponse.data.idRecibo;


    const downloadetiqueta = await axios.get(`https://api.correios.com.br/prepostagem/v1/prepostagens/rotulo/download/assincrono/4ceef51e6d1c4b3daef51e6d1c6b3d260328`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer' // Para receber o PDF como um buffer
    });  

    // 🔹 Retorno final
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=etiqueta.pdf',
    });

    return res.send(downloadetiqueta.data);

  } catch (erro) {
    console.error('Erro no fluxo Correios:', erro.response?.data || erro.message);

    return res.status(500).json({
      status: 'erro',
      mensagem: 'Falha no fluxo Correios',
      detalhe: erro.response ? erro.response.data : erro.message
    });
  }
};