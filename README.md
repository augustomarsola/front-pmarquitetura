# PM Arquitetura - Website Portfólio

> Site portfólio para o estúdio de arquitetura PM Arquitetura, fundado em 2007 por Paulo Mencarini. Especializado em projetos residenciais, comerciais e design de interiores em São Paulo.

[![Next.js](https://img.shields.io/badge/Next.js-15+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)](https://tailwindcss.com/)

---

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm
- WordPress backend configurado

### Instalação

```bash
# Clonar repositório
git clone [repository-url]
cd front-pmarquitetura

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas configurações

# Rodar em desenvolvimento
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Comandos Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Rodar produção (após build)
pnpm start

# Linting
pnpm lint
```

---

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout raiz com SEO
│   ├── page.tsx           # Home page
│   ├── sobre/             # Página sobre
│   ├── contato/           # Página de contato
│   ├── projetos/          # Projetos (lista e [slug])
│   ├── produtos/          # Produtos (lista e [slug])
│   └── publicacoes/       # Publicações
├── components/            # Componentes React
│   ├── Header.tsx         # Navegação principal
│   ├── Footer.tsx         # Rodapé
│   ├── CarouselHome.tsx   # Carousel home
│   └── ui/                # shadcn/ui components
├── lib/                   # Utilities e integrações
│   ├── wpClient.ts        # WordPress REST API
│   ├── wpTypes.ts         # TypeScript interfaces
│   └── schema.ts          # SEO Schema.org
└── hooks/                 # Custom React hooks
```

---

## 🛠️ Stack Tecnológica

### Core

- **Next.js 15** - React framework com App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### UI Components

- **shadcn/ui** - Componentes acessíveis
- **Embla Carousel** - Carousels
- **Lucide React** - Ícones

### Backend / CMS

- **WordPress REST API** - Headless CMS
- Custom Post Types: `projetos`, `produtos`, `publicacoes`
- Custom Taxonomies: `categoria`, `local`, `ano`

### Build & Deploy

- **pnpm** - Package manager
- **ESLint** - Code linting

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# WordPress Backend
WP_BASE_URL=http://pmarquitetura.local

# Site URL (para SEO)
NEXT_PUBLIC_SITE_URL=https://pmarquitetura.com.br
```

### WordPress Setup

O projeto requer um WordPress backend com:

1. **REST API habilitada**
2. **Custom Post Types**:
   - `projetos`
   - `produtos`
   - `publicacoes`
3. **Custom Taxonomies**:
   - `categoria`
   - `local`
   - `ano`

---

## 🎨 Features Principais

### ✅ Implementado

- 🏠 **Home Page** com carousel dinâmico de projetos
- 📄 **Páginas Estáticas**: Sobre, Contato
- 📁 **Portfólio**: Listagem e páginas individuais de projetos
- 🛋️ **Produtos**: Design de móveis e peças autorais
- 📰 **Publicações**: Grid de publicações
- 📱 **Responsivo**: Design mobile-first
- 🔍 **SEO Completo**: Metadados, Open Graph, Schema.org
- 🗺️ **Sitemap Dinâmico**: Gerado automaticamente
- ⚡ **ISR**: Revalidação incremental (10 minutos)
- 🎭 **Filtros**: Projetos por categoria com fade transitions
- 🖼️ **Imagens Otimizadas**: Next.js Image com lazy loading

### 🎯 SEO Otimizações

- ✅ Meta tags completas em todas as páginas
- ✅ Open Graph para redes sociais
- ✅ Twitter Cards
- ✅ Schema.org structured data (Organization, LocalBusiness, CreativeWork)
- ✅ Sitemap XML dinâmico
- ✅ Robots.txt configurado
- ✅ URLs canônicas
- ✅ Alt texts em todas as imagens

Ver [SEO-IMPLEMENTATION.md](./SEO-IMPLEMENTATION.md) para detalhes completos.

---

## 📝 Páginas

### Rotas Estáticas

- `/` - Home (carousel de projetos)
- `/sobre` - Sobre o estúdio
- `/contato` - Informações de contato
- `/projetos` - Lista de projetos
- `/produtos` - Lista de produtos
- `/publicacoes` - Grid de publicações

### Rotas Dinâmicas

- `/projetos/[slug]` - Página individual de projeto
- `/produtos/[slug]` - Página individual de produto

---

## 🔧 Desenvolvimento

### Adicionar Nova Página

1. Criar arquivo em `src/app/nome-pagina/page.tsx`
2. Adicionar metadados para SEO:

```typescript
export const metadata: Metadata = {
  title: "Título da Página",
  description: "Descrição para SEO",
  // ...
};
```

3. Atualizar sitemap em `src/app/sitemap.ts`
4. Adicionar link na navegação se necessário

### Trabalhar com WordPress

Funções disponíveis em `src/lib/wpClient.ts`:

```typescript
// Buscar página
const page = await getPageBySlug("sobre");

// Buscar todos os projetos
const projetos = await getAllPosts("projetos");

// Buscar projeto específico
const projeto = await getPostBySlug("projetos", "nome-do-projeto");
```

Ver interfaces TypeScript em `src/lib/wpTypes.ts`.

---

## 🚢 Deploy

### Build de Produção

```bash
# Gerar build otimizado
pnpm build

# Testar build localmente
pnpm start
```

### Checklist Pré-Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Imagens Open Graph criadas
- [ ] Google Search Console configurado
- [ ] Links de redes sociais atualizados em `schema.ts`
- [ ] Domínios WordPress em `next.config.ts`
- [ ] Build executado com sucesso
- [ ] Testes de metadados (Facebook Debugger, Rich Results)

### Plataformas Recomendadas

- **Vercel** (recomendado) - Deploy automático, edge functions
- **Netlify** - Alternativa com bom suporte Next.js
- **AWS / GCP** - Para mais controle

---

## 📚 Documentação Adicional

- **[CONTEXT.md](./CONTEXT.md)** - Contexto completo do projeto para desenvolvedores e IA
- **[SEO-IMPLEMENTATION.md](./SEO-IMPLEMENTATION.md)** - Guia completo de SEO

### Recursos Externos

- [Next.js Documentation](https://nextjs.org/docs)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

## 🐛 Troubleshooting

### Imagens não carregam

Verifique `next.config.ts` → `remotePatterns`:

```typescript
remotePatterns: [
  { protocol: "http", hostname: "pmarquitetura.local" },
  { protocol: "https", hostname: "cms.pmarquitetura.com.br" },
  // ...
];
```

### Erro ao buscar WordPress

1. Verificar `WP_BASE_URL` no `.env.local`
2. Testar endpoint direto: `[WP_BASE_URL]/wp-json/wp/v2/pages`
3. Verificar CORS no WordPress

### Build falha

1. Limpar cache: `rm -rf .next`
2. Reinstalar dependências: `rm -rf node_modules && pnpm install`
3. Verificar conectividade com WordPress

---

## 👥 Sobre o Estúdio

**PM Arquitetura** foi fundado em 2007 pelo arquiteto Paulo Mencarini. Desde 2019, o arquiteto Lucas Navarro integra a equipe.

Desenvolvemos projetos de arquitetura, design de interiores e peças autorais com atendimento personalizado, explorando as linguagens contemporânea, industrial e minimalista.

---

## 📄 Licença

© 2007-2026 PM Arquitetura. Todos os direitos reservados.

**Desenvolvido com ❤️ para PM Arquitetura**
