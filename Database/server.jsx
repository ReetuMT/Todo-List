const jsonserver =require('json-server')
const server=jsonserver.create()
const router =jsonserver.router('db.json')
const middleware=jsonserver.defaults()

server.use(middleware)

server.get('/echo',(req,res)=>{
    res.jsonp(req.query)
})

server.use(jsonserver.bodyParser)
server.use((req, res,next)=>{
    if(req.method === "POST"){
    req.body.createdAt = Date.now()

}
next()
})

server.use(router)
server.listen(4000,()=>{
    console.log("JSON Server is running")
})