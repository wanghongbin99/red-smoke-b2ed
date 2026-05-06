const fs = require('fs');

async function main() {
    try {
        const response = await fetch('https://www.testpapersfree.com/p6/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const html = await response.text();
        const regex = /href=['"]([^'"]+)['"]/gi;
        let match;
        const links = new Set();
        while ((match = regex.exec(html)) !== null) {
            links.add(match[1]);
        }
        console.log(Array.from(links).filter(l => l.includes('subject') || l.includes('201') || l.includes('paper') || l.includes('php')));
    } catch (e) {
        console.error(e);
    }
}
main();
