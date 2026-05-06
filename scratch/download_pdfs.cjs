const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const years = ['11', '12', '13', '14', '15'];
const subjects = ['math', 'science', 'english', 'chinese', 'higher_chinese'];
const baseDir = path.join(__dirname, 'papers');

// e.g. y15p6math_2015.html or y14p6math.html
function getPageUrls() {
    const urls = [];
    for (const yy of years) {
        const fullYear = `20${yy}`;
        for (const sub of subjects) {
            urls.push({
                year: fullYear,
                subFolder: sub.replace('_', '-'),
                url: `https://www.sgtestpaper.com/primary/y${yy}p6${sub}${fullYear === '2015' ? '_2015' : ''}.html`
            });
        }
    }
    return urls;
}

async function fetchHtml(url) {
    try {
        const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
        if (!response.ok) {
            console.log(`Failed to fetch ${url} - ${response.status}`);
            return "";
        }
        const buf = await response.arrayBuffer();
        return new TextDecoder('utf-8').decode(buf).replace(/\0/g, '');
    } catch (e) {
        console.error(`Error fetching ${url}`, e.message);
        return "";
    }
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) {
            console.log(`Already exists: ${path.basename(dest)}`);
            return resolve();
        }
        
        const file = fs.createWriteStream(dest);
        const protocol = url.startsWith('https') ? https : http;
        
        protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // handle redirect
                return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                console.error(`Failed to download ${url} - Status ${response.statusCode}`);
                fs.unlink(dest, () => reject(new Error(`Status ${response.statusCode}`)));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    console.log(`Downloaded: ${path.basename(dest)}`);
                    resolve();
                });
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function main() {
    const pages = getPageUrls();
    for (const page of pages) {
        console.log(`Checking ${page.url}...`);
        const html = await fetchHtml(page.url);
        
        // Match standard links: href="xxxx.pdf" or href='xxxx.pdf'
        // For sgtestpaper, they usually link to "https://www.sgtestpaper.com/pdf/xxxx.pdf" or relative
        const regex = /href=["']([^"']+\.pdf)["']/gi;
        let match;
        const pdfLinks = new Set();
        while ((match = regex.exec(html)) !== null) {
            let link = match[1];
            if (!link.startsWith('http')) {
                // Handle relative links
                if (link.startsWith('/')) {
                    link = 'https://www.sgtestpaper.com' + link;
                } else {
                    const baseUrl = page.url.substring(0, page.url.lastIndexOf('/') + 1);
                    link = baseUrl + link;
                }
            }
            // Only SA2 or Prelim
            const lowerLink = link.toLowerCase();
            if (lowerLink.includes('p6') && (lowerLink.includes('prelim') || lowerLink.includes('sa2'))) {
                 pdfLinks.add(link);
            }
        }
        
        if (pdfLinks.size > 0) {
            const outDir = path.join(baseDir, page.year, page.subFolder);
            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, { recursive: true });
            }
            
            for (const pdfLink of pdfLinks) {
                let filename = pdfLink.split('/').pop();
                // Clean filename
                filename = decodeURIComponent(filename);
                const outPath = path.join(outDir, filename);
                await downloadFile(pdfLink, outPath);
                // Sleep to avoid rate limiting
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    }
}

main().catch(console.error);
