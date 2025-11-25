const urlInput = document.getElementById("url-input")
const urlInputError = document.getElementById("url-input-error")
const shortenBtn = document.getElementById("shorten-btn")
const urlList = document.getElementById("link-list")


const accessToken = '2b7723844c9c06a75d05c917f0639242bb9e0b77';
const longUrlToShorten = 'https://www.example.com/your/long/path/here';

shortenBtn.addEventListener("click", event =>{
    if (urlInput.checkValidity()) {
        urlInputError.textContent = ""
        alert("Form Submitted Successfully");//replace with shortenurl function
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
        return data.link;

    } catch (error) {
        console.error('Error shortening URL:', error.message);
    }
}

// shortenUrl(longUrlToShorten)

const createListElement =(shortenedUrl)=>{
    const element = {
        longLink: urlInput.value,
        shortLink: shortenedUrl
    }
    recall.push(element);
    sessionStorage.setItem("savedUrls", JSON.stringify(recall));    
}