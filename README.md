<div>
<h1 align = "center">Alpha阶段发布说明</h1>
<h6 align = "right"><i>NewTeam 2017/11/12</i></h6>
<hr>
<div>
<h3>项目</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;博客园班级博客Android客户端</p>
</div>
<div id = "dire">
<h3>目录</h3>
<ul>
  <li><a href = "#f">发布方式和发布地址</a></li>
  <li><a href = "#a">功能</a></li>
  <li><a href = "#b">修复的缺陷</a></li>
  <li><a href = "#c">对运行环境的要求</a></li>
  <li><a href = "#d">安装方法</a></li>
  <li><a href = "#e">已知的问题和限制</a></li>

  <li><a href = "#g">意见反馈</a></li>
</ul>
</div>
<hr>

<div id = "f">
<h3>软件的发布方式以及发布地址</h3><a href = "#dire">返回</a>
<p>博客园-班级博客移动客户端目前发布于酷安网移动应用平台，下载地址如下：</p>
<a href = "https://www.coolapk.com/apk/167396">博客园-班级博客移动客户端（android）</a>
</div>

<div id = "a">
<h3>功能</h3><a href = "#dire">返回</a>
<h4>用户登录和退出<br>
<img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112154714419-1474322082.png"> 
<img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112154731903-851986446.png"> 
<img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112154311481-47066743.jpg"></h4>
<h4>个人博客</h4>
<ul>
  <li>查看个人博客<br>
  <img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112154237763-1631821283.jpg">
  </li>
  <li>查看博文详情<br>
  <img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112155638106-1870521640.jpg">
  </li>
  <li>查看评论和回复<br>
  <img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112155559419-1489510806.jpg">
  </li>
  <li>添加评论和回复<br>
  <img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112154208481-26544026.png">
  </li>
</ul>
<h4>班级博客</h4>
<ul>
  <li>查看个人所在班级<br>
  <img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112155540841-1161149191.jpg"> 
  <img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112154144559-53733028.jpg">
  </li>
  <li>成员
    <ul>
      <li>查看班级成员<br>
      <img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112154945841-1846024947.jpg">
      </li>
      <li>添加班级成员（教师和助教）<br>
      <img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112154824434-427630587.png">
      </li>
    </ul>
  </li>
  <li>作业
    <ul>
      <li>查看作业列表，显示未结束作业的数量<br>
      <img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112155428747-1855668863.jpg">
      </li>
      <li>查看作业详情、提交作业<br>
      <img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112155453013-2045793416.jpg">
      </li>
      <li>发布作业（教师和助教）<br>
      <img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112154857200-510137064.png">
      </li>
    </ul>
  </li>
</ul>
</div>

<div id = "b">
<h3>修复的缺陷</h3><a href = "#dire">返回</a>
<ul>
  <li>页面的回退：
    <ul>
      <li>解决了退出登录后按返回键仍会回到用户页面的问题，解决后点击退出登录按返回键直接退出程序</li>
      <li>解决了登录后仍会回到登录页面和启动页面的问题，解决后点击返回键会退出程序</li>
    </ul>
  </li>
  <li>时间格式：
    <ul>
    <li>发布作业的时间不按格式输入将无法被API识别，添加日历和时间选择组件，限制了时间格式</li>
    </ul>
  </li>
  <li>网络请求
    <ul>
    <li>解决了网络请求失败程序崩溃的问题，解决后进行异常处理，并显示网络请求失败的信息</li>
    </ul>
  </li>
</ul>
</div>

<div id = "c">
<h3>对运行环境的要求</h3> <a href = "#dire">返回</a>
<ul>
  <li>目前仅支持android系统</li>
  <li>为保证使用效果，请保持网络连接</li>
</ul>
</div>

<div id = "d"> 
<h3>安装方法</h3><a href = "#dire">返回</a>
<p>下载安装包，点击安装、确认即可</p>
</div>

<div id = "e">
<h3>已知的问题和限制</h3><a href = "#dire">返回</a>
<ul>
  <li>网页的限制：
    <ul>
    <li>登录使用网站的页面，登录成功后会显示授权码页面， 目前无法隐藏</li>
    <li>作业详情使用网站的页面，点击右上角的图标会要求用户登录</li>
    </ul>
  </li>
  <li>评论和回复：
    <ul>
      <li>回复时无法自动添加回复对象需用户手动添加@Username</li>
      <li>评论内容无法换行</li>
    </ul>    
  </li>
  <li>作业发布
    <ul>
      <li>作业发布标题、内容可以为空</li>
      <li>作业的开始时间可以晚于截止时间</li>
    </ul>
  </li>
</ul>
</div>



<div id = "g">
<h3>意见反馈</h3><a href = "#dire">返回</a>
<ul><li>登录App -> 我 -> 关于App</li>
<li><img style = "width:300px ; border:solid grey" src = "http://images2017.cnblogs.com/blog/1254203/201711/1254203-20171112154101075-692414164.jpg">
<ul>
  <li>点击意见反馈，可以填写问卷，所有题目均为选答，可以反馈bug，或对界面和功能提出改进建议</li>
  <li>点击项目地址，访问项目</li>
</ul></li>
</ul>
</div>
</div>