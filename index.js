console.log(chrome)
let connection = 0
let myclick=()=>{
    document.getElementById('button').disabled = true;
    chrome.tabs.query({currentWindow:true,active:true},(tabs)=>{
        console.log(tabs)
        let tab  = tabs[0]
        chrome.tabs.sendMessage(tab.id,{type:"connection",value:"tryingg"})
    })
}

chrome.runtime.onMessage.addListener((obj,sender,response)=>{
    if(obj.type=="connected"){
        connection++
        document.getElementById('result').innerText = connection
    }
    if(obj.type=='connection_complete'){
        document.getElementById('response').style.display='block'
        document.getElementById('button').disabled = false;
    }
    if(obj.type=='total_connect'){
        document.getElementById('total').innerText = obj.data
    }
})


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('button').addEventListener('click', myclick);
}, false);

