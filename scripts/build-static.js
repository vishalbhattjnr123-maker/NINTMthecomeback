const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcApiDir = path.join(__dirname, '..', 'src', 'app', 'api');

console.log('--- Preparing NINTM Static Export (File-Level Isolation) ---');

let renamedFiles = [];

// Helper to recursively walk directory
function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walkDir(filePath, callback);
        } else {
            callback(filePath);
        }
    }
}

try {
    // 1. Temporarily rename all route.js/route.ts files in src/app/api to route.js.bak/route.ts.bak
    console.log('Isolating API Route Handlers...');
    walkDir(srcApiDir, (filePath) => {
        const filename = path.basename(filePath);
        if (filename === 'route.js' || filename === 'route.ts') {
            const backupPath = filePath + '.bak';
            console.log(`Renaming: ${filePath} -> ${backupPath}`);
            fs.renameSync(filePath, backupPath);
            renamedFiles.push({ original: filePath, backup: backupPath });
        }
    });

    // 2. Perform next build with EXPORT_STATIC=true
    console.log('Starting Next.js static compilation...');
    execSync('npx next build', {
        stdio: 'inherit',
        env: {
            ...process.env,
            EXPORT_STATIC: 'true'
        }
    });

    console.log('Static export completed successfully. Output is in the "out" folder.');

} catch (error) {
    console.error('Error during static export build process:', error.message);
    process.exitCode = 1;
} finally {
    // 3. Restore all renamed API route handler files
    if (renamedFiles.length > 0) {
        console.log('Restoring API Route Handlers...');
        for (const filePair of renamedFiles) {
            if (fs.existsSync(filePair.backup)) {
                try {
                    console.log(`Restoring: ${filePair.backup} -> ${filePair.original}`);
                    fs.renameSync(filePair.backup, filePair.original);
                } catch (restoreErr) {
                    console.error(`CRITICAL: Failed to restore ${filePair.backup} -> ${filePair.original}! Restore it manually.`, restoreErr);
                }
            }
        }
        console.log('API Route Handlers restored.');
    }
}
