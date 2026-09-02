/*
 * ============================================================
 *              SAYOX BOT - AUTH STATE (MONGODB)
 * ============================================================
 *
 * Substitui o useMultiFileAuthState (arquivos em disco) por
 * documentos no MongoDB, um por chave (creds + cada chave de
 * sinal), na coleção "auth_state". Necessário para persistir a
 * conexão do WhatsApp em ambientes com disco efêmero (ex.: Render).
 * ============================================================
 */

const { proto, initAuthCreds, BufferJSON } = require('baileys')
const mongo = require('./mongo.js')

const COLLECTION = 'auth_state'

async function useMongoAuthState() {
  await mongo.conectar()
  if (!mongo.getClient()) {
    throw new Error('MongoDB indisponível: configure MONGO_URI em config-all.json para autenticar o bot.')
  }

  const readData = async id => {
    const raw = await mongo.carregar(COLLECTION, id)
    if (!raw) return null
    try {
      return JSON.parse(raw, BufferJSON.reviver)
    } catch {
      return null
    }
  }

  const writeData = (id, data) => mongo.gravar(COLLECTION, id, JSON.stringify(data, BufferJSON.replacer))

  const removeData = id => mongo.remover(COLLECTION, id)

  const creds = (await readData('creds')) || initAuthCreds()

  return {
    state: {
      creds,
      keys: {
        get: async (type, ids) => {
          const data = {}
          await Promise.all(ids.map(async id => {
            let value = await readData(`${type}-${id}`)
            if (type === 'app-state-sync-key' && value) {
              value = proto.Message.AppStateSyncKeyData.fromObject(value)
            }
            data[id] = value
          }))
          return data
        },
        set: async data => {
          const tasks = []
          for (const category in data) {
            for (const id in data[category]) {
              const value = data[category][id]
              const key = `${category}-${id}`
              tasks.push(value ? writeData(key, value) : removeData(key))
            }
          }
          await Promise.all(tasks)
        }
      }
    },
    saveCreds: () => writeData('creds', creds)
  }
}

async function isRegistered() {
  try {
    await mongo.conectar()
    if (!mongo.getClient()) return false
    const raw = await mongo.carregar(COLLECTION, 'creds')
    if (!raw) return false
    const creds = JSON.parse(raw, BufferJSON.reviver)
    return creds?.registered === true
  } catch {
    return false
  }
}

async function limparSessao() {
  await mongo.conectar()
  await mongo.limparColecao(COLLECTION)
}

module.exports = { useMongoAuthState, isRegistered, limparSessao }
