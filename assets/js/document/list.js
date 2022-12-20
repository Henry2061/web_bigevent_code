$(function(){
  // edit idEdit
  // let idEdit= 1
  // ### data 
  template.defaults.imports.dateFormat= function(date){
    // moment().format();
    return moment(date).format('DD-MM-YYYY hh:mm:ss');
  }
  let dataDoc={
    pagenum:1,
    pagesize:2,
    cate_id:'',
    state:''
  }

  
  getDocList()
  getCateList()
  
  


  function getDocList (){
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: dataDoc,
      success: function(res){
        // console.log(res.message)
        if(res.status!==0) return
        // for test render result since none list ajax
        let str=template('listTemplate',res)
        $('tbody').html(str)
        renderPage(res.total)
      }
    })
  }

  function getCateList(){
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function(res){
        if(res.status!==0) return res.message
        // console.log(res.data)
        let str=template('listCate',res)
        $('[name=cate_id]').html(str)
        layui.form.render() // render dynamic html
      }
    })
  }
// since server doesn't work, this snippet is replaced by test snippet
  $('#formFilter').on('submit',function(e){
    e.preventDefault()
    dataDoc.cate_id=$('[name=cate_id]').val()
    dataDoc.state=$('[name=state]').val()
    getDocList()
  })

  // test snippet for filter submit
  // $('#formFilter').on('submit',function(e){
  //   e.preventDefault()
  //   // console.log(1)
  //   let cate_id=$('[name=cate_id]').val()
  //   let state=$('[name=state]').val()

  //   let resTestFilter= resTest
  //   let arr=[]
  //   if(cate_id==='' && state===''){
  //     arr=resTest.data
  //   }
  //   $.each(resTest.data,function(index,value){
  //     // console.log(value)
  //     console.log(value.cate_name, cate_id)
  //     if(value.cate_name===cate_id || value.state===state){
  //       // console.log(value)
        
  //       arr.push(value)
  //       console.log(resTestFilter.data)
  //       // resTestFilter.data.push(value)
  //     }
  //   })
  //   resTestFilter.data=arr
  //   console.log(resTestFilter)
  //   let str=template('listTemplate',resTestFilter)
  //   $('tbody').html(str)
  // })

  function renderPage(total){
    // console.log(total)
    let laypage = layui.laypage;
    
    //执行一个laypage实例
    laypage.render({
      elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
      ,count: total //数据总数，从服务端得到
      ,limit: dataDoc.pagesize
      ,curr: dataDoc.pagenum
      ,layout: ['count','prev', 'page', 'next','skip','limit']
      ,limits: [2, 3, 5, 10, 20]
      ,jump: function(obj, first){
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        dataDoc.pagenum=obj.curr
        dataDoc.pagesize=obj.limit
        // console.log(dataDoc.pagenum)
        //首次不执行
        if(!first){
          //do something
          getDocList()
        }
      }
    
    });
  }

  // delete doc
  $('tbody').on('click','.btnDelete',function(){
    let id = $(this).attr('data-id')
    let deleteLen=$('.btnDelete').length
    console.log(id)
    // popup confirm layer
    layer.confirm('Are you sure to delete?', {icon: 3, title:'Hint'}, function(index){
      //do something
      // ajax delete

      $.ajax({
        method: 'GET',
        url: '/my/article/delete/'+ id,
        success: function(res){
          console.log(res.message)
        }
      })
      layer.close(index);
      if(deleteLen===1){
        dataDoc.pagenum= dataDoc.pagenum===1?1:dataDoc.pagenum-1
      }
      getDocList()
    });
  })

  // edit doc
  $('tbody').on('click','.btnEdit',function(){
    let id=$(this).attr('data-id')
    location.href='/document/post.html'
    
    // console.log(55)
    localStorage.setItem('idEdit',id)
      // window.onload=function(){
      //   editDoc()
      // }

    

  })
})

/* ======================
* all code should be in the $(f(){})




======================== */