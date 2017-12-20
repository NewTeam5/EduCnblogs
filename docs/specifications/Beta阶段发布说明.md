<div>
<h1 align = "center">Beta阶段发布说明</h1>
<h6 align = "right"><i>NewTeam 2017/12/18</i></h6>
<hr>
<div>
<h3>项目</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;博客园班级博客Android客户端</p>
</div>
<div id = "dire">
<h3>目录</h3>
<ul>
  <li><a href = "#f">发布方式和发布地址</a></li>
  <li><a href = "#a">新功能</a></li>
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
<h4>本地存储</h4>
<ul>
  <li>实现了本地的缓存，离线状态可查看除图片以外的已浏览过的内容</li>
</ul>
<h4>个人博客</h4>
<ul>
  <li>长按评论添加回复，自动添加@ username<br>
  <img style = "width:300px ; border:solid black 1" src = "">
  </li>
  <li>在评论中输入@，弹出该博文中已评论用户的用户名，长按或双击可添加用户名<br>
  <img style = "width:300px ; border:solid black 1" src = "">
  </li>
</ul>
<h4>班级博客-作业</h4>
<ul>
  <li>使用react native组件显示作业详情<br>
  <img style = "width:300px ; border:solid black 1" src = "">
  </li>
  <li>显示已提交列表<br>
  <img style = "width:300px ; border:solid black 1" src = "">
  </li>
</ul>
<h4>日程提醒</h4>
<ul>
  <li>在日程提醒页面的日历中标记处有作业截止的日期<br>
  <img style = "width:300px ; border:solid black 1" src = "">
  </li>
  <li>点击该日期可显示当日截止的作业，并跳转到的作业页面<br>
  <img style = "width:300px ; border:solid black 1" src = "">
  </li>
</ul>
</div>

<div id = "b">
<h3>修复的缺陷</h3><a href = "#dire">返回</a>
<ul>
  <li>部分班级作业列表页面崩溃：
    <ul>
      <li>原因：网络请求获取的数据中包含deadline = null，使用deadline时未进行检查。</li>
      <li>解决：先对获取的数据进行检查，确定变量不为null再使用。</li>
    </ul>
  </li>
  <li>作业详情页面中文乱码：
    <ul>
    <li>在WebView组件中设置baseUrl:''，解决了中文乱码的问题。</li>
    </ul>
  </li>
  <li>日程提醒只能显示一个班级的作业，且不稳定：
    <ul>
    <li>原因：只保留了最后一个班级的未截止作业的信息，且每获取一个班级的作业就渲染一次。</li>
    <li>解决：存储每个班级中未截止的作业，在最后进行渲染。</li>
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
  <!--li>作业发布
    <ul>
      <li>作业发布标题、内容可以为空</li>
      <li>作业的开始时间可以晚于截止时间</li>
    </ul>
  </li-->
</ul>
</div>

<div id = "g">
<h3>意见反馈</h3><a href = "#dire">返回</a>
<ul><li>登录App -> 我 -> 关于App</li>
<li><img style = "width:300px ; border:solid black 1" src = "">
<ul>
  <li>点击意见反馈，可以填写问卷，所有题目均为选答，可以反馈bug，或对界面和功能提出改进建议</li>
  <li>点击项目地址，访问项目</li>
</ul></li>
</ul>
</div>
</div>