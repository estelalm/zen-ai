'use strict'

const botaoLogar = document.getElementById('botao-logar')

const getUsers = async () =>{

    const url = 'https://back-login.vercel.app/usuarios'
    const response = await fetch(url)
    const usuarios = await response.json()

    return usuarios
}


const logar = async () =>{

    const usuarios = await getUsers()

    const inputUser = document.getElementById('user')
    const inputSenha = document.getElementById('senha')

    if(inputSenha.value == "" || inputUser.value == ""){
        alert('preencha todos os campos')
    }else{
        let validateStatus = false
    usuarios.forEach(usuario =>{
        if(usuario.email == inputUser.value.replace(" ", "") && usuario.senha == inputSenha.value.replace(" ", "")){
            validateStatus = true
            let userId = usuario.id

            localStorage.setItem('userId', userId)
        }
    })

    if(validateStatus){
        window.location.assign('./src/pages/home.html')
    }else{
        alert('Usuário ou senha incorretos')
    }
    }

}

botaoLogar.addEventListener('click', logar)
