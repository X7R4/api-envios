const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const users = [];

const usuarioSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  email: String,
  senha: String, // somente senha hash aqui
  token: String,
});


// Defina a chave secreta diretamente no código
const JWT_SECRET = 'vanguardthreatseeker';
const JWT_EXPIRATION = '1h'; // Define o tempo de expiração do token



const Usuario = mongoose.model('usuario', usuarioSchema);

exports.register = async (req, res) => {
  const { nome, sobrenome, email, senha, confirmarSenha } = req.body;

  try {
    const email_existente = await Usuario.findOne({ email });

    if (email_existente) {
      return res.json({ message: 'Email já registrado.', email });
    }

    if (senha !== confirmarSenha) {
      return res.json({ message: 'Senhas não são semelhantes!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const novoUsuario = new Usuario({
      nome,
      sobrenome,
      email,
      senha: hashedPassword,
      token: '',
    });

    await novoUsuario.save();

    return res.json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error('Erro no registro:', err);
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try{
    const usuario = await Usuario.findOne({email});

    if(!usuario){
      return res.status(401).json({message: 'Email ou senha incorretos!'});
    }

    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }
    const token = jwt.sign({ email: usuario.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION
    });
  
    res.json({ token });
  }catch(err){
    console.error('Erro no login: ', err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}
