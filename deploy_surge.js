const surge = require('surge');
const path = require('path');
const email = 'sniper' + Math.random().toString(36).substring(2, 8) + '@surge.sh';
const pass = 'SniperPass1!';

console.log('Email:', email);
console.log('Password:', pass);

const s = surge();

// First login (creates account if new)
s.login({ email, password: pass }, (err, token) => {
    if (err) {
        console.error('Login error:', err.message);
        process.exit(1);
    }
    console.log('Logged in, token:', token ? token.substring(0, 10) + '...' : 'none');
    
    // Publish
    s.publish({
        project: path.resolve('.'),
        domain: 'sniper-battle-game.surge.sh'
    }, (err2, result) => {
        if (err2) {
            console.error('Publish error:', err2.message);
            process.exit(1);
        }
        console.log('SUCCESS!');
        console.log('URL:', result);
        process.exit(0);
    });
});
