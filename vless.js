const fs = require('fs');

module.exports = async (client, msg) => {
    const body = msg.body.trim();

    // Menu handling
    if (body === '.v2ray') {
        await client.sendMessage(msg.from,
`Please select an option:
1. මොකක්ද v2ray එකක් කියන්නෙ
2. v2ray එක setup කරන විදිය
3. v2ray එක ගන්න
4. Premium
5. developer`);
    } else if (body === '1') {
        const info = fs.readFileSync('./v2ray-info.txt', 'utf8');
        await client.sendMessage(msg.from, info);
    } else if (body === '2') {
        const setup = fs.readFileSync('./v2ray-setup.txt', 'utf8');
        await client.sendMessage(msg.from, setup);
    } else if (body === '3') {
        const getV2ray = fs.readFileSync('./v2ray-get.txt', 'utf8');
        await client.sendMessage(msg.from, getV2ray);
    } else if (body === '4') {
        const premium = fs.readFileSync('./v2ray-premium.txt', 'utf8');
        await client.sendMessage(msg.from, premium);
    } else if (body === '5') {
        const dev = fs.readFileSync('./developer.txt', 'utf8');
        await client.sendMessage(msg.from, dev);
    }
};
