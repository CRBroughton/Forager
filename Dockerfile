FROM alpine:latest

ARG FORAGER_VERSION=2.0.1

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip Forager
ADD https://github.com/CRBroughton/forager/releases/download/${FORAGER_VERSION}/forager-${FORAGER_VERSION}-linux.zip /tmp/forager.zip

RUN unzip /tmp/forager.zip -d forager
RUN cd forager && mv forager-${FORAGER_VERSION}-linux forager
RUN rm -rf /tmp/forager/zip

EXPOSE 8080

# start Forager
CMD ["forager/forager", "serve", "--http=0.0.0.0:8090"]