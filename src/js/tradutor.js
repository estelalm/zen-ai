


export async function translate (text) {
    let endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=pt&to=en`
        const options = {
            method: "POST",
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': 'brazilsouth',
                'Content-Type':'application/json'
            },
            body: `[ {'text': '${text}'}]`
        }
        const result = await fetch(endpoint, options).then( response => {
            if (!response.ok) {
                console.log(response.status)
            }
    
            let translation = response.json()
            return translation
        })
    
        return result
    }

    export async function loadTranslation(text){
        const translatedText = await translate(text).then(data => {
            const translated = data[0].translations[0].text
            return translated
    })
    
        return translatedText
    }