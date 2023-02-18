import fastify from "fastify";

const server = fastify()

server.listen({ port: 3000}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
