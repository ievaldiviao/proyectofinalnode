import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose'

const app = express();
//const uri = 'mongodb://localhost:27017/proyectofinalnode';
const uri = 'mongodb+srv://root:jzEY60q70Tc2Fzui@cluster0.lfmrb.mongodb.net/proyectofinalnode?retryWrites=true&w=majority'

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

// Conexion a MongoDB
mongoose.connect(uri, options).then(
    ()=>{
        console.log('Conectado con MongoDB');
    },
    err =>{
        err
    }
)

// Middleware
app.use(morgan('tiny'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', function(req, res){
    res.send('Hola Mundo');
});

app.use('/api', require('./routes/nota'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000)
app.listen(app.get('puerto'), () => {
    console.log('Puerto Escuchando: '+ app.get('puerto'));
});