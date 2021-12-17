FROM node
COPY . .
WORKDIR .
RUN npm install
ENV PORT 3004
EXPOSE 3004
ENTRYPOINT ["npm", "start"]