FROM node:16.14-alpine
EXPOSE 3000
WORKDIR /app-frontend
COPY . .
RUN npm install --silent
ENTRYPOINT ["npm", "start"]
