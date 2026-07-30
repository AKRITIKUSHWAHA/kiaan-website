const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./src/app', function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');
        // Simple regex to remove the canonical property in alternates object
        // Specifically targets lines like: canonical: "...", or canonical: `...`, or canonical: '...'
        // It might be inside alternates: { canonical: ... }
        
        // Let's just remove any line containing 'canonical:'
        if (content.includes('canonical:')) {
            const lines = content.split('\n');
            const newLines = lines.filter(line => !line.includes('canonical:'));
            fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
            console.log('Removed canonical from: ' + filePath);
        }
    }
});
