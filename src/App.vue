<script setup>
import { useTime } from "./composables/useTime";
import { useBusLogic } from "./composables/useBusLogic";

const { currentTimeFormatted } = useTime();
const { selectedVia, nextToCity, nextFromCity, allSchedulesToday } =
  useBusLogic();

const vias = ["Bicas", "R. Novo"];
</script>

<template>
  <div class="app-container">
    <!-- Header com Relógio em Tempo Real -->
    <header>
      <div>
        <h1>BusReady</h1>
        <p>Ecossistema learnTECH</p>
      </div>
      <div style="text-align: right">
        <div class="current-time">{{ currentTimeFormatted }}</div>
        <p style="letter-spacing: 1px">HORA ATUAL</p>
      </div>
    </header>

    <main>
      <!-- Seletor de Rota (Via) -->
      <section class="route-selector">
        <button
          v-for="via in vias"
          :key="via"
          @click="selectedVia = via"
          :class="{ active: selectedVia === via }"
        >
          Via {{ via }}
        </button>
      </section>

      <!-- Card: S. João para JF -->
      <div class="bus-card">
        <span class="route-label">S. João ➜ Juiz de Fora</span>

        <span
          v-if="nextToCity.diff"
          :class="['status-badge', { urgent: nextToCity.diff <= 10 }]"
        >
          {{ nextToCity.status }}
        </span>

        <div class="time-display">
          <span class="time-value">{{ nextToCity.time }}</span>
          <span class="diff-message">{{ nextToCity.message }}</span>
        </div>
      </div>

      <!-- Card: JF para S. João -->
      <div class="bus-card accent">
        <span class="route-label">Juiz de Fora ➜ S. João</span>

        <span
          v-if="nextFromCity.diff"
          :class="['status-badge', { urgent: nextFromCity.diff <= 10 }]"
        >
          {{ nextFromCity.status }}
        </span>

        <div class="time-display">
          <span class="time-value">{{ nextFromCity.time }}</span>
          <span class="diff-message">{{ nextFromCity.message }}</span>
        </div>
      </div>

      <!-- Quadro de Horários Completo do Dia -->
      <section class="schedule-table">
        <h3>QUADRO DE HORÁRIOS - HOJE</h3>

        <div class="grid-cols">
          <div
            v-for="(direction, idx) in allSchedulesToday"
            :key="idx"
            class="col"
          >
            <p
              style="
                font-size: 0.65rem;
                font-weight: 800;
                text-align: center;
                color: #94a3b8;
                margin-bottom: 10px;
              "
            >
              {{ direction.origin }} <br />
              ➜ JF
            </p>
            <div class="time-list">
              <div
                v-for="item in direction.times"
                :key="item.hour"
                class="time-row"
              >
                {{ item.hour }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Rodapé de Informações -->
      <footer style="text-align: center; margin-top: 10px">
        <a
          href="#"
          style="
            text-decoration: none;
            color: #94a3b8;
            font-size: 0.7rem;
            font-weight: 600;
          "
        >
          🚌 MATRIZ BASSAMAR: (32) 3215-1109
        </a>
      </footer>
    </main>
  </div>
</template>

<style scoped>
/* Estilos específicos para garantir o layout da grade e listas */
.time-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.app-container {
  min-height: 100vh;
  padding-bottom: 40px;
}
</style>
