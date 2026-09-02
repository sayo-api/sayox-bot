/*
 * ============================================================
 *                      SAYOX BOT - MONGO
 * ============================================================
 *
 * Camada de persistência em MongoDB para o Sayox Bot (modo livre,
 * base TokitoBot V10). Substitui a gravação em JSON por documentos
 * no banco, mantendo uma interface síncrona via cache em memória
 * para não reescrever todos os call-sites.
 *
 * - init(uri): conecta ao MongoDB.
 * - get/set: coleção chave/valor com cache em memória.
 * ============================================================
 */

const path = require('path')

let MongoClient = null
try {
  ;({ MongoClient } = require('mongodb'))
} catch (_) {
  MongoClient = null
}

const CONFIG = path.join(__dirname, '..', '..', 'INFO_DADOS', 'config-all.json')

let client = null
let db = null
let banco = 'sayoxbot'
let uri = ''
let conectando = null

const cache = new Map()

function config() {
  try {
    const json = JSON.parse(require('fs').readFileSync(CONFIG, 'utf8'))
    const m = String(json.MONGO_URI || process.env.MONGO_URI || '').trim()
    const b = String(json.MONGO_DB || process.env.MONGO_DB || '').trim()
    return { uri: m, banco: b }
  } catch {
    return { uri: '', banco: '' }
  }
}

function carregarConfig() {
  const c = config()
  if (c.uri) uri = c.uri
  if (c.banco) banco = c.banco
}

carregarConfig()

function indisponivel() {
  return !MongoClient || !uri
}

async function conectar() {
  if (client) return client
  if (conectando) return conectando
  if (indisponivel()) return null

  conectando = (async () => {
    try {
      client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 })
      await client.connect()
      db = client.db(banco)
      console.log('Sayox Mongo: conectado.')
      return client
    } catch (error) {
      console.error('Sayox Mongo: falha ao conectar.', error?.message || error)
      client = null
      db = null
      return null
    } finally {
      conectando = null
    }
  })()

  return conectando
}

// Carrega do Mongo (só tenta se a coleção/documento existir).
async function carregar(colecao, chave) {
  if (!db) return null
  try {
    const doc = await db.collection(colecao).findOne({ _id: String(chave) })
    return doc ? doc.valor : null
  } catch (_) {
    return null
  }
}

// Grava no Mongo (fire-and-forget, com retry mínimo).
async function gravar(colecao, chave, valor) {
  if (!db) return
  try {
    await db.collection(colecao).updateOne(
      { _id: String(chave) },
      { $set: { valor, atualizadoEm: new Date() } },
      { upsert: true }
    )
  } catch (_) {
    // tenta uma única vez mais
    try {
      await db.collection(colecao).updateOne(
        { _id: String(chave) },
        { $set: { valor, atualizadoEm: new Date() } },
        { upsert: true }
      )
    } catch (__) {}
  }
}

// Remove um documento do Mongo e do cache.
async function remover(colecao, chave) {
  const mapa = cache.get(colecao)
  if (mapa) mapa.delete(String(chave))
  if (!db) return
  try {
    await db.collection(colecao).deleteOne({ _id: String(chave) })
  } catch (_) {}
}

// Remove todos os documentos de uma coleção (ex.: limpar sessão do WhatsApp).
async function limparColecao(colecao) {
  cache.delete(colecao)
  if (!db) return
  try {
    await db.collection(colecao).deleteMany({})
  } catch (_) {}
}

function getCache(colecao, chave) {
  const mapa = cache.get(colecao)
  return mapa ? mapa.get(String(chave)) : undefined
}

function setCache(colecao, chave, valor) {
  let mapa = cache.get(colecao)
  if (!mapa) {
    mapa = new Map()
    cache.set(colecao, mapa)
  }
  mapa.set(String(chave), valor)
  gravar(colecao, chave, valor)
}

// Interface síncrona usada pelos sistemas legados.
function get(colecao, chave) {
  const v = getCache(colecao, chave)
  if (v !== undefined)
    return v

  let sincrono = undefined
  carregar(colecao, chave).then(loaded => {
    if (loaded !== undefined && loaded !== null) {
      setCacheSilencioso(colecao, chave, loaded)
      sincrono = loaded
    }
  })
  return sincrono
}

function setCacheSilencioso(colecao, chave, valor) {
  let mapa = cache.get(colecao)
  if (!mapa) {
    mapa = new Map()
    cache.set(colecao, mapa)
  }
  mapa.set(String(chave), valor)
}

function set(colecao, chave, valor) {
  setCache(colecao, chave, valor)
}

async function iniciar() {
  await conectar()
}

module.exports = {
  iniciar,
  conectar,
  get,
  set,
  carregar,
  gravar,
  remover,
  limparColecao,
  config,
  getConfig: config,
  setUri: u => { uri = u },
  getBanco: () => banco,
  getClient: () => client,
  getDb: () => db
}