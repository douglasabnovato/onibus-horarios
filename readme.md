🚀 Plano de Execução: BusReady (v1.0)
1. Marco: Configuração e Infraestrutura
Objetivo: Preparar o ambiente de desenvolvimento e garantir que as ferramentas de qualidade estejam rodando.

Etapa 1.1: Inicialização do Projeto

Executar npm create vite@latest bus-ready -- --template vue-ts.

Instalar dependências: npm install -D tailwindcss postcss autoprefixer vitest vite-plugin-pwa.

Etapa 1.2: Configuração do Design System

Inicializar o Tailwind: npx tailwindcss init -p.

Configurar o tailwind.config.js com a paleta de cores (Brand, Status, Accent) que definimos.

Configurar o assets/main.css com as diretivas @tailwind.

Etapa 1.3: Verificação de Ambiente

Rodar o servidor de desenvolvimento (npm run dev).

Verificar se o Tailwind está aplicando as cores corretamente em um "Hello World".

2. Marco: Camada de Dados e Lógica (The Engine)
Objetivo: Implementar o motor que faz os cálculos de tempo e filtros.

Etapa 2.1: Estruturação dos Dados

Criar src/data/schedules.json com o JSON que mapeamos da imagem.

Etapa 2.2: Implementação do Pulso (Tempo)

Criar src/composables/useTime.ts.

Etapa 2.3: Implementação da Inteligência (Bus Logic)

Criar src/composables/useBusLogic.ts.

Etapa 2.4: Validação Técnica (Testes)

Criar tests/unit/useBusLogic.spec.ts.

Verificação: Rodar npx vitest e garantir que o cálculo do "próximo ônibus" funciona para horários de manhã, tarde e noite.

3. Marco: Desenvolvimento da Interface (The UI)
Objetivo: Transformar a lógica em componentes visuais reativos.

Etapa 3.1: Layout Mestre

Configurar o App.vue com o container mobile-first e o header.

Etapa 3.2: Componente de Destaque (Hero)

Criar src/components/NextBusHero.vue.

Implementar a reatividade de cores (vermelho para < 5 min).

Etapa 3.3: Filtros de Rota

Criar src/components/RouteFilter.vue.

Conectar o filtro ao selectedVia do useBusLogic.

Etapa 3.4: Lista Completa

Criar src/components/BusCard.vue para exibir a tabela de horários remanescentes do dia.

4. Marco: Transformação em App (PWA)
Objetivo: Garantir que o passageiro consiga usar o app sem internet no ponto de ônibus.

Etapa 4.1: Configuração do Manifesto

Configurar o plugin vite-plugin-pwa no vite.config.ts.

Adicionar ícones e cores de tema.

Etapa 4.2: Estratégia de Cache

Configurar o Service Worker para cachear o schedules.json e os assets estáticos.

Etapa 4.3: Verificação Offline

Build do projeto (npm run build).

Simular "Offline" no Chrome DevTools e verificar se os horários ainda aparecem.

5. Marco: Deploy e Entrega Final
Objetivo: Colocar a aplicação em produção no ecossistema learnTECH.

Etapa 5.1: Deploy Automatizado

Conectar o repositório GitHub à Netlify ou Vercel.

Etapa 5.2: Verificação de Produção

Acessar pelo celular real, instalar na tela de início (Add to Home Screen).

Testar o botão de WhatsApp.

🛡️ Checklist de Verificação (Qualidade CTO)
Antes de considerar o passo como "Concluído", verifique:

Responsividade: O layout quebra em celulares muito pequenos (iPhone SE)?

Performance: O Lighthouse do Chrome dá nota > 90 para Performance e PWA?

Acurácia: O "Próximo Ônibus" mostrado no app bate com o relógio da parede e a tabela da Bassamar?