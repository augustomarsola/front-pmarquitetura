# CONTEXT.md - PM Arquitetura Frontend

> **Propósito**: Documento de contexto completo do projeto para auxiliar agentes de IA e desenvolvedores a compreender a arquitetura, decisões técnicas, histórico de desenvolvimento e estado atual do projeto.

---

## 📋 Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Stack Tecnológica](#stack-tecnológica)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Integração com WordPress](#integração-com-wordpress)
5. [Estrutura de Componentes](#estrutura-de-componentes)
6. [Histórico de Desenvolvimento](#histórico-de-desenvolvimento)
7. [Problemas Resolvidos](#problemas-resolvidos)
8. [Otimizações Implementadas](#otimizações-implementadas)
9. [Estado Atual e Próximos Passos](#estado-atual-e-próximos-passos)
10. [Guia para Novos Desenvolvedores](#guia-para-novos-desenvolvedores)

---

## Visão Geral do Projeto

### Objetivo

Site portfólio para o estúdio de arquitetura **PM Arquitetura**, fundado em 2007 por Paulo Mencarini, com foco em projetos residenciais, comerciais e design de interiores em São Paulo.

### Características Principais

- **Portfólio dinâmico**: Projetos, produtos e publicações gerenciados via WordPress
- **Design minimalista**: Reflete a identidade do estúdio (contemporâneo, industrial, minimalista)
- **Performance otimizada**: Next.js 15 com ISR (Incremental Static Regeneration)
- **SEO completo**: Metadados, Open Graph, Schema.org structured data
- **Responsivo**: Design mobile-first com breakpoints otimizados

### Público-alvo

- Clientes em potencial buscando serviços de arquitetura
- Profissionais da área interessados no portfólio
- Mecanismos de busca (Google, Bing) para ranqueamento orgânico

---

## Stack Tecnológica

### Core

- **Next.js 15+**: App Router, Server Components, ISR
- **React 19**: Server/Client Components pattern
- **TypeScript**: Strict mode habilitado
- **Node.js**: Runtime para build e servidor

### Styling

- **Tailwind CSS**: Utility-first com configuração customizada
- **PostCSS**: Processamento de CSS
- **Tailwind Typography**: Plugin para prosa (`prose`)
- **Custom Fonts**: Acumin Pro (Regular, Italic, Bold, Bold Italic)

### UI Components

- **shadcn/ui**: Componentes acessíveis e customizáveis
  - Breadcrumb
  - Button
  - Carousel (Embla)
  - Sheet (mobile menu)
  - Tabs
- **Lucide React**: Ícones
- **Custom SVG Components**: Facebook e Instagram icons

### Carousels

- **Embla Carousel**: Base carousel library
- **Embla Carousel Autoplay**: Plugin para autoplay
- **Embla Carousel Fade**: Plugin para transições fade

### Backend / CMS

- **WordPress REST API**: Headless CMS
- **Custom Post Types**: `projetos`, `produtos`, `publicacoes`
- **Custom Taxonomies**: `categoria`, `local`, `ano`

### Build & Deploy

- **pnpm**: Package manager
- **ESLint**: Linting com Next.js config
- **Git**: Version control

---

## Arquitetura do Sistema

### Padrão de Arquitetura: JAMstack

- **J**avaScript (React/Next.js)
- **A**PIs (WordPress REST API)
- **M**arkup (Static HTML gerado)

### Fluxo de Dados

```
WordPress CMS → REST API → Next.js Server Components → HTML Estático → Client Hydration
```

### Estratégia de Renderização

#### ISR (Incremental Static Regeneration)

- **Revalidação**: 600 segundos (10 minutos)
- **Benefícios**: Performance + conteúdo atualizado
- **Configuração**: `export const revalidate = 600` em layouts e páginas

#### Server Components (Padrão)

- Componentes de página principais
- Busca de dados do WordPress
- Geração de metadados

#### Client Components (Quando necessário)

- Interatividade (useState, useEffect)
- Event listeners
- Navegação com transições
- Exemplos:
  - Header (mobile menu, active states)
  - ProjetosClient (tabs com fade transitions)
  - Carousels

### Estrutura de Diretórios

```
src/
├── app/                          # App Router (Next.js 15)
│   ├── layout.tsx               # Root layout com metadados globais
│   ├── page.tsx                 # Home page
│   ├── not-found.tsx            # 404 custom page
│   ├── sitemap.ts               # Sitemap dinâmico
│   ├── globals.css              # Estilos globais
│   ├── sobre/
│   │   └── page.tsx            # Página sobre
│   ├── contato/
│   │   └── page.tsx            # Página de contato
│   ├── projetos/
│   │   ├── page.tsx            # Listagem de projetos
│   │   ├── ProjetosClient.tsx  # Client component com tabs
│   │   └── [slug]/
│   │       └── page.tsx        # Projeto individual
│   ├── produtos/
│   │   ├── page.tsx            # Listagem de produtos
│   │   ├── ProdutosClient.tsx  # Client component
│   │   └── [slug]/
│   │       └── page.tsx        # Produto individual
│   ├── publicacoes/
│   │   └── page.tsx            # Grid de publicações
│   └── api/
│       └── update/
│           └── route.ts        # API route (não utilizada atualmente)
├── components/
│   ├── Header.tsx               # Nav desktop + mobile menu
│   ├── Footer.tsx               # Footer com conteúdo do WordPress
│   ├── CarouselHome.tsx         # Carousel página home
│   ├── CarouselProjeto.tsx      # Carousel páginas de projeto
│   ├── FacebookIcon.tsx         # Ícone SVG Facebook
│   ├── InstagramIcon.tsx        # Ícone SVG Instagram
│   └── ui/                      # shadcn/ui components
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── carousel.tsx
│       ├── sheet.tsx
│       └── tabs.tsx
├── lib/
│   ├── wpClient.ts              # WordPress API integration
│   ├── wpTypes.ts               # TypeScript interfaces
│   ├── schema.ts                # Schema.org structured data
│   ├── utils.ts                 # Utility functions (cn)
│   └── constants.ts             # Constantes (cache tags)
└── hooks/
    └── useWindowSize.ts         # Custom hook para resize

public/
├── font/                        # Acumin Pro font files
│   ├── Acumin-RPro.woff
│   ├── Acumin-ItPro.woff
│   ├── Acumin-BdPro.woff
│   └── Acumin-BdItPro.woff
├── robots.txt                   # SEO: robots configuration
└── (og-image.jpg)              # TODO: Open Graph image

config files:
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind configuration
├── postcss.config.mjs           # PostCSS configuration
├── eslint.config.mjs            # ESLint configuration
├── components.json              # shadcn/ui configuration
├── .env.example                 # Environment variables template
├── .env.local                   # Environment variables (gitignored)
└── package.json                 # Dependencies
```

---

## Integração com WordPress

### Configuração

#### Variáveis de Ambiente

```env
WP_BASE_URL=http://pmarquitetura.local          # Desenvolvimento
WP_BASE_URL=https://cms.pmarquitetura.com.br    # Produção
NEXT_PUBLIC_SITE_URL=https://pmarquitetura.com.br
```

#### Domínios Permitidos (next.config.ts)

```typescript
remotePatterns: [
  { protocol: "http", hostname: "pmarquitetura.local" },
  { protocol: "http", hostname: "pmarquitetura.com.br" },
  { protocol: "https", hostname: "pmarquitetura.com.br" },
  { protocol: "http", hostname: "cms.pmarquitetura.com.br" },
  { protocol: "https", hostname: "cms.pmarquitetura.com.br" },
];
```

### Endpoints WordPress

#### Pages

```
GET /wp-json/wp/v2/pages?slug={slug}&_embed
```

Usado para: home, sobre, contato

#### Custom Post Types

```
GET /wp-json/wp/v2/projetos?_embed&orderby=date&order=desc
GET /wp-json/wp/v2/produtos?_embed&orderby=date&order=desc
GET /wp-json/wp/v2/publicacoes?_embed&orderby=date&order=desc
```

#### Single Posts

```
GET /wp-json/wp/v2/projetos?slug={slug}&_embed
```

### Funções do WordPress Client (wpClient.ts)

#### 1. `getPageBySlug(slug: string)`

Busca uma página do WordPress por slug com featured media.

**Retorno**: `WPPageProps`

**Uso**:

```typescript
const page = await getPageBySlug("sobre");
```

#### 2. `getHomeCarouselData()`

Extrai imagens e links da página home para o carousel.

**Retorno**: `CarouselItem[]` (imagem + link para projeto)

**Lógica**:

- Extrai todas as tags `<img>` do HTML
- Extrai links de `<a><span>` com regex
- Combina imagens e links por índice

#### 3. `getPageContent(slug: string)`

Busca conteúdo de uma página (primeira imagem + HTML).

**Retorno**: `PageContent`

- `image`: Primeira imagem encontrada
- `htmlContent`: HTML sem a primeira figura

**Uso**: Página "Sobre"

#### 4. `getPageWithFeaturedImage(slug: string)`

Busca página com featured image do `_embedded`.

**Retorno**: `PageWithFeaturedImage`

- `featuredImage`: Imagem destacada
- `htmlContent`: Conteúdo completo

**Uso**: Página "Contato"

#### 5. `getAllPosts(postType: PostType)`

Busca todos os posts de um tipo (projetos/produtos/publicacoes).

**Parâmetros de ordenação**: `orderby=date&order=desc`

**Retorno**: `PostListItem[]`

- id, title, slug
- featuredImage
- taxonomies (categoria, local, ano)

#### 6. `getPostBySlug(postType: PostType, slug: string)`

Busca post individual com todas as imagens e conteúdo.

**Retorno**: `PostDetail`

- Metadados básicos
- `images[]`: Array de todas as imagens no conteúdo
- `htmlContent`: Conteúdo completo
- `taxonomies`: Categorias, locais e anos

**Processamento**:

1. Busca post com `_embed`
2. Extrai imagens do HTML com regex
3. Extrai taxonomias dos termos embedded
4. Retorna dados estruturados

#### Funções Auxiliares

**`extractImagesFromHTML(html: string)`**

- Regex para tags `<img>`
- Extração individual de src, alt, width, height
- Suporta ordem variável de atributos

**`extractLinksFromHTML(html: string)`**

- Extração de links do menu com regex
- Parse de URL para obter slug

**`extractTaxonomies(post: WPPost)`**

- Organiza termos em categorias (ano/categoria/local)
- Retorna objeto estruturado

### Cache Strategy

- **Tags**: `allTagsSlug` (definido em constants.ts)
- **Revalidação**: 600 segundos (ISR)
- **Invalidação**: Via `revalidateTag()` ou rebuild

---

## Estrutura de Componentes

### Header Component

**Arquivo**: `src/components/Header.tsx`

**Tipo**: Client Component (`"use client"`)

**Funcionalidades**:

- ✅ Navegação desktop com active states
- ✅ Mobile menu (Sheet component)
- ✅ Detecção de rota ativa com `usePathname()`
- ✅ Fecha mobile menu no resize
- ✅ Links de redes sociais (Facebook, Instagram)
- ✅ Logo clicável para home

**Props**:

```typescript
interface HeaderProps {
  logoPath: string; // Caminho do logo WordPress
}
```

**Estados**:

- `isOpen`: Controla abertura do mobile menu
- Cleanup de event listener no unmount

**Breakpoints**:

- Mobile: menu hambúrguer
- Desktop (lg+): menu horizontal

### Footer Component

**Arquivo**: `src/components/Footer.tsx`

**Tipo**: Server Component (recebe HTML do WordPress)

**Props**:

```typescript
interface FooterProps {
  content: string; // HTML do WordPress
  className?: string; // Classes adicionais
}
```

**Renderização**: `dangerouslySetInnerHTML`

### CarouselHome Component

**Arquivo**: `src/components/CarouselHome.tsx`

**Tipo**: Client Component

**Features**:

- ✅ Embla Carousel com Fade plugin
- ✅ Navegação anterior/próximo (full height)
- ✅ Links para projetos com ícone Plus
- ✅ Barra inferior com texto do link + quadrados decorativos

**Props**:

```typescript
interface CarouselHomeProps {
  items: CarouselItem[]; // Imagem + link
}
```

**Estilização customizada**:

- Botões de navegação sem left/right
- Ícone Plus no link (Lucide)
- Barra cinza com flex layout

### CarouselProjeto Component

**Arquivo**: `src/components/CarouselProjeto.tsx`

**Tipo**: Client Component

**Features**:

- ✅ Fade + Autoplay plugins
- ✅ Dot indicators clicáveis
- ✅ Indicador ativo alongado (w-6 vs w-2)
- ✅ Estado atual via CarouselApi

**Props**:

```typescript
interface CarouselProjetoProps {
  images: CarouselImage[];
}
```

**Estado**:

```typescript
const [api, setApi] = useState<CarouselApi>();
const [current, setCurrent] = useState(0);
```

**Event Handling**:

- `api.on("select")` para atualizar current
- `api.scrollTo(index)` no click dos dots

### ProjetosClient Component

**Arquivo**: `src/app/projetos/ProjetosClient.tsx`

**Tipo**: Client Component

**Features**:

- ✅ Tabs para filtro por categoria
- ✅ Fade transitions (300ms opacity)
- ✅ Grid responsivo (1/2/3 colunas)
- ✅ Cards com hover effects

**Props**:

```typescript
interface ProjetosClientProps {
  projetos: PostListItem[];
  categorias: { id: number; name: string }[];
}
```

**Estado**:

```typescript
const [selectedTab, setSelectedTab] = useState<string>("all");
const [isTransitioning, setIsTransitioning] = useState(false);
```

**Fade Orchestration**:

1. `setIsTransitioning(true)` → opacity-0
2. Wait 300ms
3. `setSelectedTab()` → troca conteúdo
4. `setIsTransitioning(false)` → opacity-100

**Filtragem**:

```typescript
const filteredProjetos =
  selectedTab === "all"
    ? projetos
    : projetos.filter((p) =>
        p.taxonomies.categoria.some((cat) => cat.id === parseInt(selectedTab)),
      );
```

### Dynamic Pages (Projetos e Produtos)

**Arquivos**:

- `src/app/projetos/[slug]/page.tsx`
- `src/app/produtos/[slug]/page.tsx`

**Features**:

- ✅ Metadados dinâmicos (`generateMetadata`)
- ✅ Breadcrumb com taxonomias
- ✅ Carousel de imagens
- ✅ Primeiros 3 parágrafos UPPERCASE
- ✅ Conteúdo restante normal
- ✅ 404 handling com `notFound()`
- ✅ Schema.org JSON-LD

**Processamento de Conteúdo**:

```typescript
// Extração de parágrafos
const paragraphRegex = /<p[^>]*>(.*?)<\/p>/g;
const paragraphs = [];
while ((match = paragraphRegex.exec(html))) {
  paragraphs.push(match[1]);
}

// Primeiros 3 em uppercase
const firstThree = paragraphs.slice(0, 3);

// Remover primeiros 3 + figuras + divs
const remaining = html
  .replace(/<p>...</p>/g, ...) // Remove first 3
  .replace(/<figure[^>]*>[\s\S]*?<\/figure>/g, "") // Remove images
  .replace(/<div[^>]*class="wp-block-group"[^>]*>/g, ""); // Remove WP divs
```

---

## Histórico de Desenvolvimento

### Fase 1: Setup Inicial (Janeiro 2026)

**Problema**: WordPress retornando imagens com IP privado, bloqueadas pelo Next.js

**Solução**:

```typescript
// next.config.ts
images: {
  remotePatterns: [{ protocol: "http", hostname: "pmarquitetura.local" }];
}
```

### Fase 2: Header e Navegação

**Implementado**:

- Header com navegação desktop/mobile
- Active states com `usePathname()`
- Mobile menu com Sheet (shadcn/ui)
- Problema: Ícones do Lucide com warning de deprecated
- Solução: Custom SVG components

**Hook customizado**:

```typescript
// useWindowSize.ts
export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
```

### Fase 3: WordPress Integration

**Desenvolvido**:

- `wpTypes.ts`: Interfaces TypeScript completas
- `wpClient.ts`: 8 funções principais
- Problema: Regex não capturava imagens com atributos em ordem variável
- Solução: Extração individual de cada atributo

**Evolução do Regex**:

```typescript
// ❌ Falhava com ordem diferente
/<img[^>]+src="([^"]+)"[^>]+alt="([^"]+)"/;

// ✅ Extração individual
const srcMatch = imgTag.match(/src="([^"]*)"/);
const altMatch = imgTag.match(/alt="([^"]*)"/);
```

### Fase 4: Páginas de Conteúdo

**Criado**:

- Home com carousel dinâmico
- Sobre (imagem + texto)
- Contato (featured image + conteúdo)
- Listagem de projetos, produtos, publicacoes

### Fase 5: Filtros e Transições

**Problema**: Tabs sem feedback visual de mudança

**Solução**: Fade transitions com estado

```typescript
const handleTabChange = (value: string) => {
  setIsTransitioning(true);
  setTimeout(() => {
    setSelectedTab(value);
    setIsTransitioning(false);
  }, 300);
};
```

### Fase 6: Páginas de Projeto Individual

**Features**:

- Carousel com dots
- Breadcrumb dinâmico
- Primeiros 3 parágrafos uppercase
- URL slug dinâmica
- 404 page

**Problema**: Console.log deixado no código
**Solução**: Removido durante refactoring

### Fase 7: Ordenação de Posts (Janeiro 2026)

**Requisito**: Mostrar posts do mais novo para o mais antigo

**Implementação**:

```typescript
// Antes
`/wp-json/wp/v2/${postType}?_embed`
// Depois
`/wp-json/wp/v2/${postType}?_embed&orderby=date&order=desc`;
```

### Fase 8: Configuração de Produção (Fevereiro 2026)

**Problema**: Imagens quebrando em produção (`pnpm start`)

- URL: `pmarquitetura.com.br/cms/...`
- Erro 400: URL not allowed

**Solução**: Adicionar domínios de produção

```typescript
remotePatterns: [
  { protocol: "http", hostname: "pmarquitetura.com.br" },
  { protocol: "https", hostname: "pmarquitetura.com.br" },
];
```

**Problema 2**: Logo quebrado em produção

- Caminho diferente: `/pm-arquitetura_logo-site_final/`
- pathname muito restrito: `/cms/wp-content/uploads/**`

**Solução**: pathname universal

```typescript
pathname: "/**";
```

**Problema 3**: Domínio CMS separado

- URL: `cms.pmarquitetura.com.br`

**Solução**: Adicionar domínio CMS

```typescript
{ protocol: "https", hostname: "cms.pmarquitetura.com.br" }
```

### Fase 9: Otimização SEO (Fevereiro 2026)

**Implementado completo**:

- Metadados em todas as páginas
- Open Graph tags
- Twitter Cards
- Schema.org (Organization, LocalBusiness, Website, CreativeWork)
- Sitemap dinâmico
- Robots.txt
- Metadados dinâmicos para projetos/produtos

**Documentação**: `SEO-IMPLEMENTATION.md`

**TypeScript Issues Resolvidos**:

- Variáveis `error` não utilizadas em catch
- Parâmetro `offset` não usado em replace
- Regex flag `s` incompatível (trocado por `[\s\S]`)

---

## Problemas Resolvidos

### 1. Imagens WordPress Bloqueadas

**Erro**: `Failed to fetch image from WordPress`

**Causa**: Next.js bloqueia domínios não configurados

**Solução**: `remotePatterns` no next.config.ts

### 2. Ícones Lucide Deprecated

**Warning**: `size` prop deprecated

**Solução**:

```tsx
// Antes
<Facebook size={20} />

// Depois
<Facebook className="w-5 h-5" />
```

### 3. useState em useEffect Causando Warning

**Warning**: `Cannot update a component while rendering`

**Causa**: setState direto em event listener

**Solução**:

```typescript
// Antes
useEffect(() => {
  const handleResize = () => setIsOpen(false);
  // ...
}, []);

// Depois
useEffect(() => {
  function handleResize() {
    setIsOpen(false);
  }
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
```

### 4. Regex de Imagens Falhando

**Problema**: Atributos em ordem diferente não matchavam

**Solução**: Match individual de cada atributo

### 5. Tabs sem Feedback Visual

**Problema**: Mudança instantânea confusa

**Solução**: Fade transitions com setTimeout

### 6. Conteúdo com Imagens Duplicadas

**Problema**: HTML incluía todas as imagens já no carousel

**Solução**: Regex para remover `<figure>` tags

```typescript
.replace(/<figure[^>]*>[\s\S]*?<\/figure>/g, "")
```

### 7. Erro TypeScript com Regex Flag

**Erro**: `'s' flag only available in ES2018+`

**Solução**: Uso de `[\s\S]` para match multiline

### 8. Página Produtos sem SEO

**Problema**: Esquecido durante implementação inicial

**Solução**: Aplicado mesmo pattern de projetos

---

## Otimizações Implementadas

### Performance

#### ISR (Incremental Static Regeneration)

```typescript
export const revalidate = 600; // 10 minutos
```

- Build time otimizado
- Conteúdo atualizado automaticamente
- Cache inteligente

#### Image Optimization

```typescript
<Image
  src={...}
  width={...}
  height={...}
  priority  // Above fold
  loading="lazy"  // Below fold
/>
```

- WebP automático
- Responsive srcset
- Lazy loading

#### Server Components por Padrão

- Menos JavaScript no cliente
- Fetch no servidor
- Streaming

### SEO

#### Metadados Completos

- Title templates
- Descriptions únicas
- Keywords relevantes
- Open Graph
- Twitter Cards

#### Structured Data (Schema.org)

```json
{
  "@type": "ArchitecturalDesignAgency",
  "@type": "LocalBusiness",
  "@type": "WebSite",
  "@type": "CreativeWork"
}
```

#### Sitemap Dinâmico

- Todas as páginas estáticas
- Todos os projetos
- Todos os produtos
- Prioridades configuradas

#### URLs Canônicas

```tsx
<link rel="canonical" href={...} />
```

### UX

#### Loading States

- Skeleton screens (potencial)
- Fade transitions
- Smooth navigation

#### Accessibility

- Semantic HTML
- Alt texts
- ARIA labels (shadcn/ui)
- Keyboard navigation

#### Mobile-First

- Breakpoints otimizados
- Touch-friendly
- Responsive images

---

## Estado Atual e Próximos Passos

### ✅ Completo

#### Core Features

- [x] Integração WordPress headless
- [x] Home page com carousel
- [x] Páginas estáticas (sobre, contato)
- [x] Listagem de projetos com filtros
- [x] Páginas individuais de projetos
- [x] Listagem de produtos
- [x] Páginas individuais de produtos
- [x] Grid de publicações
- [x] Header com mobile menu
- [x] Footer dinâmico
- [x] 404 page customizada

#### Otimizações

- [x] ISR configurado
- [x] Imagens otimizadas
- [x] SEO completo
- [x] Metadados dinâmicos
- [x] Schema.org structured data
- [x] Sitemap dinâmico
- [x] Robots.txt
- [x] Open Graph tags

#### Code Quality

- [x] TypeScript strict
- [x] ESLint configurado
- [x] Component structure clean
- [x] Sem erros de compilação
- [x] Builds com sucesso

### 🚧 Pendente / Melhorias Futuras

#### Essencial

- [ ] Criar imagem Open Graph (`public/og-image.jpg` 1200x630px)
- [ ] Adicionar `NEXT_PUBLIC_SITE_URL` no `.env.local`
- [ ] Configurar Google Search Console
- [ ] Adicionar Google Analytics 4
- [ ] Testar metadados com Facebook Debugger
- [ ] Validar Schema.org com Rich Results Test

#### Conteúdo

- [ ] Páginas individuais de publicações (se necessário)
- [ ] Breadcrumbs mais descritivos
- [ ] Mais conteúdo textual nas páginas
- [ ] Blog/artigos sobre arquitetura

#### Performance

- [ ] Implementar loading states
- [ ] Error boundaries
- [ ] Retry logic para API
- [ ] Otimizar Core Web Vitals
- [ ] Service Worker (PWA)

#### SEO Avançado

- [ ] Links internos estratégicos
- [ ] Link building
- [ ] Google My Business
- [ ] Schema FAQ/Article
- [ ] Hreflang (se multi-idioma)

#### Features

- [ ] Busca de projetos
- [ ] Filtros combinados (categoria + ano + local)
- [ ] Lightbox para imagens
- [ ] Compartilhar projeto em redes sociais
- [ ] Formulário de contato funcional
- [ ] Newsletter signup

#### DevOps

- [ ] CI/CD pipeline
- [ ] Testes automatizados
- [ ] Monitoring (Sentry/LogRocket)
- [ ] Performance monitoring
- [ ] Backup strategy

---

## Guia para Novos Desenvolvedores

### Setup Inicial

1. **Clone o repositório**

   ```bash
   git clone [repository-url]
   cd front-pmarquitetura
   ```

2. **Instalar dependências**

   ```bash
   pnpm install
   ```

3. **Configurar variáveis de ambiente**

   ```bash
   cp .env.example .env.local
   ```

   Editar `.env.local`:

   ```env
   WP_BASE_URL=http://pmarquitetura.local
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Rodar desenvolvimento**

   ```bash
   pnpm dev
   ```

   Acessar: http://localhost:3000

### Comandos Úteis

```bash
# Desenvolvimento
pnpm dev

# Build produção
pnpm build

# Rodar produção local
pnpm start

# Linting
pnpm lint

# Type checking
pnpm type-check  # (adicionar script se necessário)
```

### Workflow de Desenvolvimento

#### Adicionar Nova Página

1. Criar arquivo em `src/app/nova-pagina/page.tsx`
2. Adicionar metadados:
   ```typescript
   export const metadata: Metadata = {
     title: "Título",
     description: "...",
     ...
   };
   ```
3. Atualizar sitemap (`src/app/sitemap.ts`)
4. Adicionar link no Header se necessário

#### Adicionar Novo Componente

1. Criar em `src/components/NomeComponente.tsx`
2. Definir se é Client ou Server component
3. Adicionar TypeScript interfaces
4. Importar onde necessário

#### Modificar Integração WordPress

1. Adicionar interface em `src/lib/wpTypes.ts`
2. Criar função em `src/lib/wpClient.ts`
3. Usar em page/component
4. Testar com dados reais do WordPress

### Debugging

#### Imagens não carregam

1. Verificar `next.config.ts` → `remotePatterns`
2. Verificar domínio do WordPress
3. Console do navegador para erro específico
4. Rebuild: `pnpm build`

#### Erro ao buscar WordPress

1. Verificar `WP_BASE_URL` no `.env.local`
2. Testar endpoint direto no navegador
3. Verificar CORS no WordPress
4. Check network tab no DevTools

#### TypeScript Errors

1. Verificar interfaces em `wpTypes.ts`
2. Executar `pnpm type-check`
3. Verificar imports corretos
4. Restart TypeScript server no VSCode

#### Build Falhando

1. Verificar todos os endpoints WordPress estão acessíveis
2. Verificar variáveis de ambiente
3. Limpar cache: `rm -rf .next`
4. Reinstalar: `rm -rf node_modules && pnpm install`

### Estrutura de Decisão

**Quando usar Server Component?**

- Buscar dados
- Acessar backend diretamente
- Conteúdo estático
- SEO importante

**Quando usar Client Component?**

- useState, useEffect, event listeners
- Interatividade
- Browser APIs
- Real-time updates

**Quando usar ISR?**

- Conteúdo que muda ocasionalmente
- Balance entre static e dynamic
- Performance crítica

**Quando usar Dynamic Route?**

- Múltiplas páginas similar structure
- Conteúdo baseado em slug/id
- Exemplo: `/projetos/[slug]`

### Convenções do Projeto

#### Nomenclatura

- Components: PascalCase (`CarouselHome.tsx`)
- Functions: camelCase (`getPageBySlug`)
- Interfaces: PascalCase com I prefix opcional (`PostListItem`)
- Files: kebab-case para routes (`[slug]`)

#### TypeScript

- Sempre tipar props
- Evitar `any`
- Usar interfaces para objetos complexos
- Exportar types quando reusável

#### Styling

- Tailwind classes inline
- Sem CSS modules (exceto globals.css)
- Mobile-first breakpoints
- Seguir design system definido

#### Git

- Commits descritivos
- Branch por feature
- PR para main/master
- Testar build antes de merge

### Recursos Úteis

#### Documentação

- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Tailwind: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com
- WordPress REST API: https://developer.wordpress.org/rest-api/

#### Ferramentas

- Next.js DevTools
- React Developer Tools
- Tailwind CSS IntelliSense (VSCode)
- TypeScript VSCode extension

#### Troubleshooting

- SEO-IMPLEMENTATION.md (checklist SEO)
- Este arquivo (CONTEXT.md)
- Issues no GitHub
- Logs do terminal/browser console

---

## Notas Finais

### Filosofia do Projeto

- **Performance first**: ISR, optimized images, minimal client JS
- **SEO obsessed**: Metadados completos, structured data, sitemap
- **Type-safe**: TypeScript strict, interfaces everywhere
- **Clean code**: Readable, maintainable, well-documented

### Decisões Arquiteturais Importantes

1. **Headless WordPress**: Separação front/back, melhor performance
2. **App Router (Next.js 15)**: Server Components, streaming, nested layouts
3. **ISR over SSR**: Balance performance + freshness
4. **Tailwind over CSS-in-JS**: Utility-first, smaller bundle
5. **shadcn/ui**: Customizable, accessible, tree-shakeable

### Contato

Para dúvidas sobre o projeto:

- Documentação: README.md, SEO-IMPLEMENTATION.md, este arquivo
- Issues: GitHub Issues
- Email: [contact-email]

---

**Última atualização**: Março 2026  
**Versão**: 1.0.0  
**Mantenedor**: Equipe PM Arquitetura
