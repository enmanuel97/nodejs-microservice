FROM node:14
COPY . .
WORKDIR /.
RUN npm install
ENV PORT 3002
EXPOSE 3002
ENTRYPOINT ["npm", "start"]