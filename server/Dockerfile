FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3001

COPY wait-for.sh .

RUN chmod +x wait-for.sh

CMD ["./wait-for.sh"]
