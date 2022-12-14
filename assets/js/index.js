$(function(){
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    success: function(res){
      console.log(localStorage.getItem('token'))
      // layui.layer.msg(res.message)
      if(res.status !==0) return console.log(res.message)

      console.log(res)

    }
  })
})