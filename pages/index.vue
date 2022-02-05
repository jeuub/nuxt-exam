<template>
  <div class="page__container">
    <WidgetComponent />
    <div v-if="info">
      <div class="content">
        <h1 class="heading">Главная страница</h1>

        <img class="mainimage" :src="info.image" alt="" />
      </div>
      <p v-html="info.text" class="main__text"></p>
    </div>
    <LoaderComponent v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WidgetComponent from '@/components/WidgetComponent.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
export default {
  name: 'IndexPage',
  components: { LoaderComponent, WidgetComponent },
  layout: 'DefaultLayout',
  data() {
    return {
      info: null,
    }
  },
  computed: {
    ...mapGetters({
      infoData: 'mainpage/getMainPage',
    }),
  },
  async mounted() {
    const data = await this.infoData
    this.info = data.data
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

.delivery img {
  border-radius: 20px;
}

.content {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}
.heading {
  text-align: center;
}
.page__container {
  display: flex;
  margin-bottom: 40px;
}
</style>
