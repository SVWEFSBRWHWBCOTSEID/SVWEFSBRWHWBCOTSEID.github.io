FROM rust:1.70.0

WORKDIR /app
COPY . .

RUN cargo build -p prisma-cli --release && \
    ./target/release/prisma-cli generate && \
    ./scripts/fix_prisma_str.sh && \
    cargo build --release

EXPOSE 8080
EXPOSE 5432
EXPOSE 6379

ENTRYPOINT ["./scripts/docker_commands.sh"]
