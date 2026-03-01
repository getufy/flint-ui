import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function processDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== 'dist') {
                processDirectory(fullPath);
            }
        } else if (entry.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.html') || fullPath.endsWith('.css') || fullPath.endsWith('.mdx'))) {
            let content = fs.readFileSync(fullPath, 'utf-8');

            let newContent = content
                .replace(/my-/g, 'ui-')
                .replace(/My(?=[A-Z])/g, 'Ui');

            if (newContent !== content) {
                fs.writeFileSync(fullPath, newContent, 'utf-8');
                console.log(`Updated content in: ${fullPath}`);
            }

            if (entry.name.startsWith('my-')) {
                const newName = entry.name.replace(/^my-/, 'ui-');
                const newFullPath = path.join(dir, newName);
                fs.renameSync(fullPath, newFullPath);
                console.log(`Renamed: ${fullPath} -> ${newFullPath}`);
            }
        }
    }
}

const srcDir = path.join(__dirname, 'src');
processDirectory(srcDir);
console.log('Done processing src directory.');
