const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = path.join(__dirname, '..', 'public', 'downloads');
const bucketName = 'keen-psle-papers';

if (!fs.existsSync(sourceDir)) {
    console.error('Source directory does not exist:', sourceDir);
    process.exit(1);
}

const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.pdf'));

console.log(`Found ${files.length} PDFs to upload to R2 bucket: ${bucketName}`);

files.forEach((file, index) => {
    const filePath = path.join(sourceDir, file);
    console.log(`[${index + 1}/${files.length}] Uploading ${file}...`);
    
    try {
        // Using wrangler r2 object put
        // wrangler r2 object put <bucket_name>/<key> --file <local_path>
        execSync(`npx wrangler r2 object put ${bucketName}/${file} --file "${filePath}" --remote`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Failed to upload ${file}:`, error.message);
    }
});

console.log('Upload process completed.');
