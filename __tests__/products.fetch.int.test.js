const http = require("http");
const app = require("../src/index");
const state = require("../src/state");

let server;
let baseUrl;

beforeAll((done) => {
  // Écoute sur un port éphémère (0) pour éviter les conflits
  server = http.createServer(app).listen(0, () => {
    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

beforeEach(() => state.reset());

test("[Integration] GET /products retourne le seed trié par id (sans supertest)", async () => {
  const res = await fetch(`${baseUrl}/products`);
  expect(res.ok).toBe(true);
  expect(res.status).toBe(200);

  const body = await res.json();
  expect(body).toEqual([
    { id: 1, name: "T-shirt", price: 20 },
    { id: 2, name: "Mug", price: 10 },
  ]);
});
