import { reactive } from "vue";
export const store = reactive({
  search: "",
  insert(value) {
    this.search = value;
  },
  get() {
    return this.search;
  },
});
