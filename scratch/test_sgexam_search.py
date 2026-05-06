import urllib.request
import re
import os
import time

years = [str(y) for y in range(2011, 2016)]
base_dir = os.path.join(os.getcwd(), 'papers')

def get_html(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""

def main():
    if not os.path.exists(base_dir):
        os.makedirs(base_dir)

    # Let's search by year and "primary 6"
    for year in years:
        page = 1
        has_next = True
        
        while has_next:
            url = f"https://sgexam.com/page/{page}/?s={year}+primary+6"
            print(f"Checking: {url}")
            html = get_html(url)
            
            # Find all post links
            links = set(re.findall(r'href="(https://sgexam\.com/year/\d+/[^"]+)"', html))
            
            if not links:
                print(f"No links found on page {page} for year {year}. Stopping year.")
                break
                
            for link in links:
                # Need to check if it's P6 and Prelim or SA2
                ll = link.lower()
                if 'p6' in ll and ('prelim' in ll or 'sa2' in ll):
                    # subject parsing
                    subject = None
                    if 'maths' in ll or 'math' in ll:
                        subject = 'maths'
                    elif 'science' in ll:
                        subject = 'science'
                    elif 'english' in ll:
                        subject = 'english'
                    elif 'higher-chinese' in ll or 'hcl' in ll:
                        subject = 'higher-chinese'
                    elif 'chinese' in ll:
                        subject = 'chinese'
                    
                    if subject:
                        # Fetch the post page to get the Google Drive link
                        # We will just print them for now to test the scraper
                        print(f"Found {year} {subject}: {link}")
                        
            # Check if there is a next page
            if 'class="next page-numbers"' in html:
                page += 1
                time.sleep(1)
            else:
                has_next = False

if __name__ == "__main__":
    main()
