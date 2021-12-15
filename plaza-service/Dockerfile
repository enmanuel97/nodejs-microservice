FROM node
COPY . /app
WORKDIR /app
RUN npm install
ENV PORT 3002
EXPOSE 3002
ENTRYPOINT ["npm", "start"]