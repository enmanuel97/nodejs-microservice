FROM node
COPY . .
WORKDIR .
RUN npm install
ENV PORT 3000
EXPOSE 3000
ENTRYPOINT ["npm", "start"]