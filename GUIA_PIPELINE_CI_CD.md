# Visionguide — Pipeline CI/CD para apresentacao

## O que foi identificado no ZIP original

- Site estatico, com `index.html` na **raiz** do repositorio (e uma copia antiga em `Links do git/Docs/Front/`).
- HTML + CSS embutido + JavaScript embutido.
- Tailwind CSS e icones Lucide carregados de CDNs; fonte Fira Code do Google Fonts.
- A pagina se chama **Aventura na Floresta Amazonica**, um site de apresentacao de jogo educativo.
- O ZIP **nao inclui** o arquivo Python do jogo, banco SQLite nem um backend. GitHub Pages vai publicar a pagina HTML, nao o jogo Python.

## Estrutura adicionada

```text
Visionguide/
├── index.html                      # Seu site original, preservado
├── .github/workflows/ci-cd.yml    # Execucao automatica
├── tests/site.test.mjs             # Seis testes sobre o seu site real
├── scripts/build.mjs              # Prepara o conteudo para o Pages
├── package.json                   # Comandos npm test / npm run build
├── .gitignore
└── GUIA_PIPELINE_CI_CD.md
```

A pasta `dist/` e gerada e nao deve ser enviada ao GitHub.

## Primeiro: conferir localmente

Instale **Node.js 22**, abra o terminal **na raiz do projeto** e execute:

```bash
npm test
npm run build
```

O primeiro comando executa 6 testes: estrutura da pagina, secoes, links internos, IDs duplicados, menu mobile e sintaxe do JavaScript. O segundo gera `dist/index.html`.

**Nao precisa fazer `npm install`:** o projeto usa apenas modulos que ja vem com o Node.js.

## Segundo: habilitar GitHub Pages ANTES do primeiro push

No repositorio, abra `Settings` > `Pages` e selecione **GitHub Actions** em `Build and deployment > Source`. Faça isso antes de enviar o workflow para evitar que a primeira publicacao falhe por falta de configuracao.

## Terceiro: adicionar ao repositorio EXISTENTE no GitHub

O ZIP completo acompanha a raiz do seu projeto com os arquivos novos integrados; o `index.html` original foi mantido. Se preferir nao substituir os arquivos existentes, use o ZIP menor chamado **patch** e copie somente os arquivos/pastas novos para a **raiz** do repositório (`.github`, `tests`, `scripts`, `package.json`, `.gitignore`, `GUIA_PIPELINE_CI_CD.md`).

Em um clone local do repositorio `https://github.com/MaxwilliamSena/Visionguide`:

```bash
git add .github tests scripts package.json .gitignore GUIA_PIPELINE_CI_CD.md ROTEIRO_FALA_APRESENTACAO.md
git commit -m "ci: adicionar pipeline de testes e deploy do site"
git push origin main
```

**Atenção:** quem fizer o push precisa estar autenticado e com permissao para escrever nesse repositório. Nao foi efetuado nenhum push automaticamente aqui.

## Quarto: conferir a publicacao no GitHub Pages

1. Abra a aba **Actions** no repositorio e acompanhe `CI/CD | Visionguide`.
2. Se necessario, confirme que `Settings` > `Pages` > `Source` continua definido como **GitHub Actions**.
3. Quando `deploy` concluir com sucesso, clique na URL mostrada no job de deploy / em `Settings > Pages`.

Endereco **esperado**, que ainda depende da publicacao: `https://maxwilliamsena.github.io/Visionguide/` (a capitalizacao do caminho corresponde ao nome do repositorio; confirme a URL real exibida pelo GitHub).

Se o `deploy` falhar: primeiro confirme se `Settings > Pages > Source` esta definido como GitHub Actions e se Actions estao habilitadas para o repositório. Para o GitHub Free, Pages normalmente precisa que o repositorio seja publico.

## DEMONSTRACAO AO VIVO: as 5 etapas do professor

**1. Alterar uma linha e fazer commit.**

No `index.html` da raiz, encontre o texto:

```html
<p class="text-green-400/60 text-sm">Carregando mapas... 7 fases encontradas.</p>
```

Troque apenas o texto para:

```html
<p class="text-green-400/60 text-sm">Carregando mapas... 7 fases prontas para explorar.</p>
```

Execute:

```bash
git add index.html
git commit -m "feat: atualizar mensagem das fases"
git push origin main
```

**2. Mostrar o pipeline disparando sozinho.**

No GitHub, abra `Actions` > `CI/CD | Visionguide` e clique na execucao mais recente. Mostre as etapas `1 - Validar o site`, `2 - Preparar os arquivos`, `3 - Publicar no GitHub Pages`.

**3. Quebrar um teste de proposito.**

Altere **somente uma ocorrencia** de `href="#instalacao"` no `index.html`, transformando-a em `href="#instalacao-erro"`. Nao crie um elemento com esse novo ID. Depois:

```bash
git add index.html
git commit -m "test: simular link interno quebrado"
git push origin main
```

Em `Actions`, abra a nova execucao. O teste `Todos os links internos apontam para um id existente` deve ficar **vermelho**, com uma mensagem parecida com `Link quebrado: href="#instalacao-erro" nao tem elemento id="instalacao-erro"`. Como o job `build` depende dos testes, nao havera novo deploy.

**4. Corrigir e mostrar tudo verde.**

Corrija a mesma linha de volta para `href="#instalacao"`. Depois:

```bash
git add index.html
git commit -m "fix: restaurar link de instalacao"
git push origin main
```

No GitHub Actions, os tres jobs devem terminar com sucesso (depois da publicacao). Note que o site publico existente continua funcionando enquanto uma execucao com teste falho bloqueia a nova publicacao.

**5. Abrir a aplicacao atualizada.**

Abra o link de Pages mostrado pelo GitHub e localize a frase nova `7 fases prontas para explorar.`. O GitHub Pages hospeda apenas a pagina estatica.

## Plano B: video

Grave de antemao a tela com OBS ou gravador do computador mostrando: push -> workflow iniciado -> falha intencional -> correcao -> status verde -> site publicado. Guarde o arquivo do video localmente caso a internet da sala falhe.

## Observacoes honestas para explicar ao professor

- **CI** = integracao continua: os testes rodam a cada push e pull request.
- **CD** = entrega/implantacao continua: o push na `main` publica automaticamente no GitHub Pages **se os testes passarem**.
- O **build** e um empacotamento/copia de arquivos estaticos para `dist/`; nao ha compilacao de framework nem npm install.
- Os 6 testes detectam erros basicos e de links internos, mas **nao substituem** testes de navegador, de acessibilidade, de usabilidade nem do jogo Python.
- O uso de Tailwind, Lucide e Google Fonts via CDN significa que o visual completo depende dessas conexoes externas.

## Consulta oficial

- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
