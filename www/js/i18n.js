const xhttp = new XMLHttpRequest()
let langDocument = {}

const switchLanguage = (language) => {
    xhttp.open("GET", "i18n/" + language + ".json", true)
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send()
}

xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        langDocument = JSON.parse(this.responseText)
        processLangDocument()
    }
}

const processLangDocument = () => {
    const tags = document.querySelectorAll('span,img,a,label,li,option,h1,h2,h3,h4,h5,h6,p')
    Array.from(tags).forEach(function(value, index) {
        const key = value.dataset.langkey
        if(langDocument[key]) value.innerText = langDocument[key]
    })
}

// Parse QueryString
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const lang = urlParams.get('lang') || "fr"
switchLanguage(lang)