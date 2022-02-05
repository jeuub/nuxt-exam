<template>
  <div>
    <button v-on:click="showform = !showform" class="openform">
      Открыть форму
    </button>
    <transition name="fade">
      <form v-if="info && showform" class="add" @submit="send">
        <h1 class="heading">Добавления</h1>
        <label v-for="(item, i) in info" :key="i" class="label">
          {{ item.title }}
          <input
            class="input"
            v-if="item.type !== 'select'"
            :type="item.type"
            required
            :name="keys[i]"
            :id="keys[i]"
          />
          <select v-else :name="keys[i]">
            <option
              v-for="value in item.values"
              :value="value"
              :key="value"
              :id="keys[i]"
            >
              {{ value }}
            </option>
          </select>
        </label>
        <button class="button" type="submit">Добавить</button>
      </form>
      <LoaderComponent v-else-if="showform" />
    </transition>

    <h2 class="heading">Наш роддом:</h2>
    <div class="list" v-if="babies">
      <div v-for="(el, i) in babies" :key="i" class="delivery">
        малыш {{ el.name }} <br />
        кто? : {{ el.type }} <br />
        Вес : {{ el.weight }} <br />
        Цвет : {{ el.color }} <br />
        Пол : {{ el.sex }} <br />
        <img
          v-if="el.type === 'cow'"
          src="cow_img.jpg"
          alt=""
          class="anim__img"
        />
        <img
          v-if="el.type === 'rabbit'"
          src="rabbit_img.jpg"
          alt=""
          class="anim__img"
        />
        <img
          v-if="el.type === 'sheep'"
          src="sheep_img.jpg"
          alt=""
          class="anim__img"
        />
      </div>
    </div>
    <LoaderComponent v-else />
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import LoaderComponent from '@/components/LoaderComponent.vue'
export default {
  name: 'AddPage',
  components: { LoaderComponent },
  layout: 'DefaultLayout',
  data() {
    return {
      info: null,
      keys: null,
      showform: false,
      babies: null,
    }
  },
  computed: {
    ...mapGetters({
      infoData: 'mainpage/getForm',
      getBabies: 'mainpage/getDel',
    }),
  },
  async mounted() {
    const data = await this.infoData
    this.info = data.data.fields
    this.keys = Object.keys(data.data.fields)

    const dataa = await this.getBabies
    this.babies = dataa.data.reverse()
  },
  methods: {
    async send(e) {
      e.preventDefault()
      const data = {}
      data.type = e.target[0].value
      data.name = e.target[1].value
      data.weight = e.target[2].value
      data.color = e.target[3].value
      data.sex = e.target[4].value

      try {
        await axios.post('https://demo-api.vsdev.space/api/farm/baby', data)
        e.target.reset()
        this.babies.unshift(data)
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
<style>
.about__text {
  padding: 20px;
}
.add {
  display: flex;
  flex-direction: column;
}
.add label {
  margin: 10px auto;
}

.button {
  width: 200px;
  margin: 0 auto;
  border: none;
  padding: 7px 12px;
  border-radius: 8px;
  background: white;
  opacity: 1;
}

.button:hover {
  opacity: 0.7;
}

.input {
  border: none;
  border-radius: 8px;
  padding: 5px 7px;
}

.label {
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
  height: auto;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 0;
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

.openform {
  margin-left: 20px;
  padding: 7px 22px;
  border: none;
  border-radius: 8px;
  -webkit-box-shadow: 1px 2px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 1px 2px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 1px 2px 8px 0px rgba(34, 60, 80, 0.2);
  transition: 0.3s;
  background: transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.anim__img {
  border-radius: 12px;
  height: 100%;
}
</style>
