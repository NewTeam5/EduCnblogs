<div style = "margin: 10px">
<h1 align = "center">BugRecord</h1>
<div style = "padding: 10px">
<table border = "1" style = "width:100%">
  <colgroup>
    <col style = "width:25%">
    <col style = "width:15%">
    <col style = "width:30%">
    <col style = "width:10%">
    <col style = "width:10%">
    <col style = "width:10%">
  </colgroup>
  <thead>
    <tr><th>描述</th><th>测试用例/场景</th><th>解决</th><th>位置</th><th>状态</th><th>级别</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>部分班级打开作业列表时App崩溃</td>
      <td>
        <code>
          [{
            deadline: null
          }]
        </code>
      </td>
      <td><p>通过网络请求获取的数据中有null，使用过程中没有对其进行检查直接使用了字符串函数。</p><p>检查后使用，若为null将其赋值为“undefined”<p></td>
      <td>HomeworkList.js</td>
      <td>Solved</td>
      <td>A</td>
    </tr>
    <tr>
      <td>横屏页面显示不全</td>
      <td>\</td>
      <td>对style中的width进行设置</td>
      <td></td>
      <td>Solved</td>
      <td>B</td>
    </tr>
    <tr>
      <td>作业详情页面中文乱码</td>
      <td>通过URL获取到的页面中有中文</td>
      <td>在WebView组件中设置baseUrl</td>
      <td>HomeworkDetail.js</td>
      <td>Solved</td>
      <td>B</td>
    </tr>
    <tr>
      <td>日程提醒页面闪烁</td>
      <td>存在两个及以上班级</td>
      <td><p>获取作业时没获取一个班级的作业就会重置一次state，后一个班级会覆盖前一个班级的作业</p><p>将作业累加的存进数组中，一次性赋值</p></td>
      <td>ScheduleReminding.js</td>
      <td>Solved</td>
      <td>A</td>ScheduleReminding.js
    </tr>
    <tr>
      <td>输入评论时输入框上移</td>
      <td>\</td>
      <td>重新设置TextInput组件的属性</td>
      <td>CommentAdd.js</td>
      <td>Solved</td>
      <td>B</td>
    </tr>
    <tr>
      <td>日程提醒页面每次显示内容不同</td>
      <td>存在两个及以上班级</td>
      <td>没有处理好网络请求和赋值的操作</td>
      <td>ScheduleReminding.js</td>
      <td>Solved</td>
      <td>A</td>
    </tr>
    <tr>
      <td>日程提醒页面跳转到消息页面不显示内容</td>
      <td>\</td>
      <td>修改了数组的名称，但是没有修改传到下一个页面的变量的名称，因此实际上传到下一个页面的变量为空。修改名称后问题解决</td>
      <td>ScheduleReminding.js</td>
      <td>Solved</td>
      <td>A</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
<hr>

<div style = "padding: 10px">
<h3>说明</h3>
<ul>
  <li>测试人员填写描述、测试用例、位置、负责人、状态、级别、时间</li>
  <li>负责该bug的开发人员填写解决并更新状态</li>
  <li>级别：建议分为A、B、C三个级别：A——需要停下开发工作立即解决；B——可以在开发过程中解决；C——不重要的细节，可以在优化时解决</li>
  <li>状态分为未解决和已解决两种</li>
</ul>
</div>
