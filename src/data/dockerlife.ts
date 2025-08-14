const dockerlife = `
# life.dockerfile
FROM human:1998

LABEL name="Muhamad Yasir" \\
      role="Fullstack Developer" \\
      location="Jakarta, Indonesia" \\
      version="2025.1.0"

# Install essential packages
RUN apt-get update && apt-get install -y \\
    curiosity \\
    persistence \\
    problem-solving \\
    humor \\
    coffee-addiction \\
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /life

# Copy skills and knowledge
COPY skills/frontend ./skills/frontend
COPY skills/backend ./skills/backend
COPY skills/devops ./skills/devops
COPY habits/learning ./habits/learning
COPY habits/coding ./habits/coding

# Install dependencies
RUN npm install experience@year
RUN go mod download github.com/passion/programming

# Set environment variables
ENV FAVORITE_LANGUAGE=Go
ENV FAVORITE_FRONTEND=React
ENV COFFEE_LEVEL=maximum
ENV DEBUG_MODE=always_on

# Expose ports for communication
EXPOSE 3000 8080 22

# Health check
HEALTHCHECK --interval=1d --timeout=30s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Default command
CMD ["code", "--life", "--passion", "--continuous-learning"]
`

export default dockerlife