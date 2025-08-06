# Dockerfile for Giveaway Website. Chossing Node.js 18 Alpine as base image for a lightweight container.
FROM node:18-alpine

#Metadata for more information about the image
LABEL BaseImage="Node.js 18 Alpine"
LABEL org.opencontainers.image.title="Giveaway Website"               
LABEL org.opencontainers.image.description="Node.js application container for Giveaway Website"  
LABEL org.opencontainers.image.version="1.0"                           
LABEL org.opencontainers.image.authors="Karan Negi <knegi2003@gmail.com>"   
LABEL org.opencontainers.image.source="https://github.com/Karan-Negi-12/DevOps-Pipeline-Workflow"                          
LABEL org.opencontainers.image.created="2025-08-06T08:48"          

# Set the working directory inside the container. This is where the application code will be located and our commands will run.
WORKDIR /Giveaway-Website

#Copy code from the current directory to the container's working directory.
COPY . .

RUN npm install

#Expose port 3000 for node application
EXPOSE 3000
CMD ["npm", "start"]


