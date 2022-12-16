// cropper=================
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

// ss upload
$('#btnUpload').on('click',function(){
  $('input').click()

})

$('input').on('change',function(e){
  console.log(e)
  if(e.target.files.length!==1) {
    return layui.layer.msg('Please choose image')
  }
  // copy from cropper
  let file = e.target.files[0]
  let newImgURL = URL.createObjectURL(file)
  $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
})

// confirm btn 
$('#btnConfirm').on('click',function(){
  // ss croppered image to base64 by cropper snippet
  var dataURL = $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 100,
    height: 100
  })
  .toDataURL('image/png')  // 将 Canvas 画布上的内容，转化为 base64 格式的字符串


  $.ajax({
    method: 'POST',
    url: '/my/update/avatar',
    data: {
      avatar: dataURL
    },
    success: function(res){
      layui.layer.msg(res.message)
      if(res.status!==0) return console.log(res.message)
      console.log(res)
      window.parent.getUserInfo()
    }
  })

})


/* =============================
* $('button.layui-btn') is good

*   $('input [name=file]').click(): invalid



=============================== */