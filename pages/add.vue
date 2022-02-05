<template>
  <div>
    <form
      v-if="info"
      class="add"
      @submit="send"
      method="post"
      action="https://demo-api.vsdev.space/api/delivery/sales"
    >
      <h1 class="heading">Добавления</h1>
      <label v-for="(item, i) in info" :key="i" class="label">
        {{ item.title }}
        <input
          class="input"
          v-if="item.type !== 'select'"
          :type="item.type"
          v-model="keys[i]"
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
    }
  },
  computed: {
    ...mapGetters({
      infoData: 'mainpage/getForm',
    }),
  },
  async mounted() {
    const data = await this.infoData
    this.info = data.data.fields
    this.keys = Object.keys(data.data.fields)
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
      let resp = null
      try {
        resp = await axios.post(
          'https://demo-api.vsdev.space/api/farm/baby',
          data
        )
        alert('Добавленно успешно')
        e.target.reset()
        location.reload()
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
</style>
