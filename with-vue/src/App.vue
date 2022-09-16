<script>
import { defineComponent } from "vue";
import { impact } from "@mateonunez/lyra-impact";
import { search } from "@lyrasearch/lyra";

export default defineComponent({
  name: "App",

  data: () => ({
    lyra: null,
    isLoading: true,
    searchPokemon: [],
    search: "",
  }),

  created() {},

  mounted() {
    impact(
      "https://raw.githubusercontent.com/LyraSearch/lyra/main/examples/with-vue/public/pokedex.json",
      {
        property: "pokemon",
      }
    )
      .then((lyra) => {
        this.lyra = lyra;
      })
      .catch(console.error)
      .finally(() => {
        this.isLoading = false;
      });
  },

  watch: {
    search(newValue) {
      if (newValue) {
        const { hits } = search(this.lyra, {
          term: newValue,
          properties: ["name"],
        });

        if (hits.length && !hits.some((x) => !x)) {
          this.searchPokemon = [...new Set(hits)];
        } else {
          this.searchPokemon = [];
        }
      }
    },
  },
});
</script>

<template>
  <main>
    <div class="flex w-full justify-center font-sans">
      <div class="ma">
        <h1>Lyra Impact with Vue</h1>

        <div className="w-full h-8">
          <input
            className="w-full h-full border-rounded border-1 border-gray-500 pl-2"
            type="text"
            v-model="search"
            placeholder="Find a Pokemon..."
          />
        </div>

        <div v-if="!isLoading">
          <div class="grid mt-4">
            <!-- Render Pokemon grid -->
            <div
              v-for="p in searchPokemon"
              :key="p.id"
              class="grid grid-cols-2 my-2"
            >
              <img :src="p.img" />

              <div>
                <h2 class="text-lg">{{ p.name }}</h2>
                <p>Type: {{ p.type.join(", ") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
