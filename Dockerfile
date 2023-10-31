FROM node:18.12.1

LABEL author="Craig Broughton"
LABEL author.email="CRBroughton@posteo.uk"

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm i -g pnpm && pnpm i

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 4000

CMD ["npm", "run", "dev"]