<div style = "margin:10px;">
<h1 align = "center">Beta 阶段项目计划</h1>
<h5 align = "right"><i>NewTeam</i></h5>
<hr>
<div  style = "padding:10px;"  >
  <h3>目标</h3>
  <ul>
    <li>实现用户数量的目标。</li>
    <li>在多个平台发布</li>
    <li>完成稳定运行、界面优雅的客户端</li>
    <li>充分测试，避免发布后出现bug影响用户使用</li>
    <li>及时更新开发文档</li>
    <li>合理安排时间，避免和其他科目产生严重冲突</li>
  </ul>
</div>
<hr>
<div style = "padding:10px;"  >
  <h3>更新</h3>
  <ul>
    <li>修复bug
      <ul>
        <li>“我的班级”无法加载</li>
        <li>“所有作业”导致app崩溃</li>
      </ul>
    </li>
    <li>功能优化
      <ul>
        <li>登录：使用app登陆页面</li>
        <li>评论：
          <ul>
            <li>回复评论自动添加@ username</li>
            <li>能够换行</li>
            <li>评论和回复按照上下文显示</li>
          </ul>
        </li>
        <li>作业详情：使用app页面
          <ul>
            <li>查看作业标题、内容、发布者、开始时间、截止时间、剩余时间</li>
            <li>提交作业、修改作业</li>
            <li>显示已提交成员（显示成员名称、作业名称、提交时间）</li>
            <li>显示未提交成员</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>界面优化：按照一定的标准、框架形成统一的风格</li>
    <li>本地存储：在本地进行缓存，浏览过的页面无需再次进行网络请求。
      <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在重新进入app、刷新页面、页面没有缓存且网络链接良好的情况下进行网络请求，其他情况下，从本地缓存中获取。
    </li>
    <li>日程提醒功能：提醒用户作业截止的相关信息
      <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单独占用一个页面，以日历的形式表现，有作业截止的日期显示成不同的颜色，点击可以在下方显示详情，包括到该作业页面跳转的链接。
    </li>
  </ul>
  <img src = "https://images2018.cnblogs.com/blog/1254203/201711/1254203-20171128121558644-626782463.png">
</div>
<hr>
<div style = "padding:10px;"  >
  <h3>任务拆解</h3>
  <table style = "width:100%">
    <colgroup>
      <col style = "width:15%">
      <col style = "width:65%">
      <col style = "width:20%">
    </colgroup>
    <thead>
      <th>负责人</th><th>任务</th><th>截止时间</th>
    </thead>
    <tbody>
      <tr><th rowspan = "7">安万贺</th><td>查找、了解本地存储的方法，确定使用的技术</td><td>11.29</td></tr>
      <tr><td>学习本地存储的方法和技术</td><td>12.1</td></tr>
      <tr><td>封装关于班级作业的API</td><td>12.2</td></tr>
      <tr><td>确定使用本地存储的内容，设计本地存储结构、方案</td><td>12.5</td></tr>
      <tr><td>完成班级作业的本地存储</td><td>12.7</td></tr>
      <tr><td>完成班级成员的本地存储</td><td>12.9</td></tr>
      <tr><td>完成所有必要内容的本地存储</td><td>12.12</td></tr>
      <tr><th rowspan = "8">王梓嘉</th><td>完成作业详情页面框架</td><td>11.30</td></tr>
      <tr><td>完成作业标题、内容的显示</td><td>12.1</td></tr>
      <tr><td>完成提交作业和修改提交的功能</td><td>12.3</td></tr>
      <tr><td>完成已提交人员名单和未提交人员名单的显示</td><td>12.4</td></tr>
      <tr><td>完成已提交人员名单和未提交人员到个人博客的跳转</td><td>12.6</td></tr>         
      <tr><td>把评论和回复分开，点击按钮添加评论，点击评论添加回复</td><td>12.8</td></tr>
      <tr><td>在回复中自动@ username</td><td>12.10</td></tr>
      <tr><td>解决评论回复不能换行的问题</td><td>12.12</td></tr>
      <tr><th rowspan = "5">李奕君</th><td>完成日历显示页面，突出显示今天的日期</td><td>12.1</td></tr>
      <tr><td>完成消息提醒的组件以及日期与组件的链接</td><td>12.3</td></tr>
      <tr><td>获取所有未完成作业的日期，按日期分类整理</td><td>12.6</td></tr>
      <tr><td>在关联的日期上显示不同颜色</td><td>12.8</td></tr>
      <tr><td>完成日程提示功能</td><td>12.11</td></tr>
      <tr><th rowspan = "7">窦鑫泽</th><td>学习React Native入门基础</td><td>11.29</td></tr>
      <tr><td>运行demo，学习和了解React Native组件</td><td>12.1</td></tr>
      <tr><td>学习本地存储的技术和方法</td><td>12.3</td></tr>
      <tr><td>了解本地存储的结构、方案</td><td>12.5</td></tr>
      <tr><td>完成个人博客首页的本地存储</td><td>12.8</td></tr>
      <tr><td>完成博文详情页面的本地存储</td><td>12.10</td></tr>
      <tr><td>完成所有必要内容的本地存储</td><td>12.12</td></tr>
      <tr><th rowspan = "6">李欣泽</th><td>测试所有页面及按钮的跳转、回退功能</td><td>11.30</td></tr>
      <tr><td>测试作业详情的页面的作业内容显示、作业修改、提交功能</td><td>12.3</td></tr>
      <tr><td>测试作业提交名单的显示和跳转功能</td><td>12.5</td></tr>
      <tr><td>测试个人博客的本地存储功能</td><td>12.7</td></tr>
      <tr><td>测试所有页面的显示是否存在异常或者不协调</td><td>12.9</td></tr>
      <tr><td>测试班级博客和其他部分的本地存储功能</td><td>12.11</td></tr>
      <tr><th rowspan = "9">索一奇</th><td>进一步测试涉及获取作业的API，联系博客园负责人解决部分班级作业不能正常显示的问题</td><td>11.30</td></tr>
      <tr><td>整理完善开发文档，更新接口定义和项目结构</td><td>12.2</td></tr>
      <tr><td>完善开发者资料，通过腾讯应用平台的审核</td><td>12.3</td></tr>
      <tr><td>学习Material Design的标准</td><td>12.4</td></tr>
      <tr><td>按照Material Design的标准修改页边距、模块宽度</td><td>12.5</td></tr>
      <tr><td>按照Material Design的标准修改字体样式、间距、行距</td><td>12.6</td></tr>
      <tr><td>按照Material Design的标准修改按钮位置、样式</td><td>12.7</td></tr>
      <tr><td>完善日程提醒功能的界面</td><td>12.9</td></tr>
      <tr><td>解决客户端横屏显示不完整的问题</td><td>12.11</td></tr>
    </tbody>
  </table>
</div>
</div>