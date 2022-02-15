const express = require('express')
const handlebars = require('express-handlebars')
const path=require('path')
const app = express()
app.use(express.static('public'))


const Contenedor = require('./contenedor');
const productosContenedor = new Contenedor('/data/productos.json')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'main.hbs',
        layoutDir: path.join(app.get( 'views'), 'layouts'),
        partialsDir: path.join(app.get( 'views'), 'partials')
    })
);

app.set('view ', './views')
app.set('view engine', '.hbs');

app.get('/form', async (req, res) =>{
    res.render('index')
})

app.post('/productos', async (req, res) =>{
    const newProducto = req.body; 
    console.log(newProducto)
    const idProductoNuevo = await productosContenedor.save(newProducto);
    res.redirect('/list-productos');
})


app.get('/list-productos', async (req, res) =>{
    const productos = await productosContenedor.getAll()
    res.render('views/vista',{
        productos : productos,
    })
})

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));