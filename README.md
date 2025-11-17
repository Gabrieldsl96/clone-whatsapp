# 💬 Clone do WhatsApp

Um clone funcional do WhatsApp desenvolvido com **Next.js 16**, **React 19** e **Firebase**, demonstrando habilidades em desenvolvimento full-stack com autenticação, banco de dados em tempo real e arquitetura moderna.

🔗 **[Acesse o site aqui](https://clone-whatsapp.gbcmtecnologia.com.br/)**

## ✨ Funcionalidades

- ✅ Autenticação com Firebase
- ✅ Chat em tempo real com Firebase Realtime Database
- ✅ Lista de conversas dinâmica
- ✅ Envio e recebimento de mensagens
- ✅ Interface responsiva e moderna
- ✅ Emoji picker integrado
- ✅ Validação de formulários com React Hook Form
- ✅ UI componentes customizados com Material-UI e Tailwind CSS

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 16** - Framework React com SSR e otimizações
- **React 19** - Biblioteca UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização utilitária
- **Material-UI (MUI)** - Componentes de UI
- **Lucide React** - Ícones SVG

### Backend & Serviços
- **Firebase** - Autenticação, Realtime Database e Storage
- **Axios** - Cliente HTTP

### Validação & Formulários
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **@hookform/resolvers** - Integração com Zod

### Ferramentas & DevOps
- **pnpm** - Gerenciador de pacotes
- **ESLint** - Linting de código
- **TailwindCSS v4** - Engine de CSS moderno

## 📋 Pré-requisitos

- Node.js 18+ ou superior
- pnpm, npm ou yarn
- Conta Firebase configurada

## 🚀 Como Executar

### 1. Clonar o repositório

\`\`\`bash
git clone https://github.com/Gabrieldsl96/clone-whatsapp.git
cd clone-whatsapp
\`\`\`

### 2. Instalar dependências

\`\`\`bash
pnpm install
# ou
npm install
\`\`\`

### 3. Configurar Firebase

Crie um arquivo `.env.local` na raiz do projeto com suas credenciais do Firebase:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=seu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
\`\`\`

### 4. Executar o servidor de desenvolvimento

\`\`\`bash
pnpm dev
# ou
npm run dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

\`\`\`
src/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   ├── globals.css         # Estilos globais
│   ├── Api.tsx             # Chamadas de API
│   └── firebaseConfig.tsx  # Configuração do Firebase
├── components/
│   ├── ChatWindow.tsx      # Janela de chat
│   ├── ChatListItem.tsx    # Item da lista de chats
│   ├── ChatIntro.tsx       # Tela inicial
│   ├── MessageItem.tsx     # Componente de mensagem
│   ├── NewChat.tsx         # Novo chat
│   ├── login.tsx           # Componente de login
│   └── ui/                 # Componentes UI reutilizáveis
├── lib/
│   └── utils.ts            # Funções utilitárias
└── types/
    └── global.d.ts         # Definições de tipos globais
\`\`\`

## 🔐 Autenticação

O projeto utiliza Firebase Authentication para gerenciar usuários e sessões. A autenticação é implementada no componente `login.tsx` e configurada no `firebaseConfig.tsx`.

## 📝 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Build para produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm lint` - Executa o ESLint

## 🎨 Personalização

O projeto utiliza Tailwind CSS com configuração customizada. Você pode ajustar os estilos em `tailwind.config.ts` e `globals.css`.

## 📚 Aprendizados Principais

- Implementação de chat em tempo real com Firebase
- Autenticação e autorização com Firebase
- Componentização em React e Next.js
- Validação de formulários com React Hook Form e Zod
- Estilização com Tailwind CSS e Material-UI
- Gerenciamento de estado com React Hooks

## 🚀 Próximas Melhorias

- [ ] Upload de imagens e arquivos
- [ ] Chamadas de voz e vídeo
- [ ] Grupo de chats
- [ ] Status online/offline
- [ ] Confirmação de entrega de mensagens
- [ ] Busca de mensagens
- [ ] Tema escuro/claro

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 👨‍💻 Autor

**Gabriel Lemos**
- GitHub: [@Gabrieldsl96](https://github.com/Gabrieldsl96)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir issues e pull requests.

---

<div align="center">
  Desenvolvido com ❤️ por Gabriel Lemos
</div>
