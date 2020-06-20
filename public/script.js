let socket = io();
let btnSend = document.getElementById('btnSend');
let ulMsgList = document.getElementById('ulMsgList');

window.addEventListener('keydown',(event) => {
    if(event.code == 'Enter') {
        let inpMsg = document.getElementById('inpMsg');
        if(inpMsg.value == '') {
            return alert("Empty Message!")
        }
        socket.emit('msg_send', {
            msg: inpMsg.value
        })
        inpMsg.value = '';
    }
})

btnSend.onclick = function () {
    let inpMsg = document.getElementById('inpMsg');
    if(inpMsg.value == '') {
        return alert("Empty Message!")
    }
    socket.emit('msg_send', {
        msg: inpMsg.value
    })
    inpMsg.value = '';
}

socket.on('msg_rcvd',(data) => {
    let container = document.createElement('li');
    container.innerText = data;
    container.classList.add('card');
    ulMsgList.append(container);
})