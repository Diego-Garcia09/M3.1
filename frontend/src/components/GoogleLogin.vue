<template>
    <v-card title="Login" text="..." variant="tonal" elevation='8' max-width="344" class="mx-auto">
        <!-- <div> -->
        <GoogleLogin :callback="handleGoogleResponse" />
        <!-- </div> -->
    </v-card>
</template>
  
<script>
import axios from 'axios'
export default {
    methods: {
        async handleGoogleResponse(response) {
            // Response es el token recibido por Google
            console.log(response.credential);
            try {
                // Se envia el token al backend para su verificacion y generacion de token
                const res = await axios.post('https://localhost:3000/login', {
                    token: response.credential,
                });
                console.log('Respuesta del backend:', res.data);
                // Si el token esta verificado, se recibe el token generado mueve a otra ruta con el token
                if (res.data.message == 'Verificado') {
                    this.$router.push(`/inicio?token=${res.data.token}`);
                }
                else {
                    console.log("error");
                }
            } catch (error) {
                console.error('Error al enviar el token al backend:', error);
            }
        },
    },
};
</script>