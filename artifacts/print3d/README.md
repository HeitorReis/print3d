# PRINT3D — vitrine estática do catálogo

Site de página única, totalmente estático, que apresenta os 6 produtos do catálogo e converte visita em conversa por WhatsApp ou e‑mail. Sem backend, sem banco, sem gateway de pagamento.

## O catálogo é gerado, não editado aqui

`src/data/products.ts` é **arquivo gerado**. A fonte da verdade é `data/catalog/selected.json`, na raiz do repositório.

```bash
node data/tools/analyze.mjs     # ranking de categorias e produtos
node data/tools/pricing.mjs     # preço por canal
node data/tools/sync-site.mjs   # regenera src/data/products.ts e os placeholders
```

Editar `products.ts` à mão funciona até a próxima geração, e então some.

## Rodar

```bash
pnpm --filter @workspace/print3d run dev            # dev server (precisa de PORT e BASE_PATH)
pnpm --filter @workspace/print3d run typecheck      # tsc --noEmit
VITE_BASE_PATH=/print3d/ pnpm --filter @workspace/print3d run build:pages   # build do GitHub Pages
```

## Estrutura da tela

| Seção | Arquivo | Função |
|---|---|---|
| Header fixo | `components/Header.tsx` | logo, navegação, PT/EN, carrinho |
| Hero | `components/Hero.tsx` | posicionamento e 4 números‑chave |
| Diferenciais | `components/ValueProps.tsx` | 5 cards de proposta de valor |
| Catálogo | `components/ProductCatalog.tsx` + `ProductCard.tsx` | 6 produtos com filtro, preço, bullets e detalhes expansíveis |
| Como trabalhamos | `components/TrustSection.tsx` | 6 cards de confiabilidade: origem do modelo, limites do material, prazo, troca, preço, quem faz |
| Projetos sob medida | `components/CustomProjects.tsx` | encomendas fora do catálogo |
| Processo | `components/ProcessSection.tsx` | 5 passos do pedido |
| Contato | `components/ContactSection.tsx` | WhatsApp, e‑mail e redes |
| Rodapé | `components/Footer.tsx` | descrição e aviso de marca |
| Carrinho | `components/CartDrawer.tsx` | monta a mensagem de orçamento |

## Fotos dos produtos

Cada produto tem uma pasta em `public/images/products/<slug>/`. Jogue as fotos ali (`01-*.jpg`, `02-*.jpg`, …) e elas aparecem automaticamente no carrossel, em ordem alfabética. Enquanto não houver foto, o `00-placeholder.svg` gerado é exibido.

**Não use fotos do MakerWorld.** A licença CC0 cobre o arquivo 3D, não as fotos do designer. Ver `docs/06-playbook-de-publicacao.md`, seção "Briefing de fotos".

## Contato e identidade

`src/config.ts` — telefone do WhatsApp, e‑mail, LinkedIn, GitHub, Instagram.
`src/i18n.ts` — todo o texto, em PT‑BR (padrão) e EN.

## Deploy

Push na `main` dispara `.github/workflows/deploy-pages.yml`, que builda com `VITE_BASE_PATH=/print3d/` e publica no GitHub Pages.
