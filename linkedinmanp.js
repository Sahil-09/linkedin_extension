(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        if (obj.type == "connection") {
            let connectbtn = document.querySelectorAll('button.artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.search-primary-action__state-action-btn--omit-icon');
            let button = [];
            connectbtn.forEach((elem) => {
                if (!!elem.querySelector("li-icon[type='connect']")) button.push(elem);
            });
            if(button.length>0) {
                chrome.runtime.sendMessage({type: 'total_connect',data:button.length})
                let timer = setInterval(() => {
                    if (button.length == 0) {
                        chrome.runtime.sendMessage({type: 'connection_complete'})
                        clearInterval(timer)
                    } else {
                        let btn = button.pop()
                        btn.click()
                        setTimeout(() => {
                            let sendbtn = document.querySelector("button[aria-label='Send now']")
                            if (sendbtn)
                                sendbtn.click()
                            chrome.runtime.sendMessage({type: 'connected'})
                        }, 700)
                    }
                }, 1700)
            }else{
                chrome.runtime.sendMessage({type: 'connection_complete'})
            }
        }
    })
})()
