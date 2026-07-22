const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');
const http = require('isomorphic-git/http/node');

const dir = 'C:\\sniper-battle';
const token = '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';
const repoUrl = 'https://github.com/sea92822-ui/sniper-battle.git';
const author = { name: 'deploy', email: 'deploy@example.com' };

(async () => {
    try {
        await git.init({ fs, dir, defaultBranch: 'main' });
        console.log('Init OK');
    } catch (e) {
        console.log('Init skipped');
    }
    
    try {
        await git.addRemote({ fs, dir, remote: 'origin', url: repoUrl });
        console.log('Remote set');
    } catch (e) {
        console.log('Remote exists');
    }
    
    // Remove existing remotes that might conflict
    try {
        await git.deleteRemote({ fs, dir, remote: 'origin' });
        await git.addRemote({ fs, dir, remote: 'origin', url: repoUrl });
    } catch (e) {}
    
    // Delete .git if corrupted
    const files = ['index.html', 'server.js', 'package.json', 'render.yaml'];
    
    // Find the OID of HEAD
    let oid;
    try {
        oid = await git.resolveRef({ fs, dir, ref: 'HEAD' });
        console.log('HEAD:', oid);
    } catch (e) {
        console.log('No HEAD, making initial commit');
        for (const f of files) {
            const fp = path.join(dir, f);
            if (fs.existsSync(fp)) {
                await git.add({ fs, dir, filepath: f });
            }
        }
        oid = await git.commit({ fs, dir, message: 'Initial commit', author });
        console.log('Commit:', oid);
    }
    
    // Create/update main branch
    await git.branch({ fs, dir, ref: 'main', checkout: true });
    console.log('Branch main set');
    
    // Push
    try {
        await git.push({
            fs, dir, http,
            remote: 'origin',
            ref: 'main',
            remoteRef: 'main',
            onAuth: () => ({ username: 'sea92822-ui', password: token }),
            force: true
        });
        console.log('PUSH OK!');
    } catch (e) {
        console.error('Push error:', e.message);
    }
    
    console.log('Repo: https://github.com/sea92822-ui/sniper-battle');
})().catch(e => {
    console.error('Error:', e.message);
    process.exit(1);
});
