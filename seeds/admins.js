async function seed(knex) {
  // Deletes ALL existing entries
  await knex("admins").del();

  // Inserts seed entries
  await knex("admins").insert([
    {
      id: 1,
      email: "kasra.karami.kk@gmail.com",
      password: "$2a$07$r66gkFrxBP5L5/XSd4No4eY.Z/UGu.56F/neHhsLjAwydlPvUnocO", // 12345678
      is_superuser: true,
    },
  ]);
}

module.exports = { seed };
