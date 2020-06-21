let socket = io();

$('.loginbox').show();
$('.secret').hide();

$('#btnStart').click(() => {
    socket.emit('login',{
        username:$('#inpUsername').val()
    })
})

socket.on('logged_in',() => {
    $('.loginbox').hide();
    $('.secret').show();
})

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
        else if(ele.id == 'inpMsg')
        {
            if($('#inpMsg').val() == '') {
                return alert('Please Enter Message')
            }
            $('#btnSend').click();
        }
    }

})