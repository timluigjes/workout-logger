<script setup>
import { useRoute, RouterLink, RouterView } from 'vue-router';
const route = useRoute();
</script>

<template>
  <header>
    <nav uk-navbar class="uk-navbar-container">
      <div class="uk-container">
        <div class="uk-navbar-left">
          <ul class="uk-navbar-nav">
            <li :class="{ 'uk-active': route.name === 'home' }">
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li :class="{ 'uk-active': route.name === 'logs' }">
              <RouterLink to="/logs">Logs</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav> 
  </header>

  <RouterView />
</template>
