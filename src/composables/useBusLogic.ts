import { ref, computed } from "vue";
import scheduleData from "../data/schedules.json";
import { useTime } from "./useTime";

export function useBusLogic() {
  const { now } = useTime();

  // Estado para controlar qual via o usuário selecionou (Ex: Bicas ou R. Novo)
  const selectedVia = ref("Bicas");

  // Retorna os dados da rota selecionada
  const currentRoute = computed(() =>
    scheduleData.routes.find((r) => r.via === selectedVia.value),
  );

  /**
   * Função nuclear: Calcula o próximo ônibus baseado na direção
   * @param directionIndex 0 para Ida (S. João x JF), 1 para Volta (JF x S. João)
   */
  const getNextBus = (directionIndex: number) => {
    if (!currentRoute.value) return null;

    const direction = currentRoute.value.directions[directionIndex];
    const currentTimeInMinutes =
      now.value.getHours() * 60 + now.value.getMinutes();
    const dayOfWeek = now.value.getDay(); // 0 = Domingo, 1-5 = Úteis, 6 = Sábado

    const isSunday = dayOfWeek === 0;
    const isSaturday = dayOfWeek === 6;

    // 1. Filtrar horários válidos para o dia de hoje
    const availableTimes = direction.times
      .filter((t) => {
        if (t.days === "diario") return true;
        if (t.days === "seg-sab" && !isSunday) return true;
        if (t.days === "dom-fer" && isSunday) return true;
        return false;
      })
      .map((t) => {
        const [h, m] = t.hour.split(":").map(Number);
        return {
          time: t.hour,
          totalMinutes: h * 60 + m,
          label: t.days,
        };
      });

    // 2. Encontrar o próximo horário após o momento atual
    const futureTimes = availableTimes
      .filter((t) => t.totalMinutes > currentTimeInMinutes)
      .sort((a, b) => a.totalMinutes - b.totalMinutes);

    // Se não houver mais ônibus hoje
    if (futureTimes.length === 0) {
      return {
        status: "Encerrado",
        time: "--:--",
        diff: null,
        message: "Não há mais viagens hoje",
      };
    }

    const next = futureTimes[0];
    const diff = next.totalMinutes - currentTimeInMinutes;

    return {
      status: diff <= 10 ? "Iminente" : "Próximo",
      time: next.time,
      diff: diff,
      message: diff <= 60 ? `Em ${diff} min` : `Faltam mais de 1h`,
    };
  };

  // Computed properties para os cards da Interface
  const nextToCity = computed(() => getNextBus(0)); // S. João -> JF
  const nextFromCity = computed(() => getNextBus(1)); // JF -> S. João

  // Lista de todos os horários do dia para a rota selecionada (Tabela completa)
  const allSchedulesToday = computed(() => {
    if (!currentRoute.value) return [];
    const dayOfWeek = now.value.getDay();
    const isSunday = dayOfWeek === 0;

    return currentRoute.value.directions.map((dir) => ({
      origin: dir.from,
      destination: dir.to,
      times: dir.times.filter((t) => {
        if (t.days === "diario") return true;
        if (t.days === "seg-sab" && !isSunday) return true;
        if (t.days === "dom-fer" && isSunday) return true;
        return false;
      }),
    }));
  });

  return {
    selectedVia,
    currentRoute,
    nextToCity,
    nextFromCity,
    allSchedulesToday,
  };
}
