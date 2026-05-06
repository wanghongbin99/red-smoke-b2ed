const fs = require('fs');

async function main() {
    const url = 'https://www.testpapersfree.com/show.php?testpaperid=91454';
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await response.text();
    
    // look for title
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    console.log("Title:", titleMatch ? titleMatch[1] : "N/A");
    
    // look for pdf link
    const pdfMatch = html.match(/href=['"]([^'"]+\.pdf)['"]/i);
    console.log("PDF Link:", pdfMatch ? pdfMatch[1] : "N/A");
}
main();
