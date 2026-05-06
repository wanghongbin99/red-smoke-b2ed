import urllib.request
import re

url = "https://sgexam.com/primary-6-maths/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    pagination_links = re.findall(r'href="(https://sgexam\.com/primary-6-maths/page/[0-9]+/)"', html)
    print("Pagination links found:")
    print(set(pagination_links))
except Exception as e:
    print(f"Error: {e}")
