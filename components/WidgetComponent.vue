<template>
  <div v-if="info" class="widget">
    у нас родилось:<br />
    {{ info.cows }} прекрасных коров,<br />
    {{ info.rabbits }} прекрасных кроликов,<br />
    {{ info.sheeps }} прекрасных овечек,
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'WidgetComponent',
  data() {
    return {
      info: null,
    }
  },
  computed: {
    ...mapGetters({
      infoData: 'mainpage/getWidget',
    }),
  },
  async mounted() {
    const data = await this.infoData
    this.info = data.data
  },
}
</script>

<style>
.widget {
  padding: 20px;
  width: fit-content;
  border-radius: 10px;
  background: #f0e0d5;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
</style>
