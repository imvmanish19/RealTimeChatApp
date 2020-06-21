let socket = io();

$('#btnStart').click(() => {
    if($('#inpUsername').val() == '') {
        return alert('Please Enter Username')
    }
    socket.emit('login',{
        username:$('#inpUsername').val()
    })
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
        }
    }
})