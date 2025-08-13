const fs = require('fs');

module.exports = async (client, msg) => {
    const body = msg.body.trim();

    if (body === '.ss') {
        await client.sendMessage(
            msg.from,
`Please select an option:
1. මොකක්ද v2ray කියන්නෙ
2. v2ray එක setup කරන විදිය
3. v2ray configs ගන්න
4. Premium
5. developer`
        );
    } else if (body === '1') {
        const info = fs.readFileSync('./ss-info.txt', 'utf8');
        await client.sendMessage(msg.from, info);
    } else if (body === '2') {
        const setup = fs.readFileSync('./ss-setup.txt', 'utf8');
        await client.sendMessage(msg.from, setup);
    } else if (body === '3') {
        const configs = fs.readFileSync('./ss-configs.txt', 'utf8');
        await client.sendMessage(msg.from, configs);
    } else if (body === '4') {
        const premium = fs.readFileSync('./ss-premium.txt', 'utf8');
        await client.sendMessage(msg.from, premium);
    } else if (body === '5') {
        const dev = fs.readFileSync('./developer.txt', 'utf8');
        await client.sendMessage(msg.from, dev);
    }
};
