import Vue from "vue";
const EventBus = new Vue();
export default function() {
  return {
    on(event, func) {
      EventBus.$on(event, func);
    },
    emit(event, data) {
      EventBus.$emit(event, data);
    },
  };
}
