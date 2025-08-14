const stacks = `
# stack.yaml
frontend:
  frameworks:
    - React 19
    - Next.js 15
    - Vite
  styling:
    - TailwindCSS
    - shadcn/ui
    - Framer Motion
  languages:
    - TypeScript
    - JavaScript

backend:
  languages:
    - Go
    - Node.js
  frameworks:
    - Gin
    - Express.js
  tools:
    - Docker

databases:
  sql:
    - PostgreSQL
  nosql:
    - MongoDB
    - Redis
  orm:
    - pgx (Go)
    - Prisma (Node.js)

tools:
  development:
    - VSCode
    - Git & GitHub
    - Postman
`

export default stacks