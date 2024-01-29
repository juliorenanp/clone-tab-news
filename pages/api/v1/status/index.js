import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const maxConnections = await database.query(
    "SELECT * FROM pg_settings WHERE name = 'max_connections';",
  );

  const postgresVersion = await database.query("SHOW server_version;");

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query(
    `SELECT count(*)::int FROM pg_stat_activity where datname = '${databaseName}';`,
  );

  console.log(databaseOpenedConnectionsResult.rows[0].count);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(maxConnections.rows[0].setting),
        opened_connections: databaseOpenedConnectionsResult.rows[0].count,
        version: postgresVersion.rows[0].server_version,
      },
    },
  });
}

export default status;
