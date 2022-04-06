import express from "express";

const app = express();

const api = express.Router();

app.use( '/api', api )

api.use(express.json())
api.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

let listaProductos = [];
let identificador

api.post('/productos/guardar', (req, res) => {
    if (listaProductos.length > 0 ) {
        identificador = listaProductos[listaProductos.length -1].id +1
        listaProductos.push({id: identificador, ...req.body})
        res.json(req.body)    
    } else {
        identificador = 1
        listaProductos.push({id: identificador, ...req.body})
        res.json(req.body)    
    }

})

api.get('/productos', (req, res) => {
    res.json(listaProductos)
})

api.get( '/productos/:id', (req, res) => {
    const { id } = req.params
    let prod = listaProductos.find(element => element.id == id)

    if (prod) {
        res.json(prod)
    } else {
        res.json(`El producto con el id: ${id} no existe`)
    }

} )


api.delete( '/productos/:id', (req, res) => {

    const { id } = req.params

    if (listaProductos.find(element => element.id == id)) {
        
        listaProductos = listaProductos.filter(element => element.id != id)
    
        res.json(listaProductos)
        
    } else {
        res.json(`El producto con el id: ${id} no existe`)        
    }
})


api.put( '/productos/:id', (req, res) => {

    const {id} = req.params

    if (listaProductos.find(element => element.id == id)) {
        const prodMod = req.body
    
        listaProductos = listaProductos.filter(element => element.id != id)
    
        console.log(listaProductos);
        console.log(prodMod);
    
        listaProductos.push({id:id, ...prodMod})
    
        res.json(listaProductos)    
    } else {
        res.json(`El producto con el id: ${id} no existe`)        
    }
})

/* Server Listen */
const PORT = 8080;

const server = app.listen( PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})

server.on( 'error', error => console.log(`Error en el servidor ${error}`));