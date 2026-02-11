# Otimizações de SEO Implementadas - PM Arquitetura

Este documento descreve todas as otimizações de SEO implementadas no site PM Arquitetura.

## 📋 Sumário

1. [Metadados e Open Graph](#metadados-e-open-graph)
2. [Structured Data (Schema.org)](#structured-data-schemaorg)
3. [Sitemap e Robots.txt](#sitemap-e-robotstxt)
4. [Melhorias Técnicas](#melhorias-técnicas)
5. [Checklist de Implementação](#checklist-de-implementação)

---

## 🏷️ Metadados e Open Graph

### Layout Principal (layout.tsx)

- ✅ **Meta title dinâmico** com template `%s | PM Arquitetura`
- ✅ **Meta description otimizada** com palavras-chave relevantes
- ✅ **Keywords** específicas para arquitetura em São Paulo
- ✅ **Open Graph tags** completas para compartilhamento em redes sociais
- ✅ **Twitter Cards** configuradas
- ✅ **Robots meta tags** otimizadas para indexação
- ✅ **Canonical URL** configurada

### Páginas Específicas

#### Home (/)

- Title: "Home | PM Arquitetura"
- Description focada em portfólio e projetos

#### Sobre (/sobre)

- Title: "Sobre | Conheça o Estúdio PM Arquitetura"
- Description com história do estúdio e equipe
- Keywords: paulo mencarini, lucas navarro, estúdio arquitetura

#### Projetos (/projetos)

- Title: "Projetos | Portfólio de Arquitetura PM Arquitetura"
- Description otimizada para portfólio
- Keywords: projetos residenciais, comerciais, corporativos

#### Projetos Individuais (/projetos/[slug])

- **Metadados dinâmicos** gerados a partir do WordPress
- Title inclui nome do projeto
- Description com categoria, local e ano
- Open Graph com primeira imagem do projeto
- Schema.org JSON-LD específico por projeto

#### Produtos (/produtos)

- Title: "Produtos | Design de Móveis e Peças Autorais"
- Description focada em design de móveis customizados

#### Publicações (/publicacoes)

- Title: "Publicações | Notícias e Artigos PM Arquitetura"
- Description para blog e notícias

#### Contato (/contato)

- Title: "Contato | Entre em Contato com PM Arquitetura"
- Description focada em conversão

---

## 🔍 Structured Data (Schema.org)

### Schemas Globais (src/lib/schema.ts)

#### 1. Organization Schema

```json
{
  "@type": "ArchitecturalDesignAgency",
  "name": "PM Arquitetura",
  "foundingDate": "2007",
  "founder": "Paulo Mencarini",
  "employee": ["Paulo Mencarini", "Lucas Navarro"]
}
```

#### 2. Local Business Schema

```json
{
  "@type": "LocalBusiness",
  "address": "São Paulo, SP",
  "priceRange": "$$$",
  "openingHours": "Segunda-Sexta 9h-18h"
}
```

#### 3. Website Schema

```json
{
  "@type": "WebSite",
  "url": "https://pmarquitetura.com.br",
  "potentialAction": "SearchAction"
}
```

#### 4. Project Schema (Dinâmico)

Cada projeto individual recebe um schema `CreativeWork` com:

- Nome do projeto
- Descrição
- Imagens
- Categoria
- Localização
- Ano de criação

### Onde os Schemas São Usados

- ✅ Layout principal: Organization, LocalBusiness, Website
- ✅ Páginas de projetos individuais: CreativeWork (projeto específico)

---

## 🗺️ Sitemap e Robots.txt

### Sitemap Dinâmico (src/app/sitemap.ts)

- ✅ Gerado automaticamente pelo Next.js
- ✅ Inclui todas as páginas estáticas
- ✅ Inclui todos os projetos dinamicamente
- ✅ Inclui todos os produtos dinamicamente
- ✅ Define prioridades adequadas:
  - Home: 1.0
  - Projetos: 0.9
  - Produtos: 0.8
  - Sobre: 0.8
  - Publicações: 0.7
  - Projetos individuais: 0.7
  - Produtos individuais: 0.6
  - Contato: 0.6

### Robots.txt (public/robots.txt)

```
User-agent: *
Allow: /

Sitemap: https://pmarquitetura.com.br/sitemap.xml

Disallow: /api/
Disallow: /_next/static/
```

---

## ⚙️ Melhorias Técnicas

### 1. Configuração de Imagens

- ✅ `remotePatterns` configurado para WordPress
- ✅ Suporte para HTTP e HTTPS
- ✅ Domínios locais e de produção

### 2. Metadados Base

- ✅ `metadataBase` configurado
- ✅ URLs canônicas em todas as páginas
- ✅ Language tag `pt-BR`

### 3. Performance

- ✅ Revalidação ISR configurada (10 minutos)
- ✅ Imagens otimizadas com Next.js Image
- ✅ Lazy loading automático

### 4. Acessibilidade

- ✅ `alt` tags em todas as imagens
- ✅ Estrutura semântica HTML
- ✅ Breadcrumbs implementados

---

## ✅ Checklist de Implementação

### Configuração Obrigatória

- [ ] **Adicionar variável de ambiente:**

  ```env
  NEXT_PUBLIC_SITE_URL=https://pmarquitetura.com.br
  ```

- [ ] **Criar imagem Open Graph:**
  - Criar `public/og-image.jpg`
  - Tamanho: 1200x630px
  - Mostrar logotipo e nome do estúdio

- [ ] **Google Search Console:**
  - [ ] Adicionar propriedade no Search Console
  - [ ] Adicionar código de verificação em `layout.tsx` (linha 86)
  - [ ] Submeter sitemap: `https://pmarquitetura.com.br/sitemap.xml`

- [ ] **Adicionar links de redes sociais:**
  - Atualizar `src/lib/schema.ts` linha 50 com links do Instagram/Facebook
  - Exemplo:
    ```typescript
    sameAs: [
      "https://www.instagram.com/pmarquitetura",
      "https://www.facebook.com/pmarquitetura",
    ],
    ```

- [ ] **Adicionar coordenadas geográficas:**
  - Atualizar `src/lib/schema.ts` linha 66-69
  - Buscar coordenadas no Google Maps

### Validação

- [ ] **Testar metadados:**
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

- [ ] **Validar Schema.org:**
  - [Google Rich Results Test](https://search.google.com/test/rich-results)
  - [Schema.org Validator](https://validator.schema.org/)

- [ ] **Verificar Sitemap:**
  - Acessar: `https://pmarquitetura.com.br/sitemap.xml`
  - Verificar se todas as URLs estão presentes

- [ ] **Testar Robots.txt:**
  - Acessar: `https://pmarquitetura.com.br/robots.txt`
  - Verificar se está bloqueando apenas `/api/` e `/_next/static/`

### Monitoramento

- [ ] **Configurar Google Analytics 4**
- [ ] **Configurar Google Tag Manager** (opcional)
- [ ] **Monitorar Core Web Vitals** no Search Console
- [ ] **Verificar indexação** com `site:pmarquitetura.com.br`

---

## 📊 Palavras-chave Principais

### Foco Principal

- Arquitetura São Paulo
- Projeto arquitetônico
- Design de interiores São Paulo
- Arquiteto Paulo Mencarini

### Secundárias

- Arquitetura contemporânea
- Arquitetura minimalista
- Reforma residencial
- Projeto comercial
- Design de móveis

### Long-tail

- "Estúdio de arquitetura em São Paulo"
- "Projeto de arquitetura residencial SP"
- "Design de interiores personalizado"
- "Arquitetura minimalista São Paulo"

---

## 🎯 Próximos Passos

1. **Conteúdo:**
   - Adicionar mais texto descritivo nas páginas
   - Blog com artigos sobre arquitetura
   - Case studies detalhados dos projetos

2. **Link Building:**
   - Parcerias com fornecedores
   - Guest posts em blogs de arquitetura
   - Cadastro em diretórios de arquitetura

3. **Performance:**
   - Implementar cache agressivo
   - Otimizar Core Web Vitals
   - Implementar PWA

4. **Local SEO:**
   - Google My Business
   - Avaliações de clientes
   - Citações locais

---

## 📝 Notas Importantes

- Todos os metadados são gerados dinamicamente pelo Next.js 15
- O sitemap é regenerado automaticamente a cada build
- As imagens do WordPress são otimizadas pelo Next.js Image
- O revalidate está configurado para 10 minutos (ISR)
- Schema.org está seguindo as diretrizes mais recentes

---

**Última atualização:** Fevereiro 2026
**Responsável:** Equipe de Desenvolvimento PM Arquitetura
