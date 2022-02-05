<template>
  <div>
    <div v-if="info && deliviries">
      <div class="content">
        <h1 class="heading">Главная страница</h1>
        <img class="mainimage" :src="info.image" alt="" />
      </div>
      <p v-html="info.text" class="main__text"></p>
      <h2 class="heading">Наш роддом:</h2>
      <div class="list">
        <div v-for="(el, i) in del" :key="i" class="delivery">
          малыш : {{ el.name }}
          <img v-if="el.type === 'cow'" src="cow_img.jpg" alt="" />
          <img v-if="el.type === 'rabbit'" src="rabbit_img.jpg" alt="" />
          <img v-if="el.type === 'sheep'" src="sheep_img.jpg" alt="" />
        </div>
      </div>
    </div>
    <LoaderComponent v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoaderComponent from '@/components/LoaderComponent.vue'
export default {
  name: 'IndexPage',
  components: { LoaderComponent },
  layout: 'DefaultLayout',
  data() {
    return {
      info: null,
      del: null,
    }
  },
  computed: {
    ...mapGetters({
      infoData: 'mainpage/getMainPage',
      deliviries: 'mainpage/getDel',
    }),
  },
  async mounted() {
    const data = await this.infoData
    this.info = data.data

    const dataa = await this.deliviries
    this.del = dataa.data
  },
}
</script>

<style>
.mainimage {
  display: block;
  border-radius: 30px;
  max-width: 600px;
}
.main__text {
  padding: 20px;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin: 20px 20px 40px;
  gap: 20px;
}
.delivery {
  text-align: center;
  display: flex;
  flex-direction: column;
  max-width: 250px;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
}

.delivery img {
  border-radius: 20px;
}

.content {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.heading {
  text-align: center;
}
</style>
