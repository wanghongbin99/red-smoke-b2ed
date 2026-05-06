const fs = require('fs');

async function main() {
    try {
        const response = await fetch('https://sgexam.com/?s=2015+primary+6', { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const html = await response.text();
        const regex = /href=['"]([^'"]+)['"]/gi;
        let match;
        const links = new Set();
        while ((match = regex.exec(html)) !== null) {
            links.add(match[1]);
        }
        console.log(Array.from(links).filter(l => l.includes('2015') && l.includes('p6')));
        console.log(Array.from(links).filter(l => l.includes('2015') && l.includes('primary-6')));
    } catch (e) {
        console.error(e);
    }
}
main();
