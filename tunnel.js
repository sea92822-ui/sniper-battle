const lt = require('localtunnel');
let tunnel;

(async () => {
    try {
        tunnel = await lt({ port: 3000, subdomain: 'snipbattle' });
        console.log('Tunnel URL:', tunnel.url);
        
        tunnel.on('close', () => {
            console.log('Tunnel closed');
            process.exit(0);
        });
        
        // Keep alive
        setInterval(() => {}, 60000);
    } catch (e) {
        console.error('Error:', e.message);
        // Try without subdomain
        try {
            tunnel = await lt({ port: 3000 });
            console.log('Tunnel URL:', tunnel.url);
            setInterval(() => {}, 60000);
        } catch (e2) {
            console.error('Error2:', e2.message);
        }
    }
})();
