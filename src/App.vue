<script setup>
import MainPage from '@/pages/MainPage.vue'
import UsersList from '@/components/UsersList.vue'

</script>

<template>
  <router-view></router-view>
    <!-- <MainPage v-if="UsersInfo" :UsersInfo="UsersInfo" :HeadIcons="HeadIcons"/> -->
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz@9..144&family=Open+Sans:wght@300;400;500;600;700&family=Roboto&family=Space+Grotesk&display=swap');

*  {
    font-family: 'Open Sans', sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 925px;
    min-width: none;
    background: #d9dbd5 100%;
    display: flex;
}

</style>
