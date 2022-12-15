$(function(){
  getUserInfo()
  $('#signout').on('click',signout)
})
// ss get username for welcome and avatar
function getUserInfo(){
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function(res){
      // console.log(localStorage.getItem('token'))
      // layui.layer.msg(res.message)
      if(res.status !==0) return console.log(res.message)

      // console.log(res)
      let username=res.data.nickname || res.data.username
      $('#welcome').html(`Welcome ${username} !`)
      // console.log(username[0].toUpperCase())

      // ss avatar conditional render
      if(!res.data.user_pic) {
        $('.layui-nav-img').hide()
        $('.avatar').html(username[0].toUpperCase()).show()
      } else {
        $('.avatar').hide()
        $('.layui-nav-img').prop('src',res.data.user_pic).show()
      }
    }
    
  })
}

// ss signout
function signout (){
  // ss 弹出层=》confirm
  layui.layer.confirm('Do you want to sign out?', {icon: 3, title:'Sign Out'}, function(index){
    //do something
    localStorage.removeItem('token')
    location.href='/login.html'
    // from layui
    layer.close(index);
  });
  
}

/* vv ======================
* layui.layer.confirm
  layui is optional, layer.comfirm is good


======================== */