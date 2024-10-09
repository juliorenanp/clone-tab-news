import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("Status info should be returned and valid from status page", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  console.log(responseBody);
  const { max_connections, opened_connections, version } =
    responseBody.dependencies.database;

  expect(max_connections).toBeDefined();
  expect(max_connections).toBeGreaterThan(99);

  expect(opened_connections).toBeDefined();
  expect(opened_connections).toEqual(1);

  expect(version).toBeDefined();
  expect(parseInt(version)).toBeGreaterThan(0);
});

// eslint-disable-next-line jest/expect-expect
test("SQL Injection test", async () => {
  await fetch(
    "http://localhost:3000/api/v1/status?databaseName='; SELECT PG_SLEEP(1); --",
  );
});
