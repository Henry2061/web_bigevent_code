$(function(){
  let form= layui.form
  let layer=layui.layer
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'It should be 6-12 characters'
    ],
    samepwd: function(value){
      if(value===$('[name=oldPwd').val()){
        return 'New password should be different from current password.'
      }
    },
    repwd: function(value){
      if(value!==$('[name=newPwd]').val()) {
        return 'Two password are different.'
      }
    }

  });      

  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function(res){
        layer.msg(res.message)
        if(res.status!==0) return console.log(res.message)
        $('.layui-form')[0].reset()
      }
    })
  })
})


/* ========================================
* DOM : form element: reset() method
============================================ */