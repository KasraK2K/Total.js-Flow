async function seed(knex) {
  // Deletes ALL existing entries
  await knex("roles").del();

  // Inserts seed entries
  await knex("roles").insert([
    {
      id: 1,
      name: "User",
      description: "Default roles for users",
      permissions: [],
    },
    {
      id: 2,
      name: "Admin",
      description: "Default roles for admins",
      permissions: [1, 2, 3, 4],
    },
  ]);
}

module.exports = { seed };
