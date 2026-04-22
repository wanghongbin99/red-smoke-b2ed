const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_aitong.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_acsjunior.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_catholichigh.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_chij.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_henrypark.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_mgs.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_mgspayalebar.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_nanhua.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_nanyang.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_raffles.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_redswastika.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_rosyth.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_scgs.pdf",
  "https://www.testpapersfree.com/pdfs/P6_Maths_2025_SA2_taonan.pdf"
];

const downloadDir = path.join(__dirname, '..', 'downloads');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
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
        console.error(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
        resolve();
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete the file async
      reject(err.message);
    });
  });
}

async function main() {
  console.log(`Downloading ${urls.length} PDFs to ${downloadDir}...`);
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const filename = url.split('/').pop();
    const dest = path.join(downloadDir, filename);
    
    console.log(`[${i+1}/${urls.length}] Downloading ${filename}...`);
    try {
        await download(url, dest);
    } catch (e) {
        console.error(`Failed to download ${filename}: ${e}`);
    }
  }
  console.log('All downloads completed!');
}

main();
