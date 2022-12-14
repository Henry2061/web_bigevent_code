$(function(){
  // ss switch login and register link
  $('#aGoRegister').on('click',function(){
    $('.login').hide()
    $('.reg').show()
  })

  $('#aGoLogin').on('click',function(){
    $('.login').show()
    $('.reg').hide()    
  })
  // ss form verify rules
  layui.form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'Password must be 6 to 12 characters, and no spaces'
    ] 
    , repwd: function(value){
      let pwdVal=$('.reg [name=password]').val()
      if(value!==pwdVal) return 'The two passwords do not match'

    }
  })
  // ss register ajax post request
  $('#formReg').on('submit',function(e){
    e.preventDefault()
    
    let data= {
      username: $('#formReg [name=username]').val(),
      password: $('#formReg [name=password]').val()
    }
    // console.log(urlReg,data)
    $.post('/api/reguser',data,function(res){
      if(res.status!==0) return layui.layer.msg(res.message)
        
      layui.layer.msg('register success!')
      $('#formReg #aGoLogin').click()
    })
  })
  
  // ss login ajax post request
  $('#formLogin').submit(function(e){
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function(res){
        if(res.status !==0) return layui.layer.msg(res.message)
        layui.layer.msg('Login Success')
        localStorage.setItem('token', res.token)
        // console.log(res.token)
        // location.href='/index.html'
      }
    })
  })

})


/* =========================================
?? jquery attribute []
  pwdVal=$('.reg [name=password]')

* $('#formReg').on('submit',function(e){
  notice element is the form rather than btn

* e.preventDefault()
  NOT e.preventdefault()

* return {line one; line two;}
only one instruction can be followed by return






==========================================*/