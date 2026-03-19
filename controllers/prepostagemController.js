const axios = require('axios');
const { axiosCorreiosInstance } = require('../config/axiosConfig');

exports.enviarPrepostagem = async (req, res) => {
  try {
    const dados = req.body;

    // 🔹 1. Criar pré-postagem
    const prePostagemResponse = await axios.post(
      'https://api.correios.com.br/prepostagem/v1/prepostagens',
      dados,
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzM4ODg3NjAsImlzcyI6InRva2VuLXNlcnZpY2UiLCJleHAiOjE3NzM5NzUxNjAsImp0aSI6ImI0NzFkNDQ0LWRjNTItNGFjMS04Zjg0LWVhYTI2OTk0ODNlOSIsImFtYmllbnRlIjoiUFJPRFVDQU8iLCJwZmwiOiJQSiIsImlwIjoiMTc5LjEyNS44Ni45NiwgMTkyLjE2OC4xLjEzMiIsImNhdCI6IlBsMCIsImNhcnRhby1wb3N0YWdlbSI6eyJjb250cmF0byI6Ijk5MTI3MjEzNjQiLCJudW1lcm8iOiIwMDc5NjM0ODM0IiwiZHIiOjIwLCJhcGlzIjpbeyJhcGkiOjM0fSx7ImFwaSI6MzV9LHsiYXBpIjozNn0seyJhcGkiOjM3fSx7ImFwaSI6NDF9LHsiYXBpIjo3Nn0seyJhcGkiOjc4fSx7ImFwaSI6ODB9LHsiYXBpIjo4M30seyJhcGkiOjg3LCJncnVwb3MiOlt7ImNvIjoiMiIsInVybHMiOlsiKjsuKiJdfV19LHsiYXBpIjo5M30seyJhcGkiOjU2Nn0seyJhcGkiOjU4Nn0seyJhcGkiOjU4N31dfSwiaWQiOiI1OTY0Nzc3NDAwMDE1MSIsImNucGoiOiI1OTY0Nzc3NDAwMDE1MSJ9.CpOvibNP7WUePbool1JZEwA43AfmoR3t-_n8ODneV_fKe-9gRFDm1jCwrb-PWek6mCaS-lQikyON2HQeQLTBDUdJI7zarVn3p-zteCqmCJFb78qSxPvrUjZ1tOOakslRBXIvJdtGj-9MOyC5IrpmBn_L-q3UEQkVFF5wzDEvr4MS_uCc7qM1uDUdfeL4BxMMby03VvbuZTRYbNGsgExwCjOuXW53KGwm4LQinzBdtq5v0fdA1yfTe_Ydmz6hpnhyvrZzRi0oCY3bGtG1D5GclEaPhqCDmrqDrQz48cNgRiKQ7SyA8hdROdGicwBYqwHUZtdX-hnB6XR9GP-W2boxAA',
          'Content-Type': 'application/json'
        }
      }
    );
    //console.log(prePostagemResponse.data);
    const id = prePostagemResponse.data.id;

    //res.json({
      //status: 'sucesso',
      //id: id
    //});

    const rotuloResponse = await axios.post(
      'https://api.correios.com.br/prepostagem/v1/prepostagens/rotulo/assincrono/pdf',
      {
        idsPrePostagens: [id],
        tipoRotulo: 'P',
        formatoRotulo: 'ET'
      },
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzM4ODg3NjAsImlzcyI6InRva2VuLXNlcnZpY2UiLCJleHAiOjE3NzM5NzUxNjAsImp0aSI6ImI0NzFkNDQ0LWRjNTItNGFjMS04Zjg0LWVhYTI2OTk0ODNlOSIsImFtYmllbnRlIjoiUFJPRFVDQU8iLCJwZmwiOiJQSiIsImlwIjoiMTc5LjEyNS44Ni45NiwgMTkyLjE2OC4xLjEzMiIsImNhdCI6IlBsMCIsImNhcnRhby1wb3N0YWdlbSI6eyJjb250cmF0byI6Ijk5MTI3MjEzNjQiLCJudW1lcm8iOiIwMDc5NjM0ODM0IiwiZHIiOjIwLCJhcGlzIjpbeyJhcGkiOjM0fSx7ImFwaSI6MzV9LHsiYXBpIjozNn0seyJhcGkiOjM3fSx7ImFwaSI6NDF9LHsiYXBpIjo3Nn0seyJhcGkiOjc4fSx7ImFwaSI6ODB9LHsiYXBpIjo4M30seyJhcGkiOjg3LCJncnVwb3MiOlt7ImNvIjoiMiIsInVybHMiOlsiKjsuKiJdfV19LHsiYXBpIjo5M30seyJhcGkiOjU2Nn0seyJhcGkiOjU4Nn0seyJhcGkiOjU4N31dfSwiaWQiOiI1OTY0Nzc3NDAwMDE1MSIsImNucGoiOiI1OTY0Nzc3NDAwMDE1MSJ9.CpOvibNP7WUePbool1JZEwA43AfmoR3t-_n8ODneV_fKe-9gRFDm1jCwrb-PWek6mCaS-lQikyON2HQeQLTBDUdJI7zarVn3p-zteCqmCJFb78qSxPvrUjZ1tOOakslRBXIvJdtGj-9MOyC5IrpmBn_L-q3UEQkVFF5wzDEvr4MS_uCc7qM1uDUdfeL4BxMMby03VvbuZTRYbNGsgExwCjOuXW53KGwm4LQinzBdtq5v0fdA1yfTe_Ydmz6hpnhyvrZzRi0oCY3bGtG1D5GclEaPhqCDmrqDrQz48cNgRiKQ7SyA8hdROdGicwBYqwHUZtdX-hnB6XR9GP-W2boxAA',
          'Content-Type': 'application/json'
        }
      }
    );
    console.log("ID gerado:", id);
    res.json({
      status: 'sucesso',
      id: id,
      etiqueta: rotuloResponse.data
    });

  } catch (erro) {
    console.error('Erro no fluxo:', erro.message);

    res.status(500).json({
      status: 'erro',
      mensagem: 'Falha no fluxo Correios',
      detalhe: erro.response ? erro.response.data : erro.message
    });
  }
};
