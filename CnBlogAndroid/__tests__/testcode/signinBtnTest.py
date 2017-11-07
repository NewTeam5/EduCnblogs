#coding=utf-8

from appium import webdriver

desired_caps = {}
desired_caps['platformName'] = 'Android'
desired_caps['platformVersion'] = '6.0.0'
desired_caps['deviceName'] = '192.168.86.101:5555'
desired_caps['appPackage'] = 'com.cnblogandroid'
desired_caps['appActivity'] = '.MainActivity'
desired_caps['sessionOverride'] = 'true'

driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

driver.find_element_by_id('App_signin').click()


