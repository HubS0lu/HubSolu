# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [Unreleased]

### Modificado

- **Arquitetura do Projeto**: Substituição do TailwindCSS via CDN e scripts inline por uma stack moderna com **Node.js, Vite e Tailwind local**. Isso otimiza o CSS, melhora a performance e padroniza o fluxo de desenvolvimento com comandos `npm run dev` e `npm run build`.
- **Formatação de Código**: Adição de `.prettierrc` para manter as páginas padronizadas.

### Adicionado

- **Repositório do GitHub**: Alterada a origem (remote origin) do projeto para a nova conta e repositório (`HubS0lu/HubSolu`).
- **Banco de Dados Supabase**: Disponibilizado script SQL para criação e configuração rápida das tabelas `stores`, `products` e `orders` no novo banco de dados.
- **Sub-telas Interativas no Perfil do Delivery**: A tela de perfil na demonstração `demo_delivery_ui.html` agora possui sub-telas navegáveis para "Meus Endereços", "Formas de Pagamento" e "Meus Pedidos". Os usuários podem visualizar formulários e histórico simulados que se adaptam dinamicamente ao tema selecionado (Fast Food, Vegano, BBQ).
- **Tela de Perfil no App Delivery**: A tela `demo_delivery_ui.html` foi convertida em um mini-app interativo (Single Page App), onde agora é possível alternar entre o cardápio e a tela de Perfil do cliente através do menu inferior, mantendo a adaptação dinâmica dos temas de cores.
- **Nova Tela de Perfil do Usuário (`perfil_usuario.html`)**: Desenvolvida a tela de perfil e gerenciamento do lojista, dividida em Dados Pessoais, Dados do Negócio e Configurações (com integração ao layout Dark Mode).
- **Nova Tela Interativa de Demonstração de UI (`demo_delivery_ui.html`)**: Desenvolvida para demonstrar a aplicação prática da psicologia das cores no design de interfaces de delivery. Inclui três temas dinâmicos via Tailwind e JS puro: Fast Food, Vegano e BBQ Dark Mode.
- **Máscara de Telefone**: Adicionado script em `cadastro.html` para formatação automática de telefones fixos (10 dígitos) e celulares (11 dígitos) no padrão brasileiro (ex: `(11) 99999-9999`).
- **Validação HTML5**: Inclusão de atributos `required` e `pattern` nos campos de nome, e-mail e telefone do formulário em `cadastro.html`.

### Corrigido

- **Fluxo do Formulário de Cadastro**: Corrigido bug de múltiplos atributos `onsubmit` no formulário em `cadastro.html`, garantindo que a validação nativa do HTML5 seja acionada antes do redirecionamento para `selecao_negocio.html`.
- **Tela de Seleção de Negócio (`selecao_negocio.html`)**:
  - Adicionada interatividade aos botões de opções do tipo de negócio (feedback visual ao selecionar).
  - O botão de "Continuar" agora inicia desabilitado e só é ativado após o usuário selecionar pelo menos uma opção.
