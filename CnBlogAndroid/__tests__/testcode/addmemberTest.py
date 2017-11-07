#coding=utf-8

from appium import webdriver
import time

desired_caps = {}
desired_caps['platformName'] = 'Android'
desired_caps['platformVersion'] = '6.0.0'
desired_caps['deviceName'] = '192.168.86.101:5555'
desired_caps['appPackage'] = 'com.cnblogandroid'
desired_caps['appActivity'] = '.MainActivity'
desired_caps['sessionOverride'] = 'true'

driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

#press 'myclass' button
time.sleep(5)
driver.find_element_by_xpath('//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/\
	android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/\
	android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.widget.HorizontalScrollView[1]/android.view.ViewGroup[1]/\
	android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.widget.TextView[1]').click()

#press '山东理工大学' button
time.sleep(5)
driver.find_element_by_xpath('//android.widget.ScrollView/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]').click()

#press '班级成员' button
time.sleep(5)
driver.find_element_by_xpath('//android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[2]').click()

#press '添加成员' button
time.sleep(5)
driver.find_element_by_xpath('//android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[2]/android.view.ViewGroup[1]').click()

#Fill the nickneme
time.sleep(5)
nicknameBox = driver.find_element_by_xpath('//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/\
	android.widget.FrameLayout[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup[2]/android.widget.EditText[1]')
nicknameBox.send_keys('LuoboLiam')

#Fill the real name
time.sleep(5)
realnameBox = driver.find_element_by_xpath("//android.widget.EditText[@content-desc='ClassMemberAdd_realName']")
realnameBox.send_keys('lxz')

#fill the studentID
time.sleep(5)
stdIDBox = driver.find_element_by_xpath("//android.widget.EditText[@content-desc='ClassMemberAdd_studentID']")
stdIDBox.send_keys('98116051')

#press the 'add' button
time.sleep(5)
driver.find_element_by_xpath('//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/\
	android.widget.FrameLayout[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup[2]/android.view.ViewGroup[2]').click()

#press the back button
time.sleep(5)
driver.find_element_by_xpath('//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/\
	android.widget.FrameLayout[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/\
	android.widget.Button[1]/android.view.ViewGroup[1]/android.widget.ImageView[1]').click()

#press the back button
time.sleep(5)
driver.find_element_by_xpath('//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/\
	android.widget.FrameLayout[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/\
	android.widget.Button[1]/android.view.ViewGroup[1]/android.widget.ImageView[1]').click()

#press 'me' button
time.sleep(5)
driver.find_element_by_xpath('//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/\
	android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/\
	android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.widget.HorizontalScrollView[1]/android.view.ViewGroup[1]/\
	android.view.ViewGroup[3]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.widget.TextView[1]').click()
#press 'signout' button
time.sleep(5)
driver.find_element_by_xpath('//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/\
	android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/\
	android.view.ViewGroup[1]/android.support.v4.view.ViewPager[1]/android.view.ViewGroup[1]/android.view.ViewGroup[5]/\
	android.widget.TextView[1]').click()