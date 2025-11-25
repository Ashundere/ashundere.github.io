const urlInput = document.getElementById("url-input")
const urlInputError = document.getElementById("url-input-error")
const shortenBtn = document.getElementById("shorten-btn")
const urlList = document.getElementById("link-list")


const accessToken = '2b7723844c9c06a75d05c917f0639242bb9e0b77';
const longUrlToShorten = 'https://www.example.com/your/long/path/here';

shortenBtn.addEventListener("click", event =>{
    if (urlInput.checkValidity()) {
        urlInputError.textContent = ""
        console.log(urlInput.value)
       shortenUrl(urlInput.value)
    }else{
        urlInputError.textContent = "Please enter a url";
        urlInput.focus();
    }
})

let recall;
try {
  recall = JSON.parse(sessionStorage.getItem("savedUrls"));
} catch (error) {
  console.error("Error parsing items from sessionStorage", e);
  recall = null;
}
if (recall == null) {
  recall = [];
}

let objectCounter = sessionStorage.getItem('ObjectCounter');
if (objectCounter === null) {
    objectCounter = 0;
} else {
     objectCounter = parseInt(objectCounter, 10); 
}

const incObjectCounter=()=>{
    objectCounter++
    sessionStorage.setItem('ObjectCounter', objectCounter.toString())
}
async function shortenUrl(longUrl) {
    const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };
    const bodyData = JSON.stringify({
        "long_url": longUrl
    });

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: bodyData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API error: ${errorData.message}`);
        }

        const data = await response.json();
        console.log('Shortened URL:', data.link);
        try {
            createListElement(data.link)
        } catch (error) {
            console.error("Failed to create new list element", error)
        } 

    } catch (error) {
        console.error('Error shortening URL:', error.message);
    }
}


const createListElement =(shortenedUrl)=>{
    const element = {
        id: objectCounter,
        longLink: urlInput.value,
        shortLink: shortenedUrl
    }
    recall.push(element);
    sessionStorage.setItem("savedUrls", JSON.stringify(recall))
    const newListElement = document.createElement("div")
    newListElement.setAttribute("id", element.id)
    const ElementIndex = recall.findIndex(
    (element) => element.id == newListElement.id
  );
    newListElement.innerHTML = `${recall[ElementIndex].longLink}          ${recall[ElementIndex].shortLink} <button class = "copy">Copy</button>`    
    urlList.appendChild(newListElement)
    incObjectCounter()
    console.log(recall)
}

const recollection = () => {
  for (let i = 0; i <= recall.length; i++) {
    const newListElement = document.createElement("div");
    newListElement.setAttribute("id", recall[i].id);
    newListElement.innerHTML = `${recall[i].longLink}          ${recall[i].shortLink} <button class = "copy">Copy</button>`
    urlList.appendChild(newListElement);
}}


window.addEventListener("load", (event) => {
  recollection();
});

async function copyClipboard(text){
    try {
        await navigator.clipboard.writeText(text)
    } catch (error) {
        console.error("Error copying to clipboard", error)
    }
}

urlList.addEventListener("click", event =>{
    if(event.target.classList.contains("copy")){
        urlId = event.target.closest("div").id
        copyClipboard(`${recall[urlId].shortLink}`)
        event.target.innerText = "Copied!"
        event.target.style.backgroundColor = "hsl(257, 27%, 26%)";
    }
})