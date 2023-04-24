let scrapeEmails = document.getElementById('scrapeEmails');


let list = document.getElementById("emailList");


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let emails = request.emails;
    
    if(emails == null || emails.length == 0){
        let li = document.createElement('li');
        li.innerText = "No emails found";
        list.appendChild(li);
    } else{
        emails.forEach((email) => {
            let li = document.createElement("li");
            li.innerText = email;
            list.appendChild(li);
        })
    }
})


scrapeEmails.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: scrapeEmailsFromPage,
    });
})


function scrapeEmailsFromPage(){
    const emailRegEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/gm;

    let emails = document.body.innerHTML.match(emailRegEx);

    chrome.runtime.sendMessage({emails});
}


const btn = document.getElementById('scrapeEmails');


btn.addEventListener('click', () => {
    btn.style.display = 'none';
    const header = document.getElementById('header');
    header.style.display ='block';
});