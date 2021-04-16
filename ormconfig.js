console.log('process.env.DATABASE_URL: >>> ', process.env.DATABASE_URL);
module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "ssl": {
    rejectUnauthorized: false
  },
  "entities": [
    // "./src/modules/**/infra/typeorm/entities/*.ts"
    "./dist/modules/**/infra/typeorm/entities/*.js"
  ],
  "migrations": [
    // "./src/shared/infra/typeorm/migrations/*.ts"
    "./dist/shared/infra/typeorm/migrations/*.js"
  ],
  "cli": {
    // "migrationsDir": "./src/shared/infra/typeorm/migrations"
    "migrationsDir": "./dist/shared/infra/typeorm/migrations"
  }
}
