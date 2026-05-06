const fs = require('fs');
const path = require('path');

const publicPapersDir = path.join(__dirname, '..', 'public', 'papers');
const indexFilePath = path.join(__dirname, '..', 'public', 'papers_index.json');

function scanDir(dir) {
    if (!fs.existsSync(dir)) return {};
    const result = {};
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            result[item] = scanDir(fullPath);
        } else if (item.endsWith('.pdf')) {
            // we will store the file as true
            result[item] = true;
        }
    }
    return result;
}

function main() {
    console.log('Scanning public/papers ...');
    const index = scanDir(publicPapersDir);
    fs.writeFileSync(indexFilePath, JSON.stringify(index, null, 2), 'utf8');
    console.log('Generated public/papers_index.json successfully.');
}

main();
