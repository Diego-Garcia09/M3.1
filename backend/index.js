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
const models = require('./models');
app.use(cors());
app.use(express.json());
app.use('/proyectos', routerProyecto);

app.get('/', (req, res) => {
    res.send('Hola mundo!!!');
});

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Access granted to protected route' });
});

async function encontrarUsuarioDB() {
    try {
        const usuarios = await models.Usuarios.findAll({
            where: {
                email: 'a1168334@uabc.edu.mx'
            }
        });
        return usuarios[0];
    } catch (error) {
        console.log("No se encontro el usuario");
    }
}

app.post('/login', (req, res) => {
    // Recibe token
    const { token } = req.body;
    async function verify() {
        try {
            // Verifica con Google que el token sea valido
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "731219036758-h0v2774tgla1fjmu78rl6n8u4ar3l4i2.apps.googleusercontent.com",
            });

            const payload = desencriptar(token);

            // Revisa en la BD si el usuario existe
            const usuario = await encontrarUsuarioDB();

            // Verifica que el email del usuario sea igual del token de Google y genera un token nuevo
            if (payload.email == usuario.email) {
                const tokenVerificado = generarToken(payload);
                console.log('\nToken generado: ', tokenVerificado);
                res.status(200).json({
                    message: "Verificado",
                    token: tokenVerificado
                });
            }
            else {
                res.status(200).json({
                    message: "No verificado",
                });
            }
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
    // Crea y devuelve el token con los atributos de interes
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