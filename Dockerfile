FROM node:20-alpine AS ui-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY backend/ ./backend/

COPY --from=ui-build /app/frontend/build ./frontend/build

ENV PORT 3000

EXPOSE $PORT

CMD ["npm", "start"]