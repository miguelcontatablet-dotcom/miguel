# Nevermind — A Origem do Álbum (site interativo)

Site interativo, em HTML/CSS/JS puro, que conta a história e a origem do álbum
**Nevermind** (Nirvana, 1991), organizado por tópicos. Projeto **educacional**.

## Recursos

- **Scrollytelling**: cada tópico aparece com animação ao rolar a página.
- **Player de áudio**: trechos ilustrativos por faixa (um player compartilhado).
- **Galeria com lightbox**: imagens em destaque ao clicar.
- **Quiz final**: 7 perguntas com pontuação e resultado.
- Navegação fixa, barra de progresso de leitura, responsivo e acessível
  (respeita `prefers-reduced-motion`).

## Como rodar

O quiz usa `fetch` para carregar `data/quiz.json`, o que **exige um servidor HTTP**
(abrir o arquivo direto com `file://` bloqueia o fetch). Use qualquer um:

```bash
# Python 3
python -m http.server 8000
# depois abra http://localhost:8000
```

Ou a extensão **Live Server** do VS Code (botão "Go Live").

O restante do site (texto, scroll, galeria) funciona mesmo abrindo o `index.html`
diretamente — apenas o quiz precisa do servidor.

## Estrutura

```
index.html            # página única com as 9 seções + quiz
css/
  styles.css          # tema grunge, layout, responsividade
  animations.css      # animações de scroll
js/
  scroll.js           # scrollytelling, nav ativa, progresso, menu mobile
  audio.js            # player de trechos
  gallery.js          # lightbox da galeria
  quiz.js             # lógica do quiz
data/quiz.json        # perguntas/respostas (edite aqui para mudar o quiz)
assets/
  img/                # placeholders SVG (substitua por imagens licenciadas)
  audio/              # coloque aqui os trechos .mp3 (ver nota abaixo)
```

## Adicionando mídia real

- **Imagens**: substitua os `.svg` em `assets/img/` por imagens licenciadas
  (atualize as extensões em `index.html` se usar `.jpg`/`.png`).
- **Áudio**: coloque arquivos `.mp3` em `assets/audio/` com os nomes referenciados
  no atributo `data-audio` de cada `.track` no `index.html`
  (ex.: `teen-spirit.mp3`, `lithium.mp3`...). Se um arquivo estiver ausente,
  o player exibe "áudio indisponível" sem quebrar a página.

## ⚠️ Direitos autorais

Músicas, fotos e a arte da capa do *Nevermind* são protegidos por direitos
autorais de seus respectivos detentores. Para uso público/publicação:

- Prefira **embeds oficiais** (YouTube/Spotify) a hospedar `.mp3`.
- Use apenas imagens devidamente licenciadas e **credite os autores**
  (ex.: o fotógrafo da capa, Kirk Weddle).

Este repositório traz apenas placeholders e textos próprios baseados em fatos
amplamente documentados.
