## 🚀 Plano de Execução: BusReady (v1.0)

### 1. Marco: Configuração e Infraestrutura

**Objetivo:** Preparar o ambiente de desenvolvimento e garantir que as ferramentas de qualidade estejam rodando.

- **Etapa 1.1: Inicialização do Projeto**
  - Executar `npm create vite@latest bus-ready -- --template vue-ts`.
  - Instalar dependências: `npm install -D tailwindcss postcss autoprefixer vitest vite-plugin-pwa`.
- **Etapa 1.2: Configuração do Design System**
  - Inicializar o Tailwind: `npx tailwindcss init -p`.
  - Configurar o `tailwind.config.js` com a paleta de cores (Brand, Status, Accent).
  - Configurar o `assets/main.css` com as diretivas `@tailwind`.
- **Etapa 1.3: Verificação de Ambiente**
  - Rodar o servidor de desenvolvimento (`npm run dev`).
  - Verificar a aplicação das cores Tailwind em um componente de teste.

---

### 2. Marco: Camada de Dados e Lógica (The Engine)

**Objetivo:** Implementar o motor que faz os cálculos de tempo e filtros.

- **Etapa 2.1: Estruturação dos Dados**
  - Criar `src/data/schedules.json` com o mapeamento tipado dos horários.
- **Etapa 2.2: Implementação do Pulso (Tempo)**
  - Criar `src/composables/useTime.ts` (Relógio Mestre).
- **Etapa 2.3: Implementação da Inteligência (Bus Logic)**
  - Criar `src/composables/useBusLogic.ts` (Filtros e busca do próximo ônibus).
- **Etapa 2.4: Validação Técnica (Testes)**
  - Criar `tests/unit/useBusLogic.spec.ts`.
  - **Verificação:** Executar `npx vitest` para validar cálculos em diferentes períodos do dia.

---

### 3. Marco: Desenvolvimento da Interface (The UI)

**Objetivo:** Transformar a lógica em componentes visuais reativos.

- **Etapa 3.1: Layout Mestre**
  - Configurar o `App.vue` com container _mobile-first_ e Header.
- **Etapa 3.2: Componente de Destaque (Hero)**
  - Criar `src/components/NextBusHero.vue`.
  - Implementar reatividade de cores baseada no `diff` de tempo.
- **Etapa 3.3: Filtros de Rota**
  - Criar `src/components/RouteFilter.vue` integrado ao `selectedVia`.
- **Etapa 3.4: Lista Completa**
  - Criar `src/components/BusCard.vue` para exibição do quadro de horários completo.

---

### 4. Marco: Transformação em App (PWA)

**Objetivo:** Garantir o funcionamento Offline-First para passageiros em trânsito.

- **Etapa 4.1: Configuração do Manifesto**
  - Configurar `vite-plugin-pwa` no `vite.config.ts`.
  - Definir ícones, cores de tema e nome do App.
- **Etapa 4.2: Estratégia de Cache**
  - Configurar Service Worker para cachear assets estáticos e o JSON de horários.
- **Etapa 4.3: Verificação Offline**
  - Executar Build (`npm run build`).
  - Validar persistência de dados no Chrome DevTools (Mode: Offline).

---

### 5. Marco: Deploy e Entrega Final

**Objetivo:** Colocar a aplicação em produção no ecossistema **learnTECH**.

- **Etapa 5.1: Deploy Automatizado**
  - Conectar repositório via CI/CD (Netlify/Vercel).
- **Etapa 5.2: Verificação de Produção**
  - Instalar via "Add to Home Screen" no dispositivo móvel.
  - Validar integração com o botão de suporte via WhatsApp.

---

### 🛡️ Checklist de Verificação (Qualidade CTO)

- [ ] **Responsividade:** O layout é funcional em telas pequenas (ex: iPhone SE)?
- [ ] **Performance:** Nota > 90 no Lighthouse para Performance e PWA?
- [ ] **Acurácia:** Os horários calculados batem com o relógio do sistema e a tabela física?
