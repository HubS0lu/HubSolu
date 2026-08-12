# Guia de Soluções: Problemas de Deploy na Vercel

É muito comum que projetos funcionem perfeitamente no `localhost` e apresentem erros quando publicados na Vercel. Aqui estão os principais motivos e como resolvê-los:

## 1. Variáveis de Ambiente (Erro no Banco de Dados/Login)
No seu computador, as credenciais do Supabase e outras chaves estão no arquivo `.env` (que é ignorado pelo Git por segurança). Como a Vercel não tem acesso a esse arquivo, as funcionalidades que dependem de banco de dados ou autenticação vão falhar.

**Como resolver:**
1. Acesse o painel da sua conta na Vercel.
2. Vá no seu projeto > **Settings** > **Environment Variables**.
3. Adicione manualmente as variáveis (como `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`) e seus respectivos valores.
4. Vá em **Deployments** e faça um novo Deploy (Redeploy).

## 2. Erro 404 ao atualizar a página (React Router)
Ao usar `react-router-dom` em uma Single Page Application (SPA), acessar uma rota diretamente ou dar F5 (ex: `seudominio.vercel.app/perfil`) faz a Vercel tentar encontrar uma pasta chamada `perfil`, retornando erro 404.

**Como resolver:**
Um arquivo `vercel.json` foi criado na raiz do seu projeto com o seguinte conteúdo:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
Você só precisa garantir que fez o commit e enviou (push) esse arquivo para o GitHub. A Vercel aplicará as regras automaticamente no próximo deploy.

## 3. Dados "Mockados" e LocalStorage
Se você tem funcionalidades de teste que dependem de dados salvos no `localStorage` do seu navegador, esses dados existem apenas no endereço `localhost:5173`.

**Como resolver:**
Lembre-se de que ao acessar a URL da Vercel, o seu navegador tratará como um site novo e o `localStorage` estará vazio. Se necessário, recrie os dados de teste (como criar uma loja ou usuário novamente) diretamente pelo link da Vercel.

## 4. Letras Maiúsculas e Minúsculas em Imports
O Windows não diferencia maiúsculas de minúsculas no nome dos arquivos, mas a Vercel (Linux) sim.

**Como resolver:**
Se você fizer `import Perfil from './perfilPage'` mas o arquivo for `PerfilPage.jsx`, isso fará o deploy falhar. Revise os imports caso o log da Vercel aponte erro ao encontrar um arquivo específico.
