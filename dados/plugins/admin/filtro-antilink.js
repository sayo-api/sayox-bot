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
 * Author: Sayox
 * API oficial: https://tokito-apis.com.br
 * ============================================================
 */

const base = require('../../sistemas/grupos.js')
const parcerias = require('../../sistemas/parcerias.js')
const mess = require('../../mensagens/mensagens.js')

const regex = /(?:https?:\/\/)?(?:www\.)?(?:chat\.whatsapp\.com\/[^\s]+|whatsapp\.com\/channel\/[^\s]+)/i

const dadosNivel = {
  easy: {
    emoji: '',
    titulo: '𝙰𝙽𝚃𝙸-𝙻𝙸𝙽𝙺 𝙴𝙰𝚂𝚈',
    descricao: 'ᴀᴘᴀɢᴀ sᴏᴍᴇɴᴛᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ǫᴜᴇ ᴄᴏɴᴛᴇ́ᴍ ᴏ ʟɪɴᴋ.'
  },
  medium: {
    emoji: '',
    titulo: '𝙰𝙽𝚃𝙸-𝙻𝙸𝙽𝙺 𝙼𝙴𝙳𝙸𝚄𝙼',
    descricao: 'ᴀᴘᴀɢᴀ ᴀ ᴍᴇɴsᴀɢᴇᴍ, ғᴇᴄʜᴀ ᴏ ɢʀᴜᴘᴏ ᴇ ᴀʙʀᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ ᴀᴘᴏ́s 3 sᴇɢᴜɴᴅᴏs.'
  },
  hard: {
    emoji: '',
    titulo: '𝙰𝙽𝚃𝙸-𝙻𝙸𝙽𝙺 𝙷𝙰𝚁𝙳',
    descricao: 'ᴀᴘᴀɢᴀ ᴀ ᴍᴇɴsᴀɢᴇᴍ, ғᴇᴄʜᴀ ᴏ ɢʀᴜᴘᴏ, ʀᴇᴍᴏᴠᴇ ᴏ ᴜsᴜᴀ́ʀɪᴏ ᴇ ᴀʙʀᴇ ᴏ ɢʀᴜᴘᴏ ɴᴏᴠᴀᴍᴇɴᴛᴇ.'
  }
}

const configurar = async ({ grupo, dataGp, setGp, nivel, q, prefix, command, reply }) => {
  const acao = String(q || '').trim()
  const dados = dadosNivel[nivel]

  if (!dados)
    return false

  if (!['0', '1'].includes(acao))
    return reply(mess.funcaoUso(dados.emoji, dados.titulo, prefix, command, dados.descricao))

  const valor = acao === '1'
    ? {
        ativo: true,
        nivel
      }
    : {
        ativo: false,
        nivel: null
      }

  if (Array.isArray(dataGp) && dataGp[0] && typeof setGp === 'function') {
    if (!dataGp[0].funcoes || typeof dataGp[0].funcoes !== 'object')
      dataGp[0].funcoes = {}

    dataGp[0].funcoes.antilink = valor
    setGp(dataGp)
  }
  else {
    const grupoDados = base.lerGrupo(grupo)

    if (!grupoDados[0].funcoes || typeof grupoDados[0].funcoes !== 'object')
      grupoDados[0].funcoes = {}

    grupoDados[0].funcoes.antilink = valor
    base.salvarGrupo(grupo, grupoDados)
  }

  return reply(
    acao === '1'
      ? mess.funcaoAtivada(dados.emoji, dados.titulo, `${dados.descricao} ᴀᴘᴇɴᴀs ᴍᴇᴍʙʀᴏs sᴇʀᴀ̃ᴏ ᴘᴜɴɪᴅᴏs.`)
      : mess.funcaoDesativada(dados.emoji, dados.titulo, 'ᴏ sɪsᴛᴇᴍᴀ ᴀɴᴛɪ-ʟɪɴᴋ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ɴᴇsᴛᴇ ɢʀᴜᴘᴏ.')
  )
}

const verificar = async ctx => {
  const {
    sayox,
    info,
    from,
    sender,
    body,
    isGroup,
    isGroupAdmins,
    isBotGroupAdmins,
    config,
    newsletter,
    selo
  } = ctx

  if (!isGroup || !config?.antilink?.ativo)
    return false

  if (!['easy', 'medium', 'hard'].includes(config.antilink.nivel))
    return false

  if (parcerias.podeIgnorarAntiLink(from, sender))
    return false

  if (isGroupAdmins || !regex.test(String(body || '')))
    return false

  if (!isBotGroupAdmins)
    return false

  const nivel = config.antilink.nivel
  const numero = base.numero(sender)

  await base.apagar(sayox, info)

  if (nivel === 'easy') {
    await sayox.sendMessage(from, {
      text: mess.antilinkDetectado('easy', numero),
      contextInfo: {
        ...newsletter,
        mentionedJid: [sender]
      }
    }, { quoted: selo }).catch(() => {
    })

    return true
  }

  if (nivel === 'medium') {
    let fechado = false

    try {
      await sayox.groupSettingUpdate(from, 'announcement')
      fechado = true
      await base.esperar(3000)
    }
    catch (error) {
      console.log('[ANTILINK MEDIUM]', error?.message || error)
    }
    finally {
      if (fechado) {
        await sayox.groupSettingUpdate(from, 'not_announcement').catch(() => {
        })
      }
    }

    await sayox.sendMessage(from, {
      text: mess.antilinkDetectado('medium', numero),
      contextInfo: {
        ...newsletter,
        mentionedJid: [sender]
      }
    }, { quoted: selo }).catch(() => {
    })

    return true
  }

  let removido = false

  try {
    await sayox.groupSettingUpdate(from, 'announcement')
    await sayox.groupParticipantsUpdate(from, [sender], 'remove')
    removido = true
    await base.esperar(3000)
  }
  catch (error) {
    console.log('[ANTILINK HARD]', error?.message || error)
  }
  finally {
    await sayox.groupSettingUpdate(from, 'not_announcement').catch(() => {
    })
  }

  await sayox.sendMessage(from, {
    text: mess.antilinkDetectado('hard', numero, removido),
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
  regex,
  dadosNivel
}
