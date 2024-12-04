FROM debian:bookworm-slim as builder

RUN apt update 
RUN apt install -y curl unzip
RUN curl -fsSL https://bun.sh/install | bash

FROM debian:bookworm-slim
COPY --from=builder /root/.bun/bin/bun /root/.bun/bin/
ENV PATH=/root/.bun/bin:$PATH

WORKDIR /nextjs

COPY . .

RUN bun install
RUN bun run build

CMD ["bun", "start"]