# S73-126-SCUBE-Full-Stack-With-Nextjs-And-AWS-Azure-Tracker-Portal-Team-04

## Understanding Cloud Deployments: Docker → CI/CD → AWS

In this task, I explored how a full-stack Next.js application
can be prepared and deployed to the cloud using modern DevOps practices.

### Docker
The application was containerized using Docker. A Dockerfile
was created to define the runtime environment, install dependencies,
build the project, and expose the application on port 3000.
This ensures consistency across development and production environments.

### CI/CD with GitHub Actions
A CI pipeline was configured using GitHub Actions. On every push
to the 2.5 branch, the pipeline installs dependencies and builds
the application automatically. This helps catch errors early
and ensures reliable deployments.

### Cloud Deployment (AWS)
The Dockerized application can be deployed to AWS using services
like EC2 or Elastic Beanstalk. Environment variables and secrets
are managed securely using GitHub Secrets and cloud configuration.

### Reflection
The most challenging part was understanding how Docker, CI/CD,
and cloud services work together. Containerization worked well,
and automation improved reliability. In future deployments,
I would add automated tests and infrastructure as code tools
like Terraform for better scalability.
