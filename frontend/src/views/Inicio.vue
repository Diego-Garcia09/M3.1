<template>
    <v-btn @click="getInfo">Acceder a DB</v-btn>
    <v-card>
        <!-- Muestra informacion de la base de datos -->
        <div v-for="post in posts" :key="post.id">
            {{ post }}
        </div>
    </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
const posts = ref([]);
// Regresa la ruta actual, incluye parametros
const route = useRoute();
const token = route.query.token;

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const getInfo = async () => {
    // Se accede a la ruta protegida enviando el token
    const res = await axios.get('https://localhost:3000/proyectos', config)
    posts.value = res.data;
};

onMounted(() => {
    getInfo();
});
</script>