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
        nav() {
            this.$router.push('/about');
        },
        async handleGoogleResponse(response) {
            console.log(response.credential);
            try {
                const res = await axios.post('https://localhost:3000/login', {
                    token: response.credential,
                });
                console.log('Respuesta del backend:', res.data);
                if (res.data.message == 'Verificado') {
                    // this.nav();
                    // console.log("Verificado");
                    // console.log(res.data.token);
                    const config = {
                        headers: { Authorization: `Bearer ${res.data.token}` }
                    };
                    console.log(config);
                    const contenidoProtegido = await axios.get('https://localhost:3000/protected',
                    config);
                    console.log(contenidoProtegido.data.message);
                    this.$router.push(`/inicio?token=${res.data.token}`);
                }
                else {
                    console.log("error");
                }
                // this.nav();
            } catch (error) {
                console.error('Error al enviar el token al backend:', error);
            }
        },
    },
};
</script>