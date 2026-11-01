# Padrão de site estático multilíngue

Regras para criar e manter páginas, tutoriais e apps em HTML puro.

**Para reutilizar em outro site:** copie este arquivo para a raiz do novo repositório e troque os valores da seção 1, as paletas da seção 6 se a marca for outra e o domínio do card na seção 8. Se o projeto ainda não tiver páginas, baixe os modelos da seção 1 do repositório indicado nela e adapte. Sem a seção 1 preenchida, pergunte os valores antes de criar páginas. Em projeto que não é site, só a seção 2 se aplica.

## 1. Valores deste site

| Variável | Valor |
|---|---|
| Autor | Giovani Perotto Mesquita |
| Cidade no rodapé | Porto Alegre, RS |
| Publicação | GitHub Pages: `https://github.com/GiovaniPM/giovanipm.github.io`, ramo `master` |
| Idiomas | `pt` (padrão, `pt-BR`), `en`, `it`, `es` |
| Crédito no byline | "Revisado e formatado usando Anthropic Claude" (traduzido em cada idioma) |
| Índice de conteúdo | `projects.html` |
| Modelo de tutorial ou manual de app | `MyLittleIceWorldTutorial.html` |
| Modelo de tutorial de app com interface multilíngue | `DFDSimulator.html` |
| Modelo de artigo e de entrevista | `BDD.html`, `WanderWildner.html` |
| Modelo de app de ferramenta | `dfd-simulator.html` |
| Pastas que não se alteram | `OLD*`, `Code`, `LinkedIn` |
| Páginas fora do padrão, que não servem de modelo | `Artigos.html`, `Inserção orbital.html`, `poker.html` |

Menu, nesta ordem:

| Arquivo | pt | en | it | es |
|---|---|---|---|---|
| `index.html` | Início | Home | Home | Inicio |
| `about.html` | Sobre | About | Chi sono | Sobre mí |
| `resume.html` | Currículo | Resume | Curriculum | Currículum |
| `projects.html` | Projetos | Projects | Progetti | Proyectos |
| `contact.html` | Contato | Contact | Contatti | Contacto |

## 2. Como trabalhar

- Responda no idioma do usuário. Aqui, português do Brasil.
- Faça commit ou push só quando pedirem. Criar arquivo não implica publicar.
- Este repositório é público e publicado pelo GitHub Pages, inclusive este arquivo. Nunca grave segredos em nada que vá para ele.
- Antes de criar algo, procure uma página parecida e siga o padrão dela.
- Afirmação factual, data ou norma vem de fonte consultada. Se as fontes divergem, registre a divergência nas referências em vez de escolher uma em silêncio.
- Número em texto vem de medição ou de execução real. Diga como foi obtido e o que ele não mede. Simulação é modelo: não a apresente como medida do mundo real.
- Teste como o usuário usa: cliques e teclas de verdade, passando pelos menus. Chamar a função direto no teste esconde defeitos, como já aconteceu.
- Siga o próprio roteiro de cada tutorial no app, para conferir que os passos funcionam.
- Olhe capturas de tela de cada figura e tela. Teste automático não vê texto sobreposto.
- Ao entregar, diga o que foi testado e o que não foi (Safari, Firefox, celulares reais, revisão humana das traduções). Se errou, diga qual foi o erro.

## 3. Estrutura

- HTML, CSS e JS puros, sem build e sem framework. Cada página carrega o próprio CSS e JS inline.
- Conteúdo: `PascalCase.html` na raiz (`BDD.html`, `GuiaSQL.html`).
- Apps de ferramenta: `kebab-case.html` na raiz, com o tutorial em PascalCase (`dfd-simulator.html` e `DFDSimulator.html`).
- Jogos: `PascalCase.html`, com o tutorial em `NomeTutorial.html`.
- Imagens: `rc_images/`. O pedido "um único HTML" vale para apps. Tutoriais seguem o modelo, com SVGs à parte.
- Conteúdo nunca é entregue em Markdown: use o modelo HTML do site.

## 4. Idiomas

- Toda página tem todo o conteúdo em todos os idiomas, inclusive figuras e prompts. Nada de texto só em português nos painéis traduzidos.
- Cada idioma fica em um painel: `<div id="en" role="tabpanel" aria-labelledby="tab-en" lang="en" hidden>`. Só o idioma padrão fica sem `hidden`.
- O idioma vem do hash: sem hash para o padrão, `#en`, `#it`, `#es`. Links internos levam o hash (`BDD.html#en`).
- Ids internos têm sufixo do idioma: `intro-en`, `ref-1-en`, `prompt-en-1`. Os ids nunca se repetem na página.
- O seletor do menu é uma combobox: botão `.lang-current` com bandeira em SVG inline, código e seta, abrindo `.lang-list` (`role="listbox"`) com opções `role="option"` de ids `tab-pt`, `tab-en` e assim por diante. Copie o HTML e os dois scripts do modelo.
- Os scripts do modelo também trocam `document.title`, `lang`, os links do menu, o rodapé e a barra de progresso. Ao criar página, atualize `titles` e `foots`.

## 5. Página de conteúdo

Ordem: `.nav` fixa com `.progress` → `.hero-band` (`.crumb`, `.eyebrow`, `h1`, `.dek`, `.byline` com autor, data em `<time>` e `.credit`) → `.layout` com `.toc` à esquerda e `article` → `footer`.

- Eyebrow é o tipo: Tutorial, Artigo, Guia, Entrevista.
- `article` é uma sequência de `section` com `id`, `h2` e link `.back`.
- Referências: última seção, `ol.refs` com `li#ref-N-idioma`, citadas com `<sup><a href="#ref-N-idioma">[N]</a></sup>`. Toda referência listada precisa ser citada.

Componentes do modelo: `.table-wrap` (toda tabela), `figure` com `figcaption`, `blockquote`, `blockquote.pull`, `.myths`, `.recap`, `.quiz` com `details` e `summary` (revisão com resposta), `pre.code`, `.launch` (botão que abre o app).

Tutorial para iniciante: explique o porquê, use exemplo real, traga erros comuns e termine com revisão rápida e referências. Em manual de app, dê um roteiro passo a passo. Interface só em português pede tabela de tradução dos botões nos outros idiomas.

## 6. Visual

### Paleta alegre: conteúdo, tutoriais e artigos

```css
:root {
  --bg:#FFF7EC; --surface:#FFFFFF; --ink:#2B1B3D; --text:#3E3350; --muted:#756986; --line:#F1E2CF;
  --accent:#0E8074; --accent-soft:#E2F6F2; --accent-strong:#5B2A86; --navy:#5B2A86; --navy-deep:#C2185B;
  --on-navy:#FFFFFF; --on-navy-muted:#FCE4F0; --gold:#FFB703; --gold-ink:#B35300; --gold-soft:#FFF1C9;
  --coral:#FF6B6B; --sky:#3A86FF; --mint:#2A9D8F; --pink:#EF476F;
}
@media (prefers-color-scheme: dark) { :root {
  --bg:#1A1328; --surface:#241A36; --ink:#F7F0FF; --text:#E2D8F0; --muted:#A898C0; --line:#3A2D52;
  --accent:#5FD3C4; --accent-soft:#1D3A38; --accent-strong:#C9A7F5; --navy:#3D1A5C; --navy-deep:#7A1240;
  --gold:#FFC94D; --gold-ink:#FFC94D; --gold-soft:#3A2E12; --coral:#FF8A8A; --sky:#6FA8FF; --mint:#4CC3B3; --pink:#FF6F91;
} }
```

### Paleta institucional: `index`, `about`, `resume`, `contact`, `projects`

```css
:root {
  --bg:#F2F4F7; --surface:#FFFFFF; --ink:#0F1B2D; --text:#2A3647; --muted:#5F6B7A; --line:#DDE2E9;
  --accent:#1D4E89; --accent-soft:#E7EEF7; --accent-strong:#0E2A4A; --navy:#0E2A4A; --navy-deep:#0A1F38;
  --on-navy:#FFFFFF; --on-navy-muted:#AFC2D8; --gold:#A8843A; --gold-soft:#F5EEDD;
}
@media (prefers-color-scheme: dark) { :root {
  --bg:#0B1422; --surface:#111D2F; --ink:#EEF2F7; --text:#CBD4E0; --muted:#8A98AB; --line:#22324A;
  --accent:#8DB4E2; --accent-soft:#172A44; --accent-strong:#C3D8F0; --navy:#0E2340; --navy-deep:#081629;
  --gold:#CFAE63; --gold-soft:#2E2716;
} }
```

### Regras comuns

- Fontes: Hanken Grotesk (`--sans`, interface e títulos menores) e Source Serif 4 (`--serif`, títulos e texto corrido), do Google Fonts, com pilha de reserva `"Segoe UI", "Helvetica Neue", Arial, sans-serif` e `Georgia, "Times New Roman", serif`.
- `--radius: 14px`. Largura `.wrap`: 1120px. Texto corrido até `68ch`.
- Viewport: `width=device-width, initial-scale=1, viewport-fit=cover`.
- Tema escuro por `prefers-color-scheme` nas páginas e por `data-theme` com botão nos apps.
- Pontos de quebra: 960px (`.layout` em uma coluna), 760px, 720px, 480px (seletor de idioma só com a bandeira). Sem estouro horizontal em 390px.
- Em telas de até 720px, figura larga rola de lado: `figure { overflow-x: auto; } figure img { width: 680px; max-width: none; }`.
- Foco visível, `prefers-reduced-motion` respeitado, regras de `@media print` e identidade nunca só por cor (ícone ou texto junto).

## 7. Figuras

- Diagramas são SVG em `rc_images/`, um arquivo por idioma: `Nome.svg`, `Nome-en.svg`, `Nome-it.svg`, `Nome-es.svg`. Capturas de tela são PNG.
- Fundo arredondado `#FFF7EC` (`rx="18"`), tinta `#2B1B3D`, texto secundário `#756986`, fonte `'Trebuchet MS', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`, largura 1000 no `viewBox`.
- Acessibilidade: `role="img"`, `aria-labelledby="t d"`, `<title id="t">`, `<desc id="d">` e o mesmo texto no `alt` da página.
- O SVG é aberto em `<img>`: tudo dentro dele, sem CSS nem fonte externos. Gere as figuras por script, para os idiomas não divergirem.
- Em diagrama de app, reaproveite o código de desenho do próprio app.

## 8. Índice de projetos

Toda página nova ganha um card em `projects.html`, nos quatro painéis, com o hash do idioma no link:

```html
<li class="card" data-cat="model"><a href="Nome.html#en" rel="noopener">
  <div class="meta"><span class="badge">Tutorial</span><span class="badge lang-multi" …>bandeiras</span></div>
  <h3>Título</h3><p>Resumo.</p><span class="host">…giovanipm.github.io</span>
</a></li>
```

- Categorias (`data-cat`): `agile`, `model`, `data`, `jde`, `other`, `games`, `interview`.
- Tipos (`badge`): Tutorial, Artigo, Guia, Template, Entrevista, traduzidos em cada painel.
- **Os totais são HTML estático.** A cada card novo ou tipo alterado, reconte a partir dos cards, em cada idioma: os contadores do cabeçalho (`.stat`) e os dos filtros (`<span class="n">`).
- Os apps entram no índice pelo tutorial. App sem tutorial ainda não tem card.

## 9. Apps

- Um único arquivo HTML: sem CDN, sem rede e sem biblioteca externa.
- Apps de ferramenta declaram CSP: `default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; base-uri 'none'; form-action 'none'`.
- Nada de `eval`. Expressões do usuário passam por interpretador próprio.
- Interface nos quatro idiomas, em uma tabela `I18N = { chave: [pt, en, it, es] }`, com função `t()`. O idioma vem do hash, do `localStorage` ou do navegador. Confira por script que nenhuma chave falta.
- Dados no `localStorage`, com prefixo do app (`bpmnsim.`). Texto do usuário sempre como texto, nunca como HTML.
- Teclado, foco, touch e tema escuro fazem parte do pronto.
- Simulação com semente: mesma semente, mesmo resultado. Tudo que é sorteado usa o gerador semeado.
- Formato de norma: valide contra o esquema oficial e abra o arquivo em outra ferramenta. Declare o que não é coberto, sem alegar certificação.

## 10. Antes de entregar

- [ ] Todos os idiomas completos, com figuras do idioma certo.
- [ ] Imagens carregam e têm `alt`. Sem âncoras quebradas, ids repetidos ou referências sem citação.
- [ ] Nenhum erro no console. Nenhuma requisição externa em app.
- [ ] Sem estouro horizontal em 390px, inclusive com painéis e simulação abertos.
- [ ] Temas claro e escuro conferidos em captura de tela.
- [ ] Roteiros e menus executados com cliques reais.
- [ ] Card e totais de `projects.html` atualizados nos quatro idiomas.
- [ ] Relato final: o que mudou, o que foi testado, o que não foi, e que nada foi para commit se não foi pedido.
