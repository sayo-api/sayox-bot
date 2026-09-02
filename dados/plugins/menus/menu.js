/*
 * ============================================================
 *                     SAYOX BOT
 * ============================================================
 *
 * Projeto disponibilizado gratuitamente para a comunidade.
 *
 * Você pode modificar, personalizar e utilizar este bot
 * conforme sua preferência, inclusive mantendo o nome Tokito.
 *
 * REGRAS:
 * • É proibida a venda ou revenda deste código-fonte.
 * • Não comercialize versões modificadas deste projeto.
 * • Não reivindique a autoria original do projeto.
 * • Respeite os créditos e o trabalho dos desenvolvedores.
 * • Utilize o projeto com respeito e responsabilidade.
 *
 * ATENÇÃO:
 * A venda, revenda ou comercialização não autorizada deste
 * projeto poderá resultar em medidas legais para proteção
 * dos direitos dos autores, incluindo processo judicial,
 * conforme a legislação aplicável.
 *
 * Author: Sayox
 * API oficial: https://tokito-apis.com.br
 *
 * Modifique como quiser. Apenas respeite as regras.
 * ============================================================
 */

const dylan = require('../../database/lib/comandos')

dylan.setCommand({
nome: "menu",
comandos: ["menu"],
categoria: "menus",
info: {
"descricao": "Executa o comando menu.",
"uso": "menu",
"categoria": "menus"
},
async executar(ctx) {
with (ctx) {
{
try {
if (!isBotoes)
return dylanModz(linguagem.menu(NomeDoBot, sender, isCargo, horaBR, prefix, ownerName, baileysVersion))
const caminhoVideo = path.join(__dirname, 'dados', 'INFO_DADOS', 'LOGOS', 'fotomenu.mp4')
const caminhoImagem = path.join(__dirname, 'dados', 'INFO_DADOS', 'LOGOS', 'fotomenu.png')
let menuMedia
if (fs.existsSync(caminhoVideo)) {
menuMedia = await prepareWAMessageMedia({
video: { url: caminhoVideo },
mimetype: 'video/mp4',
gifPlayback: true,
seconds: 8
}, { upload: sayox.waUploadToServer })
}
else {
menuMedia = await prepareWAMessageMedia({ image: { url: caminhoImagem } }, { upload: sayox.waUploadToServer })
}
const listaMenus = {
title: 'Bem-vindo ao ' + NomeDoBot,
sections: [
{
title: 'Menus',
rows: [
{
title: 'Menu principal',
description: 'Exibe os comandos principais do bot.',
id: `${prefix}menuzz`
},
{
title: 'Alteradores',
description: 'Efeitos de audio e video.',
id: `${prefix}menualt`
},
{
title: 'Administracao',
description: 'Comandos para administrar o grupo.',
id: `${prefix}menuadm`
},
{
title: 'Dono',
description: 'Comandos exclusivos do dono do bot.',
id: `${prefix}menudono`
}
]
},
{
title: 'Informacoes e atalhos',
rows: [
{
title: 'Meu perfil',
description: 'Exibe seu perfil.',
id: `${prefix}perfil`
},
{
title: 'Ping do bot',
description: 'Latencia e desempenho do bot.',
id: `${prefix}ping`
},
{
title: 'Criador',
description: 'Informacoes do criador.',
id: `${prefix}criador`
}
]
}
]
}
const botoes = [
{
name: 'single_select',
buttonParamsJson: JSON.stringify(listaMenus)
}
]
const carouselMessage = {
cards: [
{
header: {
hasMediaAttachment: true,
...(menuMedia.videoMessage
? { videoMessage: menuMedia.videoMessage }
: { imageMessage: menuMedia.imageMessage })
},
headerType: menuMedia.videoMessage ? 'VIDEO' : 'IMAGE',
body: {
text: `*${NomeDoBot}*

• Bot: ${NomeDoBot}
• Usuario: ${pushname}
• Cargo: ${isCargo}
• Hora: ${horaBR}`
},
footer: {
text: 'Escolha uma opcao abaixo'
},
nativeFlowMessage: {
buttons: botoes
}
}
]
}
await sayox.relayMessage(from, {
interactiveMessage: {
contextInfo: {
quotedMessage: selo.message,
...(selo.key?.participant ? { participant: selo.key.participant } : {}),
stanzaId: selo.key?.id,
remoteJid: selo.key?.remoteJid,
mentionedJid: [sender]
},
body: {
text: `*Aqui esta seu menu*`
},
carouselMessage
}
}, {})
}
catch (e) {
console.log('ᴇʀʀᴏ ɴᴏ ᴍᴇɴᴜ:', e)
await sayox.sendMessage(from, {
text: mess.error()
}, {
quoted: selo
})
}
}
}
}
}
)
