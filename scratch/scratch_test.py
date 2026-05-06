import urllib.request
import re

url = "https://sgexam.com/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    links = re.findall(r'href="(https://sgexam\.com/[^"]+)"', html)
    years = ['2011', '2012', '2013', '2014', '2015']
    for l in set(links):
        for y in years:
            if y in l:
                print(l)
except Exception as e:
    print(f"Error: {e}")
