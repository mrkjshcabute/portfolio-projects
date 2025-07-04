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

// Add this root route - this fixes the "Cannot GET /" error
server.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`
  res.json({
    message: 'Portfolio Projects API is running! 🚀',
    author: 'Mark Josuah J. Cabute',
    description: 'Full-stack developer portfolio API featuring 10 diverse projects',
    stats: {
      total_projects: 10,
      technologies: ['React', 'Vue', 'Python', 'MongoDB', 'OpenCV', 'JavaScript', 'HTML/CSS'],
      project_types: ['Web Apps', 'APIs', 'AI/ML', 'Games', 'Landing Pages']
    },
    endpoints: {
      all_projects: `${baseUrl}/api/projects`,
      single_project: `${baseUrl}/api/projects/1`,
      filter_by_tech: `${baseUrl}/api/projects?toolNames_like=React`,
      search_by_name: `${baseUrl}/api/projects?name_like=JFlix`,
      health_check: `${baseUrl}/health`
    },
    featured_projects: [
      { id: 1, name: 'Dental Care System', tech: 'JavaScript + Materialize' },
      { id: 2, name: 'RDCHIME Inventory', tech: 'React + MongoDB' },
      { id: 3, name: 'JFlix Movie App', tech: 'React + TMDB API' }
    ],
    static_files: {
      images: `${baseUrl}/images/`,
      project_screenshots: 'All project desktop/mobile images available'
    },
    sample_queries: {
      react_projects: `${baseUrl}/api/projects?toolNames_like=React`,
      vue_projects: `${baseUrl}/api/projects?toolNames_like=Vue`,
      python_projects: `${baseUrl}/api/projects?toolNames_like=Python`,
      with_github: `${baseUrl}/api/projects?github_ne=`,
      with_live_demo: `${baseUrl}/api/projects?live_ne=`
    },
    timestamp: new Date().toISOString()
  })
})

server.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

server.use('/api', router)

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
  console.log(`Access your API at: http://localhost:${port}/api`)
  console.log(`Root endpoint: http://localhost:${port}/`)
})