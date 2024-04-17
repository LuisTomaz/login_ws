const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;


// ---------------- login -------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));



const usuarios = [
    { id: 1, nome: 'UsuarioTeste', email: 'usuario@teste.com', senha: 'senha123' }
];


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});



app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario || usuario.senha !== senha) {
        return res.status(401).send('Credenciais inválidas');
    }

    res.redirect('/sucesso.html');

});


// ----------- cadastro -------------------

app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    
    const usuarioExistente = usuarios.find(u => u.email === email);
    if (usuarioExistente) {
        return res.status(400).send('Este email já está cadastrado');
    }

    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email,
        senha
    };

    usuarios.push(novoUsuario);

    res.redirect('/login.html');
});


// --- abrir server ---

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);

});

