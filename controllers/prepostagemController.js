const axios = require('axios');

exports.enviarPrepostagem = async (req, res) => {
  try {
    const dados = req.body;

    const TOKEN = 'eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzQ2NjU1MjMsImlzcyI6InRva2VuLXNlcnZpY2UiLCJleHAiOjE3NzQ3NTE5MjMsImp0aSI6IjEyZGI2N2NkLTU1MzQtNDZkOC05Mzg5LTFiYTE2OTY1YjM5OSIsImFtYmllbnRlIjoiUFJPRFVDQU8iLCJwZmwiOiJQSiIsImlwIjoiMTc5LjEyNS44Ni45NiwgMTkyLjE2OC4xLjEzMiIsImNhdCI6IlBsMCIsImNhcnRhby1wb3N0YWdlbSI6eyJjb250cmF0byI6Ijk5MTI3MjEzNjQiLCJudW1lcm8iOiIwMDc5NjM0ODM0IiwiZHIiOjIwLCJhcGlzIjpbeyJhcGkiOjM0fSx7ImFwaSI6MzV9LHsiYXBpIjozNn0seyJhcGkiOjM3fSx7ImFwaSI6NDF9LHsiYXBpIjo3Nn0seyJhcGkiOjc4fSx7ImFwaSI6ODB9LHsiYXBpIjo4M30seyJhcGkiOjg3LCJncnVwb3MiOlt7ImNvIjoiMiIsInVybHMiOlsiKjsuKiJdfV19LHsiYXBpIjo5M30seyJhcGkiOjU2Nn0seyJhcGkiOjU4Nn0seyJhcGkiOjU4N31dfSwiaWQiOiI1OTY0Nzc3NDAwMDE1MSIsImNucGoiOiI1OTY0Nzc3NDAwMDE1MSJ9.BgpRbahu4I_owQMK8SQu7Rw3x1INFwtLrneHnMq10-BS4NeXfLYr07c-PB5LlTuIV8AwHMwYFnA9NlPhJvzjijRwGz7WiEreI-LJ849s84wsLz_sKiUoL3LVjvTk4yCfL_BKb111tQkkkvgwohGjT3ryOatEkNSAtX3naLergAJN5UY8Oty_1w9cFd8enY3zsLb1bTDVUzcCVR0NHr_1QTzu8XO4wrfinv3khsRmVvay-d1ZA03iiSQlMPBlJD3APnLpU2dlHwK4pYEpnS8a2RwfQ1GuBRBwZo9J4Xkv4JQY0uwUvgixg-KOCGsJSNFICs_qWrH8BOJHGHphWrdVbg'; // 🔥 ideal: usar variável de ambiente

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


    const downloadetiqueta = await axios.get(`https://api.correios.com.br/prepostagem/v1/prepostagens/rotulo/download/assincrono/224c5a00a1ba46c48c5a00a1ba26c4260401`, {
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