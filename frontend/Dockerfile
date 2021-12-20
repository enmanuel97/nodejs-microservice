FROM node:14
COPY . .
WORKDIR /.
RUN npm install
ENV PORT 3000
EXPOSE 3000
ENTRYPOINT ["npm", "start"]