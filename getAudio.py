from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import ui
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import Select
import sys


# def document_initialised(driver):
#     return driver.execute_script("return initialised")

data_to_pass_back = 'ans'

input = sys.argv[1]

options = webdriver.ChromeOptions()

s = Service('/usr/local/bin/chromedriver')
driver = webdriver.Chrome(service=s, options=options)

url = "https://huggingface.co/spaces/Plachta/VITS-Umamusume-voice-synthesizer"
driver.get(url)

driver.maximize_window()

driver.implicitly_wait(30)

driver.switch_to.frame('iFrameResizer0')

try:
    text = driver.find_element(By.CLASS_NAME, 'scroll-hide').clear()
    text = driver.find_element(By.CLASS_NAME, 'scroll-hide')
    text.send_keys(input)
    language = Select(driver.find_element(By.XPATH, '(//select[@class="gr-box gr-input w-full disabled:cursor-not-allowed"])[2]'))
    language.select_by_visible_text("English")
    generate_button = driver.find_element(By.ID, 'component-24')
    generate_button.click()
    driver.implicitly_wait(7)
    audio = driver.find_element(By.XPATH, '//audio[@class="w-full h-14 p-2 mt-7"]')
    audio.click()
    audioURL = audio.get_attribute("src")
    print(audioURL)
    sys.stdout.flush

except:
    print('No matching elements found')

while(True):
    pass

    

