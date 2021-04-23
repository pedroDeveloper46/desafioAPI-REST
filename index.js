const express = require('express')
const servidor = express()
const moduloCPF = require('./CPF')

servidor.use(express.json())

const usuarios = []
const cursos = []

servidor.post('/usuarios', (req, res) => {
    const nome = req.body.nome
    const idade = req.body.idade
    const cpf = req.body.cpf
    const id = usuarios.length + 1

    let cpfExists = false

    usuarios.map((usu) => {
        if (usu.cpf == cpf) {
            cpfExists = true
        }
    })

    if (cpfExists) {
        return res.status(400).json({ erro: "CPF existente" })
    }

    if (!moduloCPF.isCpf(cpf)) {
        return res.status(400).json({ erro: "CPF INVÁLIDO" })
    }

    usuarios.push({
        id,
        nome,
        idade,
        cpf,



    });

    return res.status(201).json(usuarios)


})

servidor.get('/', (req, res) => {
    return res.status(200).json(usuarios)
})

servidor.put('/usuarios/:id', (req, res) => {
    const id = req.params.id
    const idade = req.body.idade

    usuarios[id - 1].idade = idade


    return res.status(200).json(usuarios)
})

servidor.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id

    let indice = -1

    usuarios.map((usuario, index) => {

        if (id == usuario.id) {
            indice = index
        }
    })

    if (indice < 0) {
        return res.status(400).json({ erro: "Não existe essa identificador" })
    }

    usuarios.splice(indice, 1)
    cursos.splice(indice, 1)
    return res.status(200).json({ Sucesso: "Usuario deletado com Sucesso!!!" })

})

/*-------------- Rotas cursos----------------*/
servidor.post('/cursos/:id', (req, res) => {
    const id = req.params.id


    let indice = -1
    usuarios.map((usu, index) => {
        if (usu.id == id) {
            usu.curso = req.body.curso
            indice = index
            cursos.push(usu.curso)
        }
    })

    if (indice < 0) {
        return res.status(400).json({ erro: "Identificador não encontrado" })
    }

    return res.status(201).json(usuarios)
})

servidor.get('/cursos', (req, res) => {
    return res.status(200).json(cursos)
})

servidor.put('/cursos/:id', (req, res) => {
    const id = req.params.id
    const curso = req.body.curso

    let indice = -1
    usuarios.map((usu, index) => {
        if (usu.id == id) {
            indice = index
            usu.curso = curso
            cursos[indice] = curso
        }
    })

    if (indice == -1) {
        return res.status(400).json({ erro: "Identificador não encontrado" })
    }

    return res.status(201).json(usuarios)
})

servidor.delete('/cursos/:id', (req, res) => {
    const id = req.params.id

    let indice = -1

    usuarios.map((usu, index) => {
        if (usu.id == id) {
            indice = index
            usu.curso = ""

        }
    })

    if (indice == -1) {
        return res.status(400).json({ erro: "Identificador não encontrado" })
    }


    cursos.splice(indice, 1)
    return res.status(200).json({ Sucesso: "Deletado com Sucesso!!" })

})





servidor.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000/`)
})