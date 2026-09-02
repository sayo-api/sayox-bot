/*
 * ============================================================
 *                     SAYOX BOT
 * ============================================================
 *
 * Projeto disponibilizado gratuitamente para a comunidade.
 * Author: Sayox
 * API oficial: https://tokito-apis.com.br
 * ============================================================
 */

const base = require('../../sistemas/grupos.js')
const toggle = require('../../sistemas/toggle.js')
const adv = require('../../sistemas/advertencias.js')
const parcerias = require('../../sistemas/parcerias.js')
const mess = require('../../mensagens/mensagens.js')

const configurar = ctx => toggle({
  ...ctx,
  campo: 'anticanal',
  emoji: '',
  titulo: '𝙰𝙽𝚃𝙸-𝙲𝙰𝙽𝙰𝙻',
  descricao: 'ᴀᴘᴀɢᴀ ᴇ ᴘᴜɴᴇ ᴇɴᴠɪᴏ ᴅᴇ ʟɪɴᴋ ᴏᴜ ᴍᴇɴsᴀɢᴇᴍ ᴇɴᴄᴀᴍɪɴʜᴀᴅᴀ ᴅᴇ ᴄᴀɴᴀʟ.'
})

const contexto = mensagem =>
  mensagem?.extendedTextMessage?.contextInfo ||
  mensagem?.imageMessage?.contextInfo ||
  mensagem?.videoMessage?.contextInfo ||
  mensagem?.documentMessage?.contextInfo ||
  mensagem?.audioMessage?.contextInfo ||
  {}

const texto = (mensagem, body = '') => String(
  body ||
  mensagem?.conversation ||
  mensagem?.extendedTextMessage?.text ||
  mensagem?.imageMessage?.caption ||
  mensagem?.videoMessage?.caption ||
  mensagem?.documentMessage?.caption ||
  ''
)

const linkRegex = /https?:\/\/(?:www\.)?(?:whatsapp\.com\/channel|wa\.me\/channel)\/[0-9A-Za-z_-]+/i

const detectar = (mensagem, body = '') => Boolean(
  contexto(mensagem)?.forwardedNewsletterMessageInfo ||
  linkRegex.test(texto(mensagem, body))
)

const verificar = async ctx => {
  const {
    sayox,
    info,
    from,
    sender,
    mensagem,
    body,
    isGroup,
    isGroupAdmins,
    isBotGroupAdmins,
    dono,
    config,
    newsletter,
    selo,
    dataGp,
    setGp
  } = ctx

  if (
    !isGroup ||
    !config?.anticanal ||
    isGroupAdmins ||
    dono ||
    info?.key?.fromMe ||
    !detectar(mensagem, body)
  )
    return false

  if (parcerias.podeIgnorarAntiLink(from, sender))
    return false

  if (!isBotGroupAdmins)
    return false

  await base.apagar(sayox, info)

  const r = adv.adicionar({
    dataGp,
    setGp,
    grupo: from,
    jid: sender,
    motivo: 'Envio/divulgação de canal do WhatsApp',
    autor: 'anti-canal'
  })

  let removido = false

  if (r.remove) {
    try {
      await sayox.groupParticipantsUpdate(from, [sender], 'remove')
      removido = true
    }
    catch {
    }
  }

  await sayox.sendMessage(from, {
    text: mess.antiCanalAdv(sender, r.quantidade, removido),
    contextInfo: {
      ...newsletter,
      mentionedJid: [sender]
    }
  }, { quoted: selo }).catch(() => {
  })

  return true
}

module.exports = {
  configurar,
  verificar,
  detectar,
  linkRegex
}
