const https = require('https');
const fs = require('fs');
const path = require('path');

const ids = [
  // English
  91439, 91438, 91437, 91436, 91435, 91434, 91433, 91432, 91431, 91430, 91429, 91428, 91427, 91426,
  // Science
  91403, 91402, 91401, 91400, 91399, 91398, 91397, 91396, 91395, 91394, 91393, 91392, 91391, 91390, 91389,
  // Chinese
  91122, 91121, 91120, 91119, 91118, 91117, 91116, 91115, 91114, 91113, 91112, 91111,
  // Higher Chinese
  91238, 91237, 91236, 91235, 91234, 91233, 91232, 91231, 91230, 91229, 91228, 91227, 91226
];

const downloadDir = path.join(__dirname, '..', 'downloads');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

function fetchPdfLink(id) {
  return new Promise((resolve) => {
    https.get(`https://www.testpapersfree.com/show.php?testpaperid=${id}`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const match = data.match(/href="([^"]+\.pdf)"/);
        if (match && match[1]) {
          const pdfUrl = match[1].startsWith('http') ? match[1] : `https://www.testpapersfree.com/${match[1].replace(/^\//, '')}`;
          resolve(pdfUrl);
        } else {
          console.log(`[ID ${id}] No PDF found on detail page.`);
          resolve(null);
        }
      });
    }).on('error', (e) => {
      console.log(`[ID ${id}] Error fetching page - ${e.message}`);
      resolve(null);
    });
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    https.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        file.close();
        fs.unlink(dest, () => {}); // Delete the file async
        console.error(`[${url}] Server responded with ${response.statusCode}: ${response.statusMessage}`);
        resolve();
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete the file async
      reject(err.message);
    });
  });
}

async function main() {
  console.log(`Extracting PDF URLs for ${ids.length} test papers...`);
  
  const pdfUrls = [];
  for (const id of ids) {
    const link = await fetchPdfLink(id);
    if (link) {
      pdfUrls.push(link);
    }
    await new Promise(r => setTimeout(r, 100)); // Sleep 100ms
  }
  
  console.log(`Found ${pdfUrls.length} PDF links. Starting downloads to ${downloadDir}...`);
  
  for (let i = 0; i < pdfUrls.length; i++) {
    const url = pdfUrls[i];
    let filename = url.split('/').pop();
    
    // Resolve duplicate filename issue if any
    let dest = path.join(downloadDir, filename);
    let counter = 1;
    while (fs.existsSync(dest)) {
      const ext = path.extname(filename);
      const base = path.basename(filename, ext);
      dest = path.join(downloadDir, `${base}_${counter}${ext}`);
      counter++;
    }
    
    console.log(`[${i+1}/${pdfUrls.length}] Downloading ${path.basename(dest)}...`);
    try {
        await download(url, dest);
    } catch (e) {
        console.error(`Failed to download ${url}: ${e}`);
    }
  }
  console.log('All downloads completed!');
}

main();
