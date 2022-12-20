$(function(){
// global var
let $image=null
let idEdit= localStorage.getItem('idEdit')
if(!idEdit) initHtml()

renderCateList()
postDoc()

// init html
function initHtml (){
  getCover()
  initEditor()
}
// async post doc
function postDoc(){
  // state data
  let state='已发布'
  $('#btnDraft').on('click',function(){
    state='草稿'
  })
  

  $('#formDoc').on('submit',function(e){
    e.preventDefault()
    // text data
    let fd= new FormData($(this)[0])
    // state data
    fd.append('state',state)
    // cover data
    $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 400,
      height: 280
    })
    .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      fd.append('cover_img',blob)
      // vv callback is async, so all the following action should be in the callback

      fd.forEach(function(v,k){
        console.log(k,v)
      })
      // ajax post
      postAjax(fd)
    })
    
    // vv cannot log fd v&k, sol:forEach
    // fd.forEach(function(v,k){
    //   console.log(k,v)
    // })

  })
  // post ajax
  function postAjax(fd){
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      // fd requires the following two config
      data: fd,
      contentType: false,
      processData: false,
      success: function(res){
        // console.log(url)
        layui.layer.msg(res.message)
        if(res.status!==0) return
        location.href='/document/list.html'
      }
    })
  }
}

// cover
function getCover (){
  // 1. 初始化图片裁剪器
  $image = $('#image')

  // 2. 裁剪选项
  let options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 4. button
  $('#btnCover').on('click',function(){
    $('#cover').click()
  })

  // 5. detect input file change event
  $('#cover').on('change',function(e){
    let files= e.target.files
    if(files.length===0) return layui.layer.msg('Please Choose Image')
    var newImgURL = URL.createObjectURL(files[0])
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
      $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
    
  })
}

// async cate render  
function renderCateList(){
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function(res){
      console.log(res.message)
      if(res.status!==0) return
      let str=template('cateList',res)
      $('[name=cate_id]').html(str)
      
      if(!idEdit) { 
        layui.form.render()
      } else {
        editDoc()
      }
      
    }
  })
}

// async edit doc
function editDoc (){
  console.log(localStorage.getItem('idEdit'))
  let id =localStorage.getItem('idEdit')
  // ajax get doc by id
    $.ajax({
    method:'GET',
    url: '/my/article/'+ id,
    success: function(res){
      console.log(res.message)
      if(res.status!==0) return
      initEditor()
      // render post html
      console.log(res.data)
      // layui.form.val('editDoc',{
      //   'title': '777'
      // })
      $('.layui-card-header').html('Edit Document')
      $('[name=title]').val(res.data.title)
      $('[name=cate_id]').val(res.data.cate_id)
      $('textarea').val(res.data.content)
      $('#image').prop('src','http://www.liulongbin.top:3007'+res.data.cover_img)
      
      console.log('http://www.liulongbin.top:3007'+res.data.cover_img)
      layui.form.render()
      getCover()
    }
  })
}


}) // entry f

/* ==================================
* initEditor() must be execute before render

* getCover() must be execute after render



 ===================================== */