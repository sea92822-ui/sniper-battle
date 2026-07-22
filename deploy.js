const surge = require('surge');
const path = require('path');

const email = 'sniper' + Math.random().toString(36).substring(2, 8) + '@mail.com';
const pass = 'SniperPass1!';

console.log('Deploying with email:', email);

const s = surge({
    email: email,
    password: pass
});

s.publish({
    project: path.resolve('.'),
    domain: 'sniper-battle-game.surge.sh',
    endpoint: 'https://surge.surge.sh',
}, (err, result) => {
    if (err) {
        console.error('Deploy error:', err);
        process.exit(1);
    }
    console.log('Deployed!');
    console.log('URL:', result);
    process.exit(0);
});
