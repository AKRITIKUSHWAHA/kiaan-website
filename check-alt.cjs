const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const results = [];
walkDir('./src', function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('<img') || lines[i].includes('<Image')) {
                // Get next 5 lines for context
                const context = lines.slice(i, i + 6).join('\n');
                const altMatch = context.match(/alt=["']([^"']*)["']|alt=\{([^}]*)\}/);
                
                results.push({
                    file: filePath,
                    line: i + 1,
                    tag: lines[i].includes('<img') ? 'img' : 'Image',
                    alt: altMatch ? (altMatch[1] || altMatch[2]) : 'NO_ALT'
                });
            }
        }
    }
});

console.log(JSON.stringify(results, null, 2));
