<div align="center">

# 🌿 Visionguide
### Aventura na Floresta Amazônica

**Site de apresentação de uma experiência educativa sobre a Amazônia, com foco em exploração, sustentabilidade e acessibilidade.**

[![CI/CD | Visionguide](https://github.com/MaxwilliamSena/Visionguide/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/MaxwilliamSena/Visionguide/actions/workflows/ci-cd.yml)

[🌐 Acessar o site](https://maxwilliamsena.github.io/Visionguide/) · [💻 Repositório](https://github.com/MaxwilliamSena/Visionguide) · [⚙️ Acompanhar o CI/CD](https://github.com/MaxwilliamSena/Visionguide/actions)

</div>

---

## 📖 Sobre o projeto

O **Visionguide** apresenta o projeto **Aventura na Floresta Amazônica**, uma proposta de jogo educativo de exploração em terminal. O conteúdo destaca a importância da conservação ambiental, do respeito à natureza e da aprendizagem sobre a floresta amazônica.

A página utiliza uma identidade visual inspirada em terminais de computador, com tons de verde, tipografia monoespaçada, efeitos visuais e navegação responsiva.

> **Escopo deste repositório:** os arquivos disponíveis implementam o **site de apresentação** do jogo. O programa Python mencionado na página (`jogo_aventura.py`) e o banco SQLite do jogo **não fazem parte dos arquivos analisados**. Portanto, o site publicado no GitHub Pages não executa o jogo em si.

## ✨ Funcionalidades da página

- Apresentação da proposta e dos objetivos educacionais.
- Descrição das **sete fases** da aventura.
- Manual dos controles por teclado previstos para o jogo.
- Seção com instruções de instalação e execução do jogo, para quando seu arquivo estiver disponível.
- Menu responsivo para dispositivos móveis.
- Animações de entrada e visual inspirado em um terminal.

## 🧰 Tecnologias utilizadas

| Tecnologia | Utilização |
| --- | --- |
| **HTML5** | Estrutura e conteúdo da página |
| **CSS3 e Tailwind CSS (CDN)** | Estilização e responsividade |
| **JavaScript** | Interações, menu mobile e animações |
| **Lucide Icons** | Ícones da interface |
| **Google Fonts — Fira Code** | Tipografia |
| **Node.js 22** | Execução dos testes e preparação dos arquivos para deploy |
| **GitHub Actions** | Automação de testes, build e publicação |
| **GitHub Pages** | Hospedagem da página estática |

**Observação:** a página carrega Tailwind CSS, Lucide e a fonte Fira Code de serviços externos; esses recursos dependem de conexão à internet para serem carregados integralmente.

## 📁 Estrutura principal

```text
Visionguide/
├── .github/
│   └── workflows/
│       └── ci-cd.yml                # Pipeline automatizado
├── scripts/
│   └── build.mjs                # Gera a versão estática para publicação
├── tests/
│   └── site.test.mjs            # Testes automatizados
├── index.html                   # Página principal
├── package.json                 # Comandos de teste e build
├── .gitignore
├── GUIA_PIPELINE_CI_CD.md       # Guia detalhado da demonstração
└── ROTEIRO_FALA_APRESENTACAO.md # Apoio para o seminário
```

A pasta `dist/` é criada automaticamente pelo build e não precisa ser enviada ao repositório.

## 🚀 Como executar localmente

Para visualizar apenas o site, clone o repositório e abra o arquivo **`index.html`** no navegador:

```bash
git clone https://github.com/MaxwilliamSena/Visionguide.git
cd Visionguide
```

Outra opção é iniciar um servidor estático local, caso tenha Python instalado:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000` no navegador. Esse comando serve **somente o site**, não inicia o jogo mencionado na página.

### Executar os testes e gerar o build

Instale o **Node.js 22** ou versão compatível (`>=20` no `package.json`). Na raiz do projeto, execute:

```bash
npm test
npm run build
```

O comando `npm test` executa os testes automatizados; `npm run build` gera `dist/index.html` para publicação. Este projeto utiliza apenas módulos nativos do Node.js para essas tarefas, portanto **não exige `npm install`** para executar os comandos acima.

Também é possível rodar ambos em sequência:

```bash
npm run check
```

## 🔄 Pipeline CI/CD

O workflow está configurado em **`.github/workflows/ci-cd.yml`** e pode ser executado automaticamente após `push` na branch `main`, em *pull requests* direcionados à `main` ou manualmente pela aba **Actions**.

```text
Commit / Push na main
         │
         ▼
  1. Validar o site
     └─ npm test
         │ (apenas se os testes passarem)
         ▼
  2. Preparar os arquivos
     └─ npm run build → dist/
         │ (apenas se o build passar)
         ▼
  3. Publicar no GitHub Pages
     └─ Deploy da versão aprovada
```

> *Pull requests* executam validação e build, mas **não fazem deploy**. A publicação automática está condicionada a uma execução elegível na branch `main` e ao sucesso das etapas anteriores.

### ✅ Verificações automatizadas

Atualmente, a suíte possui **6 testes**:

1. Estrutura HTML básica e idioma `pt-BR`.
2. Existência das seções `sobre`, `fases`, `controles` e `instalacao`.
3. Validade dos links internos (`href="#..."` apontando para um `id` existente).
4. Ausência de IDs HTML duplicados.
5. Presença dos elementos do menu mobile.
6. Ausência de erros de sintaxe no JavaScript embutido.

Esses testes cobrem verificações estruturais e sintáticas. Eles **não substituem** testes completos de navegação, acessibilidade, experiência do usuário ou do jogo em Python.

### 🧪 Demonstração de falha e correção

Para apresentar o CI/CD em funcionamento:

1. Altere um texto visível de `index.html`, faça o commit e acompanhe a execução iniciando automaticamente em **Actions**.
2. Para simular um erro, altere **uma ocorrência** de `href="#instalacao"` para `href="#instalacao-erro"`, sem criar um elemento com esse novo ID.
3. Envie a mudança para `main`: o teste de links internos deverá falhar e **impedir o novo deploy**.
4. Corrija o link para `href="#instalacao"`, faça outro commit e confirme as três etapas verdes.
5. Acesse a página publicada e verifique a versão mais recente.

Quando a validação falha, o workflow **não publica aquela alteração**. A última versão implantada com sucesso tende a continuar disponível. Isso não impede publicações realizadas por **outros workflows ou provedores independentes**, se existirem.

## 🌍 Publicação

A página foi configurada para publicação no **GitHub Pages**:

**URL do projeto:** https://maxwilliamsena.github.io/Visionguide/

No repositório, confira **Settings → Pages → Build and deployment → Source: GitHub Actions**. O endereço definitivo e o status de deploy podem ser conferidos em **Settings → Pages** ou no job de publicação em **Actions**.

## ♿ Acessibilidade e evolução

A proposta do jogo destaca a utilização por teclado e a integração com o leitor de telas **NVDA**. No entanto, as verificações automatizadas atuais **não certificam** a acessibilidade da interface web ou do jogo. Entre as melhorias futuras estão testes de navegação por teclado, auditoria de acessibilidade, testes de interface em navegador e integração do projeto executável quando seu código for disponibilizado.

## 📚 Materiais complementares

- [`GUIA_PIPELINE_CI_CD.md`](./GUIA_PIPELINE_CI_CD.md): configuração, testes e demonstração ao vivo.
- [`ROTEIRO_FALA_APRESENTACAO.md`](./ROTEIRO_FALA_APRESENTACAO.md): roteiro para apresentar o pipeline no seminário.
- [Documentação do GitHub Actions](https://docs.github.com/pt/actions).
- [Documentação do GitHub Pages](https://docs.github.com/pt/pages).

---

<div align="center">

**Visionguide • Educação, tecnologia e valorização da Floresta Amazônica** 🌱

</div>
