const fs = require('fs');
const vlessConfig = require('./vless-config.json');
const v2rayInfo = fs.readFileSync(__dirname + '/v2ray-info.txt', 'utf-8');

const botState = {}; // Tracks user progress

module.exports = async function handleVless(sock, from, body) {
    body = body.trim();

    // First trigger
    if (body === '.v2ray') {
        await sock.sendMessage(from, { text: 
`📌 V2Ray Menu:
1. මොකක්ද v2ray එකක් කියන්නෙ
2. v2ray එක setup කරන විදිය
3. v2ray එක ගන්න
4. Premium
5. Developer`
        });
        botState[from] = { step: 'mainMenu' };
        return;
    }

    // Main menu
    if (botState[from]?.step === 'mainMenu') {
        if (body === '1') {
            await sock.sendMessage(from, { text: v2rayInfo });
            delete botState[from];
        } else if (body === '2') {
            await sock.sendMessage(from, { text: "🛠 Setup guide:\n1. App එක download කරන්න.\n2. Config import කරන්න.\n3. Connect කරන්න." });
            delete botState[from];
        } else if (body === '3') {
            await sock.sendMessage(from, { text: "Select your ISP:\n1. Dialog\n2. Airtel" });
            botState[from] = { step: 'selectISP' };
        } else if (body === '4') {
            await sock.sendMessage(from, { text: "💎 Premium V2Ray plans:\n- Rs.500 / Month\n📞 Contact: 0779312821" });
            delete botState[from];
        } else if (body === '5') {
            await sock.sendMessage(from, { text: "👨‍💻 Developer: Nisal Adeesha\n📞 0779312821" });
            delete botState[from];
        }
        return;
    }

    // ISP Selection
    if (botState[from]?.step === 'selectISP') {
        if (body === '1') {
            botState[from] = { step: 'enterISP', isp: 'Dialog' };
            await sock.sendMessage(from, { text: "Enter your Dialog ISP number:" });
        } else if (body === '2') {
            botState[from] = { step: 'enterISP', isp: 'Airtel' };
            await sock.sendMessage(from, { text: "Enter your Airtel ISP number:" });
        }
        return;
    }

    // Enter ISP number
    if (botState[from]?.step === 'enterISP') {
        botState[from].ispNumber = body;
        botState[from].step = 'selectPackage';
        await sock.sendMessage(from, { text: "Enter your package number:" });
        return;
    }

    // Select package
    if (botState[from]?.step === 'selectPackage') {
        const { isp, ispNumber } = botState[from];
        const pkgNumber = body;
        const config = vlessConfig[isp]?.[ispNumber]?.[pkgNumber];

        if (config) {
            await sock.sendMessage(from, { text: config });
        } else {
            await sock.sendMessage(from, { text: "❌ Config not found." });
        }
        delete botState[from];
    }
};
