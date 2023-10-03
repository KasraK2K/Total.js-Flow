const ModuleNumber = {
  USER: 0,
  ADMIN: 1,
};

async function seed(knex) {
  // Deletes ALL existing entries
  await knex("permissions").del();

  // Inserts seed entries
  await knex("permissions").insert([
    {
      id: 1,
      name: "Users List",
      description: "Get list of all users",
      module: ModuleNumber.USER,
      access: 1001,
    },
    {
      id: 2,
      name: "Create User",
      description: "Insert new user",
      module: ModuleNumber.USER,
      access: 1002,
    },
    {
      id: 3,
      name: "Admins List",
      description: "Get list of all users",
      module: ModuleNumber.ADMIN,
      access: 1003,
    },
    {
      id: 4,
      name: "Create Admins",
      description: "Insert new user",
      module: ModuleNumber.ADMIN,
      access: 1004,
    },
  ]);
}

module.exports = { seed };
