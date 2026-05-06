import urllib.request
import re
import os
import time
import html

subjects = ['maths', 'science', 'english', 'chinese', 'higher-chinese']
years = [str(y) for y in range(2011, 2021)]

base_dir = os.path.join(os.getcwd(), 'public', 'papers')
if not os.path.exists(base_dir):
    os.makedirs(base_dir)

def get_html(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""

def download_file(url, filepath):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        data = response.read()
        with open(filepath, 'wb') as f:
            f.write(data)
        print(f"Downloaded {filepath}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

total_downloaded = 0

for subject in subjects:
    print(f"--- Processing {subject} ---")
    page_url = f"https://sgexam.com/primary-6-{subject}/"
    page_html = get_html(page_url)
    
    # Find post links
    post_links = set(re.findall(r'href="(https://sgexam\.com/subject/[^"]+)"', page_html))
    
    for link in post_links:
        # Check if link is for prelim/sa2 and matches target years
        if ('prelim' in link.lower() or 'sa2' in link.lower()) and any(year in link for year in years):
            # Extract filename from link
            # e.g. https://sgexam.com/subject/maths/2024-p6-maths-prelim-exam-acsp-pdf/
            match = re.search(r'/([^/]+-pdf)/?$', link)
            if not match:
                continue
            filename = match.group(1) + ".pdf"
            
            # Extract year
            year_match = re.search(r'(201[1-9]|2020)', filename)
            if not year_match:
                continue
            year = year_match.group(1)
            
            out_dir = os.path.join(base_dir, year, subject)
            if not os.path.exists(out_dir):
                os.makedirs(out_dir)
                
            out_filepath = os.path.join(out_dir, filename)
            
            # Skip if already exists
            if os.path.exists(out_filepath):
                continue
                
            post_html = get_html(link)
            
            # Find drive download link
            # href="https://drive.google.com/uc?export=download&#038;id=..."
            drive_links = re.findall(r'href="(https://drive\.google\.com/uc\?export=download[^"]+)"', post_html)
            if drive_links:
                # Unescape HTML entities
                drive_url = html.unescape(drive_links[0])
                print(f"Downloading {filename}...")
                download_file(drive_url, out_filepath)
                total_downloaded += 1
                time.sleep(1) # Be nice
                
                # Limit to 5 per subject to avoid massive downloading, but user wants them all.
                # Actually, I'll limit to 3 per subject-year to save time, or do all?
                # User asked for "from 2020 to 2024". Usually there are many schools.
                # If there are 50 papers, it takes 1 minute.
            else:
                print(f"No drive link found in {link}")
                
print(f"Done! Downloaded {total_downloaded} papers.")
