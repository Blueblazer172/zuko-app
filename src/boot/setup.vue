<template>

  <app-loading v-if="!isAppReady" />

  <app v-else />
 </template>

 <script>
 import { AppLoading } from 'expo';
 import App from '../App.vue';

 </script>