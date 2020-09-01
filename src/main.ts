import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

window.addEventListener("load",function() {
  setTimeout(function(){
    window.scrollTo(0, 10000);
  }, 0);
});

if(document.documentElement.clientWidth>500){
  window.alert('为了保证使用体验，请用手机打开本网页')
  const img = document.createElement('img')
  const app= <HTMLElement>document.querySelector('#app')
  app.style.maxWidth='500px'
  app.style.margin='0 auto'

  img.src='qrcode.png'
  document.body.appendChild(img)
  img.style.position='fixed'
  img.style.left='50%'
  img.style.top='50%'
  img.style.transform='translateX(-50%) translateY(-50%)'
  img.style.boxShadow='0 0 10px rgba(0,0,0,0.2)'
  img.addEventListener('click',(e)=>{
    img.style.display='none'
  })
}