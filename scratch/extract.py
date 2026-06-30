import html.parser
import sys
import re

class HTMLFilter(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.in_script_or_style = False

    def handle_starttag(self, tag, attrs):
        if tag in ['script', 'style']:
            self.in_script_or_style = True

    def handle_endtag(self, tag):
        if tag in ['script', 'style']:
            self.in_script_or_style = False

    def handle_data(self, data):
        if not self.in_script_or_style and data.strip():
            self.text.append(data.strip())

with open(r'C:\Users\wangh\.gemini\antigravity\brain\f5afa591-a6a3-4cfa-8bcd-34c05b9942d2\.system_generated\steps\64\content.md', 'r', encoding='utf-8') as f:
    parser = HTMLFilter()
    parser.feed(f.read())
    
    text = '\n'.join(parser.text)
    # clean up extra spaces
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    with open('extracted.txt', 'w', encoding='utf-8') as out:
        out.write(text)
