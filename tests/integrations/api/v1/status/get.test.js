test("Status info should be returned and valid from status page", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  const { max_connections, opened_connections, version } =
    responseBody.dependencies.database;

  expect(max_connections).toBeDefined();
  expect(max_connections).toBeGreaterThan(0);

  expect(opened_connections).toBeDefined();
  expect(opened_connections).toBeGreaterThan(-1);

  expect(version).toBeDefined();
  expect(parseInt(version)).toBeGreaterThan(0);
});