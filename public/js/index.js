const FormLogin = document.getElementById('formLogin');
const FormCadastro = document.getElementById('formCadas');

class Registro {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}

class Login {
    constructor(email, senha) {
        this.email = email;
        this.senha = senha;
    }
}

// Cadastro aqui:
if (FormCadastro) {
    FormCadastro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('emailC').value.trim().toLowerCase();
        const senha = document.getElementById('senhaC').value;
        const senha2 = document.getElementById('senhaC2').value;

        if (senha != senha2) {
            alert('As senhas não são iguais.');
            return;
        }

        const usuario = new Registro(nome, email, senha);

        try {
            const resposta = await fetch('/api/cadastro', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    nomeC: usuario.nome,
                    emailC: usuario.email,
                    senhaC: usuario.senha
                })
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(resultado.erro);
            }

            alert('conta criado com sucesso');
            FormCadastro.reset();
            window.location.href = 'inicio.html';

        } catch (erro) {
            console.log(erro.message)
            alert(erro.message)
        }
    });
}

// Login aqui:
if (FormLogin) {
    FormLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim().toLowerCase();
        const senha = document.getElementById('senha').value;

        const usuario = new Login(email, senha);

        try {
            const resposta = await fetch('/api/login',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    emailL: usuario.email,
                    senhaL: usuario.senha
                })
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(resultado.erro);
            }

            alert(`Bem vindo ${usuario.email}!`);
            window.location.href = 'inicio.html';

        } catch (erro) {
            console.log(erro.message)
            alert(erro.message);
        }
    });
}