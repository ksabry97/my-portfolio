# Multi-stage Angular SSR production image
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
COPY --from=build /app/dist/portfolio /app/dist/portfolio
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
EXPOSE 4000
CMD ["node", "dist/portfolio/server/server.mjs"]
