let socket = io();

$('#btnStart').click(() => {
    if($('#inpUsername').val() == '') {
        return alert('Please Enter Username')
    }
    socket.emit('login',{
        username:$('#inpUsername').val()
    })
    $('#inpUsername').val('');
})

socket.on('logged_in',() => {
    $('.loginbox').hide();
    $('.secret').show();
})


$('#btnSend').click(() => {
    socket.emit('msg_send',{
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
    if(e.keyCode == '13')
    {
        if(ele.id == 'inpUsername') {
            if($('#inpUsername').val() == '') {
                return alert('Please Enter Username')
            }
            $('#btnStart').click();
            $('#inpUsername').val('');
            alert('Message Sent Successfully')
        }
        else if(ele.id == 'inpMsg' || ele.id =='inpDefault')
        {
            if($('#inpMsg').val() == '' && $('#inpDefault').val() == '') {
                return alert('Please Enter Message And Send To!')
            }
            if($('#inpMsg').val() == '') {
                return alert('Please Enter Message')
            }
            if($('#inpDefault').val() == '') {
                return alert('Please Enter Username Of Other User')
            }
            $('#btnSend').click();
            $('#inpMsg').val('');
            $('#inpDefault').val('');
        }
    }
})

socket.on('msg_rcvd',(data) => {
    $('#ulMsgList').append($(`<li class="card">${data.msg}</li>`))
})