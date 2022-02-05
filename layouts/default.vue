<template>
  <div>
    <div class="widget__wrapper"><WidgetComponent /></div>

    <HeaderComponent />
    <Nuxt />
    <div class="footer__wrapper">
      <FooterComponent />
    </div>
  </div>
</template>
<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import WidgetComponent from '@/components/WidgetComponent.vue'
export default {
  name: 'DefaultLayout',
  components: {
    HeaderComponent,
    FooterComponent,
    WidgetComponent,
  },
}
</script>

<style>
.footer__wrapper {
  position: fixed;
  width: 100%;
  bottom: 0;
}

.widget__wrapper {
  position: fixed;
  bottom: 50px;
  left: 20px;
}
</style>
