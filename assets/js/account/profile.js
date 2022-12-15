$(function(){
  let form= layui.form
  form.verify({
    nickname: [
      /^[\S]{0,6}$/
      ,'It should be less than 6 characters'
    ] 
  });      

  getProfile()

  $('#btnReset').on('click',function(e){
    e.preventDefault()
    getProfile()
  })

  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function(res){
        layer.msg(res.message)
        if(res.status!==0) return console.log(res.message)
        window.parent.getUserInfo()
      }
    })
  })
})

function getProfile(){
  $.ajax({
    method: 'GET',
    url:'/my/userinfo',
    success: function(res){
      if(res.status!==0) return console.log(res.message)
      console.log(res)
      layui.form.val('profileForm',res.data)
    }
  })
}

/* ========================================
*   let form= layui.form is required

* $('input [name=email]') is invalid

* layui.form.val() 
  内置模块=>表单=>赋值/取值
  replaces:
    $('.layui-input-block [name=username]').val(res.data.username)
    $('.layui-input-block [name=nickname]').val(res.data.nickname)
    $('.layui-input-block [name=email]').val(res.data.email)

? let form= layui.form doesn't work for form.val

* window.parent.getUserInfo()
============================================ */