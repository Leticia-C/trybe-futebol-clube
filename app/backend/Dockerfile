FROM node:16.14-alpine
WORKDIR /app-backend
COPY . .
RUN npm install --silent
EXPOSE 3001
ENTRYPOINT ["npm", "run"]
CMD [ "start"]