const noirReadme = `
# Noir - Movie Ticketing System

## Overview
A robust fullstack project for movie ticket booking with a focus on transactional safety and high performance. As frontend built with React + Vite for fast development and performance, as for backend built with Go and PostgreSQL to handle concurrent bookings reliably.

## Key Features
- **Movie Overview**: List of upcoming movies and now playing movie to stay up to date with movie trends
- **Seat Reservation**: Atomic seat booking with conflict resolution
- **Transaction Safety**: ACID compliance for all booking operations
- **High Performance**: Optimized queries and connection pooling
- **RESTful API**: Clean, well-documented endpoints

## Tech Stack
### Frontend:
- **Tools**: React 19 + Vite
- **State Management**: Redux toolkit
- **Form Validation**: react-hook-form, yup-resolvers
- **Route**: react-router-dom

### Backend:
- **Language**: Go 1.21
- **Framework**: Gin (HTTP router)
- **Database**: PostgreSQL with pgx driver
- **Testing**: Testify + database mocks
- **Deployment**: Docker + Docker Compose
- **Documentation**: Swagger/OpenAPI

## Links
- **GitHub**: [github.com/yasirmaxstyle/noir-ticketing-project-react](https://github.com/yasirmaxstyle/noir-ticketing-project-react)
- **Live Preview**: [noir-chi.vercel.app](https://noir-chi.vercel.app/)
`

export default noirReadme