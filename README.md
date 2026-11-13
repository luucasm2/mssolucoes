# MS Soluções — Segurança e Automação

Site institucional desenvolvido em React + Vite, com visual minimalista, fundo branco, detalhes em azul `#4260E6` e layout responsivo.

## Seções

- Início
- Sobre a empresa
- Serviços (CFTV, cerca elétrica e automação)
- Avaliações
- Contato

## Requisitos

- Node.js (versão LTS recomendada)
- npm (instalado junto com o Node.js)
- Conexão com a internet na primeira instalação das dependências

## Como iniciar no Windows

1. Extraia o arquivo ZIP para uma pasta do computador.
2. Abra a pasta `ms-solucoes-react`.
3. Dê dois cliques em `INICIAR_SITE.bat`.
4. Na primeira execução, o arquivo instala as dependências e inicia o servidor.
5. Acesse o endereço local exibido no terminal (normalmente `http://localhost:5173`).

**Importante:** não abra o `index.html` diretamente pelo Explorador de Arquivos. Projetos React com Vite precisam ser executados pelo servidor de desenvolvimento.

## Como iniciar pelo terminal

Na pasta do projeto, execute:

```bash
npm install
npm run dev
```

## Gerar versão de produção

```bash
npm run build
npm run preview
```

## Configurar WhatsApp

Antes de publicar, abra `src/config.js` e informe o WhatsApp oficial da MS Soluções em `WHATSAPP_NUMBER`, usando somente números com código do país e DDD. Exemplo de formato: `5511999999999`.

Opcionalmente, informe em `REVIEWS_URL` o link público das avaliações verificadas da empresa. Enquanto esse link estiver vazio, a seção de avaliações deixa claro que as avaliações verificadas serão adicionadas posteriormente — nenhum depoimento fictício é exibido.

## Imagens

As fotografias são ilustrativas e carregadas do Unsplash por URL. Substitua-as por imagens próprias/autorizadas da MS Soluções quando disponíveis.

## Publicação na Vercel

Importe o repositório GitHub na Vercel ou execute `npx vercel` na pasta do projeto. Para publicar em produção, execute `npx vercel --prod`.


## Responsividade revisada

O layout foi ajustado para celulares compactos, smartphones, tablets, notebooks e monitores. O menu mobile passa a abrir abaixo do cabeçalho e os grids, imagens, cartões e formulário reorganizam-se conforme a largura disponível. A conferência de layout foi realizada em larguras de 320 px a 1440 px, sem rolagem horizontal.

## Responsividade

O layout foi revisado para desktops, notebooks, tablets e smartphones, com pontos de quebra em 1200px, 920px, 680px, 420px e 350px. Navegação, grades, formulários, imagens e espaçamentos se reorganizam conforme a largura disponível.


### Correção adicional para celulares

Foi aplicada uma camada final de regras mobile para impedir largura mínima indevida, reorganizar todas as grades em uma coluna, limitar imagens e formulários à largura disponível e fixar o menu móvel à viewport. Também foi garantida a meta viewport para navegadores móveis.
