const handleVless = require('./vless.js');

sock.ev.on('messages.upsert', async m => {
    const msg = m.messages[0];
    const from = msg.key.remoteJid;
    const body = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';

    await handleVless(sock, from, body);
});
