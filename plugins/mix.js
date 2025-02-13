const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const yts = require('yt-search');
const domain = `https://manul-official-api-site-4a4d3aa3fe73.herokuapp.com`;

cmd({
    pattern: "song",
    alias: ["audio"],
    desc: 'Download Song / Video',
    use: '.play Title',
    react: "🎧",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('Please provide a title.');
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `*🌎 𝐘𝐓 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 🌎*
        
> *\`➤ Title\` :* ${data.title}

> *\`➤ Views\` :* ${data.views}

> *\`➤ DESCRIPTION\`:* ${data.description}

> *\`➤ TIME\`:* ${data.timestamp}

> *\`➤ AGO\`:* ${data.ago}

*◄❪ Reply This Message With Nambars ❫►*

1. Audio 🎧
2. Document 🗂️

> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : © 𝚀𝚞𝚎𝚎𝚗_𝙰𝚑𝚒𝚗𝚜𝚊-𝙼𝙳*`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
    const response = await fetchJson(`${domain}/ytmp3-fix?url=${data.url}`);
    
    const downloadUrl = response.dl_link;

//============Send Audio======================
await conn.sendMessage(from,{audio:{url: downloadUrl },mimetype:"audio/mpeg",caption :"> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : © 𝚀𝚞𝚎𝚎𝚗_𝙰𝚑𝚒𝚗𝚜𝚊-𝙼𝙳*"},{quoted:mek})
                        break;
       
                    case '2':               
const responsex = await fetchJson(`${domain}/ytmp3-fix?url=${data.url}`);
    
    const downloadUrlx = response.dl_link;

//=============Send Document=================
await conn.sendMessage(from,{document:{url: downloadUrlx },mimetype:"audio/mpeg",fileName: data.title + ".mp3" ,caption :"> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : © 𝚀𝚞𝚎𝚎𝚗_𝙰𝚑𝚒𝚗𝚜𝚊-𝙼𝙳*"},{quoted:mek})
                        break;
 
                    default:
                        reply("Invalid option. Please select a valid option 💗");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
