$.ajaxPrefilter(function(options){
  let urlRoot='http://www.liulongbin.top:3007'
  // console.log(options.url)
  options.url= urlRoot+options.url
})

/* vv ==========================
* $.ajaxPrefilter 
  1) it will be execute before $.get/post/ajax once ajax request initiate
  2) options.url will receive url in $.get/post/ajax url key
  3) after joint of root url, options.url will be the real url in jquery ajax





============================= */