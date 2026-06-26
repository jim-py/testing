# ---- build stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# если у тебя TS backend:
RUN npm run build

# ---- production stage ----
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/index.js"]