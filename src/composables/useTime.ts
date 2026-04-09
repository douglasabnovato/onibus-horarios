import { ref, onMounted, onUnmounted, computed } from "vue";

export function useTime() {
  const now = ref(new Date()); //TimeNow :
  let timer: any;

  //faketime:
  //faketime: const fakeTime = new Date()
  //faketime: fakeTime.setHours(9, 0, 0)
  //faketime: const now = ref(fakeTime)

  onMounted(() => {
    timer = setInterval(() => {
      now.value = new Date(); //TimeNow :
    }, 1000);
  });

  onUnmounted(() => clearInterval(timer));

  const currentTimeFormatted = computed(() => {
    return now.value.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const dayType = computed(() => {
    const day = now.value.getDay();
    return day === 0 || day === 6 ? "fds" : "util";
  });

  return { now, currentTimeFormatted, dayType };
}
