FROM node
COPY . /app
WORKDIR /app
RUN npm install
ENV PORT 3003
EXPOSE 3003
ENTRYPOINT ["npm", "start"]