const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
  static: './public'
})

const port = process.env.PORT || 8000

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

server.use(middlewares)

server.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

server.use('/api', router)
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
  console.log(`Access your API at: http://localhost:${port}/api`)
})