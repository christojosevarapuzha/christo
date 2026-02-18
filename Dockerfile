# Use official lightweight Java 17 image
FROM eclipse-temurin:17-jdk-jammy

# Set working directory inside container
WORKDIR /app

# Copy Maven wrapper and pom.xml first (better caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Give execute permission
RUN chmod +x mvnw

# Download dependencies (faster future builds)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port (Render will override using PORT env variable)
EXPOSE 8080

# Start Spring Boot application
CMD ["sh", "-c", "java -jar target/*.jar --server.port=${PORT:-8080}"]
