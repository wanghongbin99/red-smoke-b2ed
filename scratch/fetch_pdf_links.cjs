const https = require('https');

const papers = [
  { name: 'P6 Maths 2025 SA2 - Ai Tong', id: 90730 },
  { name: 'P6 Maths 2025 SA2 - ACS Junior', id: 90729 },
  { name: 'P6 Maths 2025 SA2 - Catholic High', id: 90728 },
  { name: 'P6 Maths 2025 SA2 - CHIJ', id: 90727 },
  { name: 'P6 Maths 2025 SA2 - Henry Park', id: 90726 },
  { name: 'P6 Maths 2025 SA2 - Methodist primary', id: 90725 },
  { name: 'P6 Maths 2025 SA2 - Methodist Paya Lebar', id: 90724 },
  { name: 'P6 Maths 2025 SA2 - Nan Hua', id: 90723 },
  { name: 'P6 Maths 2025 SA2 - Nanyang', id: 90722 },
  { name: 'P6 Maths 2025 SA2 - Raffles Girls', id: 90721 },
  { name: 'P6 Maths 2025 SA2 - Red Swastika', id: 90720 },
  { name: 'P6 Maths 2025 SA2 - Rosyth', id: 90719 },
  { name: 'P6 Maths 2025 SA2 - Singapore Chinese Girls', id: 90718 },
  { name: 'P6 Maths 2025 SA2 - Tao Nan', id: 90717 }
];

async function fetchPdfLink(paper) {
  return new Promise((resolve) => {
    https.get(`https://www.testpapersfree.com/show.php?testpaperid=${paper.id}`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const match = data.match(/href="([^"]+\.pdf)"/);
        if (match && match[1]) {
          const pdfUrl = match[1].startsWith('http') ? match[1] : `https://www.testpapersfree.com/${match[1].replace(/^\//, '')}`;
          console.log(`- **${paper.name}**: [Download PDF](${pdfUrl})`);
        } else {
          console.log(`- **${paper.name}**: No PDF found (Detail page: https://www.testpapersfree.com/show.php?testpaperid=${paper.id})`);
        }
        resolve();
      });
    }).on('error', (e) => {
      console.log(`- **${paper.name}**: Error fetching page - ${e.message}`);
      resolve();
    });
  });
}

async function main() {
  console.log("Fetching direct PDF links...");
  for (const paper of papers) {
    await fetchPdfLink(paper);
    // Be nice to the server
    await new Promise(r => setTimeout(r, 200));
  }
}

main();
