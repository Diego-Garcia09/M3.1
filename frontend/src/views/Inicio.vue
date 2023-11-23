<template>
    <v-btn @click="getInfo">Acceder a DB</v-btn>
    <v-card>
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
const route = useRoute();
const token = route.query.token;
console.log("Soy el frontend y el token es: ", token);
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const getInfo = async () => {
    const res = await axios.get('https://localhost:3000/proyectos', config)
    posts.value = res.data;
};

onMounted(() => {
    getInfo();
});
</script>