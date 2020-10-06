let socket = io();

$('#btnStart').click(() => {
    if ($('#inpUsername').val() == '' || $('#inpPassword').val() == '') {
        return alert('Please Enter All Fields')
    }
    socket.emit('login', {
        username: $('#inpUsername').val(),
        password: $('#inpPassword').val()
    })
    $('#inpUsername').val('');
    $('#inpPassword').val('');
})


socket.on('logged_in', (data) => {
    $('.login-container').hide();
    $('.secret').show();
    if (data.user == 'existing') {
        alert('Existing User successflly loginned')
    }
    else {
        alert('New user created')
    }
})

socket.on('login_failed', () => {
    window.alert("Wrong Username Or Password! Try Again!")
})


$('#btnSend').click(() => {
    socket.emit('msg_send', {
        to: $('#inpDefault').val(),
        msg: $('#inpMsg').val()
    })
    $('#inpDefault').val('');
    $('#inpMsg').val('');
    alert('Message Sent Successfully')
})

//Some Validation
$(document).keydown((e) => {
    let ele = e.target;
    if (e.keyCode == '13') {
        if (ele.id == 'inpUsername' || ele.id == 'inpPassword') {
            $('#btnStart').click();
        }
        else if (ele.id == 'inpMsg' || ele.id == 'inpDefault') {
            if ($('#inpMsg').val() == '') {
                return alert('Please Enter Message')
            }
            $('#btnSend').click();
            $('#inpMsg').val('');
            $('#inpDefault').val('');
        }
    }
})

socket.on('msg_rcvd', (data) => {
    $('#ulMsgList').append($(`<li class="card">[${data.from}] : ${data.msg}</li>`))
    alert('New Message Recieved');
});

