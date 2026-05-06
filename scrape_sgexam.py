import urllib.request
import re

url = "https://drive.google.com/uc?export=download&id=11lY0z2O5cTU-6WZVKLu9EK0Tf7nDqC2r"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req)
    data = response.read()
    print(f"Downloaded {len(data)} bytes")
    with open("test.pdf", "wb") as f:
        f.write(data)
except Exception as e:
    print(f"Error: {e}")
