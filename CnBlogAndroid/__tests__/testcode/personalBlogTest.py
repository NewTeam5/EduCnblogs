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
for i in range (1,5):
	time.sleep(5)
	driver.find_element_by_accessibility_id("http://www.cnblogs.com/LuoboLiam/p/7776541.html").click()
	time.sleep(5)
	driver.find_element_by_accessibility_id("BlogDetail_commentImage").click()
	time.sleep(5)
	driver.find_element_by_accessibility_id("BlogComment_addreplyComment").click()
	time.sleep(5)
	el = driver.find_element_by_accessibility_id("CommentAdd_inputBox")
	el.send_keys('comment test ', i)
	time.sleep(5)
	driver.find_element_by_accessibility_id("CommentAdd_submit").click()
	time.sleep(5)
	driver.find_element_by_xpath('//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/\
		android.widget.FrameLayout[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/\
		android.widget.Button[1]/android.view.ViewGroup[1]/android.widget.ImageView[1]').click()
	time.sleep(5)
	driver.find_element_by_xpath('//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/\
		android.widget.FrameLayout[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup[1]/\
		android.widget.Button[1]/android.view.ViewGroup[1]/android.widget.ImageView[1]').click()