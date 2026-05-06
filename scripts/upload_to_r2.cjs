const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const BUCKET_NAME = 'keen-psle-papers';
const PAPERS_DIR = path.join(__dirname, '..', 'public', 'papers');

// recursively get all files in directory
function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, fileList);
        } else if (file.endsWith('.pdf')) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

const allFiles = getAllFiles(PAPERS_DIR);
console.log(`Found ${allFiles.length} files to upload.`);

let currentIndex = 0;
let successCount = 0;
let failCount = 0;
const CONCURRENCY = 10;

function uploadNext() {
    if (currentIndex >= allFiles.length) {
        return;
    }
    const idx = currentIndex++;
    const fullPath = allFiles[idx];
    
    // Calculate the relative path from PAPERS_DIR to use as the R2 key
    // e.g. 2016/maths/xxx.pdf
    let relativePath = path.relative(PAPERS_DIR, fullPath);
    // Convert Windows backslashes to forward slashes for R2 object keys
    relativePath = relativePath.split(path.sep).join('/');
    
    console.log(`[${idx + 1}/${allFiles.length}] Uploading ${relativePath}...`);
    
    // Command: npx wrangler r2 object put BUCKET_NAME/key --file=fullPath
    const cmd = `npx wrangler r2 object put ${BUCKET_NAME}/"${relativePath}" --file="${fullPath}"`;
    
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Failed to upload ${relativePath}: ${error.message}`);
            failCount++;
        } else {
            successCount++;
        }
        
        if (successCount + failCount === allFiles.length) {
            console.log(`\n🎉 Upload Complete! Success: ${successCount}, Failed: ${failCount}`);
        } else {
            uploadNext(); // start next one
        }
    });
}

// Start initial batch
for (let i = 0; i < Math.min(CONCURRENCY, allFiles.length); i++) {
    uploadNext();
}
