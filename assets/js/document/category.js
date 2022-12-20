
// ss get document category list
getCateList();
function getCateList (){
  $.ajax({
    method:'GET',
    url: '/my/article/cates',
    success: function(res){
      // console.log(res)
      if(res.status!==0) return 
      let strTemplate= template('template-category',res)
      $('tbody').html(strTemplate)
    }
  })
}

// ss popup for add category
let indexAdd=null
$('#addCategory').on('click',function(){
  indexAdd=layer.open({ // layui popups close method require index
    type: 1,
    area: ['450px', '250px'],
    title: 'Add Category'
    ,content: $('#popupAdd').html()
  });     
    
})

// ss add category ajax post
// $('body').on('submit','#popupForm',function(e){
//   e.preventDefault()
//   $.ajax({
//     method: 'POST',
//     url: '/my/article/addcates',
//     data: $(this).serialize(),
//     success: function(res){
//       layui.layer.msg(res.message)
//       if(res.status!==0) return console.log(res)
//       console.log('success')


//     }
//   })
// })
// test snippet for ajax post request, test is approved, so the problem is addcates API doesn't work right now, test it later would be good choice, after passing with postman
// nn agency way to bind dynamic element
$('body').on('submit','#popupFormAdd',function(e){
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/my/userinfo',
    data: {
      id:9654282387,
      nickname: 'wangfang',
      email: 'wangfang.@gmail.com'
    },
    success: function(res){
      layui.layer.msg(res.message)
      if(res.status!==0) return console.log(res)
      console.log('success')
      getCateList()
      layer.close(indexAdd)

    }
  })
})

// ss edit btn-----------------------
// edit btn is dynamic element
let indexEdit=null
$('tbody').on('click','.btnEdit',function(){
  // console.log($(this).attr('data-id'))
  
  indexEdit=layer.open({ // layui popups close method require index
    type: 1,
    area: ['450px', '250px'],
    title: 'Edit Category'
    ,content: $('#popupEdit').html()
  })

  // ---- get ajax data for edit popup
  let id= $(this).attr('data-id')
  console.log(id)
  $.ajax({
    method:'GET',
    url: '/my/article/cates/'+id,
    success: function(res){
      if(res.status!==0) return res.message
      // // method 1
      // $('#cateTitle').val(res.data.name)
      // $('#cateAlias').val(res.data.alias)
      // method 2
      layui.form.val('formEdit',res.data)
    }
  })  
})

// ss confirm edit btn----
$('body').on('submit','#popupFormEdit',function(e){
  console.log(34)
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/my/article/updatecate',
    data: $(this).serialize(),
    success:function(res){
      layui.layer.msg(res.message)
      if(res.status!==0) return console.log(res.message)
      getCateList()
      layui.layer.close(indexEdit)
    }
  })
  
})

// ==== delete event

$('tbody').on('click','.btnDelete',function(){
  let id= $(this).attr('data-id')
  console.log(id)
  layui.layer.confirm('Do you want to delete?', {icon: 3, title:'Hint'}, function(index){
    //do something
    // deleteCate()
    $.ajax({
      method: 'GET',
      url: '/my/article/deletecate/'+id,
      success: function(res){
        layui.layer.msg(res.message)
        if(res.status!==0) return console.log(res.message)
      }
    })
    layui.layer.close(index);
  })

})

// ----delete cate
// function deleteCate(){
//   $.ajax({
//     method: 'GET',
//     url: '/my/article/deletecate/'+id,
//     success: function(res){
//       layui.layer.msg(res.message)
//       if(res.status!==0) return console.log(res.message)
//     }
//   })
// }

/* ============================
* layui popups close method require index

* agency way to bind dynamic element

================================ */