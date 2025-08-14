const compose = `
# life.compose.yml
version: '3.8'

services:
  work:
    image: mu-yasir/developer:latest
    container_name: career
    ports:
      - "career:2025"
      - "growth:continuous"
    environment:
      - PASSION=programming
      - COMMITMENT=high
      - LEARNING=always
    depends_on:
      - coffee
      - motivation
    restart: unless-stopped
    volumes:
      - ./projects:/workspace
      - ./knowledge:/learning
    networks:
      - professional

  coffee:
    image: arabica:premium
    container_name: fuel
    restart: always
    environment:
      - STRENGTH=strong
      - FREQUENCY=hourly
    healthcheck:
      test: ["CMD", "check-caffeine-level"]
      interval: 30m

  hobbies:
    image: creative-lab:latest
    container_name: personal-projects
    volumes:
      - ./ideas:/innovation
      - ./experiments:/playground
    environment:
      - CREATIVITY=unlimited
      - TIME=weekends
    networks:
      - personal

  learning:
    image: knowledge-base:latest
    container_name: continuous-education
    volumes:
      - ./courses:/education
      - ./books:/library
      - ./tutorials:/practice
    environment:
      - CURIOSITY=maximum
      - RETENTION=high
    restart: always

  motivation:
    image: inspiration:daily
    container_name: drive
    environment:
      - SOURCE=problem-solving
      - FUEL=user-impact
      - BOOST=team-success
    restart: always

networks:
  professional:
    driver: bridge
  personal:
    driver: bridge

volumes:
  knowledge:
  experience:
  achievements:
`
export default compose