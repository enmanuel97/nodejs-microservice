FROM node
COPY . .
WORKDIR .
RUN npm install
ENV PORT 3003
EXPOSE 3003
ENTRYPOINT ["npm", "start"]