const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const fs = require('fs');
const https = require('https');
const jwt = require('jsonwebtoken');
const passport = require('./passport');
const routerProyecto = require('./router/proyectos');

app.use(cors());
app.use(express.json());
app.use('/proyectos', routerProyecto);

app.get('/', (req, res) => {
    res.send('Hola mundo!!!');
});

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Access granted to protected route' });
});

app.post('/login', (req, res) => {
    const { token } = req.body;
    console.log('Token recibido en el backend:', token);
    async function verify() {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "731219036758-h0v2774tgla1fjmu78rl6n8u4ar3l4i2.apps.googleusercontent.com",
            });
            const payload = desencriptar(token);
            // console.log(payload);
            if (payload.email == 'a1168334@uabc.edu.mx') {
                const tokenVerificado = generarToken(payload);
                console.log('\nToken generado: ', tokenVerificado);
                res.status(200).json({
                    message: "Verificado",
                    token: tokenVerificado
                });
            }
            else
            {
                res.status(200).json({
                    message: "No verificado",
                });
            }
            // res.set('authorization', `Bearer ${token}`);
        } catch (error) {
            console.error('Error al verificar el token:', error);
            res.json({ message: 'Token invalido' });
        }
    }
    verify();
});

const desencriptar = function (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

const generarToken = function (payload) {
    const userData = {
        nombre: payload.name,
        email: payload.email,
        userId: payload.sub,
    }
    const token = jwt.sign(userData, 'secret', { expiresIn: '1d' });
    return token;
}

const llavePrivada = fs.readFileSync("server-key.pem");
const certificado = fs.readFileSync("server-cert.pem");
const credenciales = {
    key: llavePrivada,
    cert: certificado,
};

const httpsServer = https.createServer(credenciales, app);

httpsServer.listen(port, () => {
    console.log('Servidor https escuchando por el puerto: '.port);
}).on('error', err => {
    console.log('Error al iniciar el servidor: ', err);
});