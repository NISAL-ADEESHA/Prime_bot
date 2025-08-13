const makeWASocket = require('@adiwajshing/baileys').default;
const { useMultiFileAuthState } = require('@adiwajshing/baileys');
const handleVless = require('./vless.js');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth');
    const sock = makeWASocket({ auth: state });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

        await handleVless(sock, from, body);
    });
}

startBot();
