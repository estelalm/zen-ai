'use strict'

import { loadTranslation, translate } from "./tradutor.js"

const inputUsuario = document.getElementById('user-input')
const botaoEnviar = document.getElementById('enviar')

const botaoPortugues = document.getElementById('portugues')
const botaoIngles = document.getElementById('ingles')

const textoPortugues = document.getElementById('textPt')
const textoIngles = document.getElementById('textEng')

const criarResposta = async () =>{

    const containerRespostas = document.getElementById('container-respostas')

    const containerResposta = document.createElement('div')
    containerResposta.classList.add('resposta')

}

const consultaGemini = async (question) =>{



    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + keyGoogle;

    const requestData = {
        contents: [
            {
                parts: [
                    {
                        text: `${question}`
                    }

                ]
            }
        ]
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
        const responseTextIa = data.candidates[0].content.parts[0].text
        respostaIa(responseTextIa)
    })
    .catch(error => console.error('Error: ' + error))
}

const respostaIa = async (responseTextIa) =>{
    textoPortugues.textContent = responseTextIa
    textoIngles.textContent = await loadTranslation(responseTextIa)
 }

botaoEnviar.addEventListener('click', (() =>{
    const question = inputUsuario.value
    consultaGemini(question)
}))

botaoPortugues.addEventListener('click', () =>{
    textoIngles.classList.add('hidden')
    textoPortugues.classList.remove('hidden')
})
botaoIngles.addEventListener('click', () =>{
    textoIngles.classList.remove('hidden')
    textoPortugues.classList.add('hidden')
})