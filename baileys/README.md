# Baileys — Sayox (v7.0.0-rc14)

Versão modificada da Baileys usada pelo bot **Sayox**, mantida por `sayo-api`.

Baseada na versão v7.0.0-rc14 com suporte às adaptações de botões.

## Instalação direta pelo GitHub

No `package.json` do seu bot, use este repositório como dependência:

```json
{
  "dependencies": {
    "baileys": "github:sayo-api/baileys-sayox#main"
  }
}
```

Nos arquivos do bot:

```js
const { proto } = require('baileys')
```

ou, por ser um pacote ESM, quando necessário:

```js
const baileys = await import('baileys')
```

## Importante

Este repositório já contém os arquivos compilados em `lib/`, então não depende de `src/` nem de TypeScript para ser instalado a partir do GitHub.

## Requisitos

Node.js 20+ (verificado automaticamente no `preinstall` via `engine-requirements.js`).

## Licença

MIT