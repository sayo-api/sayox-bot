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

/*
* Decorações dos menus 
* Author: Sayox.
*/

exports.menu = ( NomeDoBot, sender, isCargo, hora, prefix,  ownerName, baileysVersion
) => {
  return `╭─── *${NomeDoBot}* ───╮

• Usuario: @${sender.split('@')[0]}
• Cargo: ${isCargo}
• Hora: ${hora}

 MENUS
  ${prefix}menualt  - Efeitos de audio e video
  ${prefix}menuadm  - Administracao do grupo
  ${prefix}menudono - Configuracoes do dono

 INFORMACOES
  ${prefix}getbio    - Biografia
  ${prefix}getbanner - Banner
  ${prefix}me        - Meus dados
  ${prefix}idade     - Calcular idade
  ${prefix}totalcmd  - Total de comandos
  ${prefix}gerarlink - Gerar link de grupo

 FIGURINHAS
  ${prefix}s         - Criar figurinha
  ${prefix}togif     - Figurinha em gif
  ${prefix}toimg     - Figurinha em imagem

╰──────────────────────╯`
}
exports.menuadm = (NomeDoBot, sender, isCargo, hora, prefix, ownerName, baileysVersion) => {
return `╭─── *${NomeDoBot} - Menu Admin* ───╮

 GRUPO
  ${prefix}grupo a/f        - Abrir ou fechar o grupo
  ${prefix}fechargp          - Fechar no horario
  ${prefix}abrirgp           - Abrir no horario
  ${prefix}ban               - Banir membro
  ${prefix}promover          - Promover a admin
  ${prefix}rebaixar          - Rebaixar admin
  ${prefix}limpar            - Limpar mensagens
  ${prefix}linkgrupo         - Link do grupo
  ${prefix}marcar            - Marcar membros
  ${prefix}status            - Status do grupo
  ${prefix}admins            - Lista de admins

 MODERACAO
  ${prefix}adv               - Dar advertencia
  ${prefix}deladv            - Remover advertencia
  ${prefix}advlist           - Lista de advertencias
  ${prefix}mute              - Mutar membro
  ${prefix}desmute           - Desmutar membro
  ${prefix}mutelist          - Lista de mutados
  ${prefix}blockcmd          - Bloquear comando
  ${prefix}unblockcmd        - Desbloquear comando
  ${prefix}listblock         - Lista de bloqueios
  ${prefix}soadm             - Somente admins

 BEM-VINDO
  ${prefix}bemvindo          - Ativar bem-vindo
  ${prefix}legendabv         - Legenda de entrada
  ${prefix}fundobv           - Fundo de entrada
  ${prefix}infobemvindos     - Info dos bem-vindos
  ${prefix}delfundos         - Remover fundos

 ANTIS
  ${prefix}antifake          - 1/0
  ${prefix}antiddd           - 1/0
  ${prefix}antirroubo        - 1/0
  ${prefix}antinotas         - 1/0
  ${prefix}antipalavra       - 1/0
  ${prefix}antilinkeasy      - 1/0
  ${prefix}antilinkmedium    - 1/0
  ${prefix}antilinkhard      - 1/0
  ${prefix}antipay           - 1/0
  ${prefix}antibot           - 1/0
  ${prefix}antivideo         - 1/0
  ${prefix}antifoto          - 1/0
  ${prefix}antivisu          - 1/0
  ${prefix}antisticker       - 1/0
  ${prefix}anticontato       - 1/0
  ${prefix}antiloc           - 1/0
  ${prefix}antidocumento     - 1/0
  ${prefix}antiaudio         - 1/0
  ${prefix}antispam          - 1/0
  ${prefix}antistatus        - 1/0
  ${prefix}antimarcacao      - 1/0
  ${prefix}anticanal         - 1/0

 SISTEMAS
  ${prefix}ativar            - Ativar modulos
  ${prefix}autosticker       - Auto figurinha 1/0
  ${prefix}autortext         - Auto texto 1/0
  ${prefix}multiprefix       - Multi prefixo 1/0
  ${prefix}atividades        - Atividades do grupo
  ${prefix}aprovacao         - Aprovacao de membros 1/0
  ${prefix}autoaprovacao     - Auto aprovacao 1/0
  ${prefix}soli              - Solicitar entrada

 LISTA NEGRA E DDD
  ${prefix}addddd            - Adicionar DDD
  ${prefix}delddd            - Remover DDD
  ${prefix}listddd           - Lista de DDDs
  ${prefix}addlistanegra     - Adicionar na lista
  ${prefix}dellistanegra     - Remover da lista
  ${prefix}listanegra        - Lista negra

╰──────────────────────╯`
}

exports.menudono = (NomeDoBot, sender, isCargo, hora, prefix, ownerName, baileysVersion) => {
return `╭─── *${NomeDoBot} - Menu Dono* ───╮

 CONFIGURACOES
  ${prefix}verificado          - Conta verificada
  ${prefix}detector            - Detector de mensagens
  ${prefix}nome-bot            - Mudar nome do bot
  ${prefix}nome-dono           - Mudar nome do dono
  ${prefix}numero-dono         - Mudar numero do dono
  ${prefix}setprefix           - Trocar prefixo
  ${prefix}fotomenu            - Trocar foto do menu
  ${prefix}botoes              - Menu em botoes 1/0
  ${prefix}reiniciar           - Reiniciar o bot

 SISTEMA NO PREFIXO
  ${prefix}rgcmd               - Registrar comando
  ${prefix}delcmd              - Remover comando
  ${prefix}noprefix            - Comandos sem prefixo

 FIGURINHAS
  ${prefix}rgfig               - Registrar figurinha
  ${prefix}delfig              - Remover figurinha
  ${prefix}listafig            - Lista de figurinhas
  ${prefix}rgtake              - Registrar take
  ${prefix}rntake              - Renomear take
  ${prefix}take                - Enviar take

 GERENCIAR GRUPOS
  ${prefix}entrar              - Entrar em grupo
  ${prefix}sairgp              - Sair do grupo
  ${prefix}sairall             - Sair de todos
  ${prefix}bangp               - Banir grupo
  ${prefix}unbangp             - Desbanir grupo

 AUDIO DO MENU
  ${prefix}audio-menu          - Trocar audio do menu
  ${prefix}fundoaudio          - Trocar fundo de audio

 BLOQUEIO GLOBAL
  ${prefix}blockuser           - Bloquear usuario
  ${prefix}unblockuser         - Desbloquear usuario
  ${prefix}antipv              - Anti pv 1/0
  ${prefix}visualizarmsg       - Visualizar mensagens 1/0

╰──────────────────────╯`
}
exports.menualt = (NomeDoBot, sender, isCargo, hora, prefix, ownerName, baileysVersion) => {
return `╭─── *${NomeDoBot} - Alteradores* ───╮

 VIDEO
  ${prefix}videolento          - Video lento
  ${prefix}videorapido         - Video rapido
  ${prefix}videocontrario      - Video inverso

 AUDIO
  ${prefix}audiolento          - Audio lento
  ${prefix}audiorapido         - Audio rapido
  ${prefix}speedup             - Acelerar audio
  ${prefix}slowed              - Reduzir audio
  ${prefix}grave               - Voz grave
  ${prefix}grave2              - Voz grave 2
  ${prefix}esquilo             - Voz de esquilo
  ${prefix}estourar            - Voz estourada
  ${prefix}bass                - Baixo reforcado
  ${prefix}bass2               - Baixo reforcado 2
  ${prefix}vozmenino           - Voz de menino

╰──────────────────────╯`
}
