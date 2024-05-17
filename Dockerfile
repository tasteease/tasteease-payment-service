FROM node:20-slim AS base

RUN adduser --system --group nonroot && mkdir -p /home/nonroot/.cache && chown -R nonroot:nonroot /home/nonroot

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV XDG_CACHE_HOME="/home/nonroot/.cache"
RUN corepack enable
COPY . /app
WORKDIR /app

ARG CLEAN_NEST_MONGO_CONNECTION_STRING

ENV CLEAN_NEST_MONGO_CONNECTION_STRING=$CLEAN_NEST_MONGO_CONNECTION_STRING

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
RUN chown -R nonroot:nonroot /app

EXPOSE 3000
USER nonroot
CMD [ "pnpm", "start" ]