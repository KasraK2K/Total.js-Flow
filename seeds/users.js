async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      email: "kasra_k2k@yahoo.com",
      password: "$2a$07$r66gkFrxBP5L5/XSd4No4eY.Z/UGu.56F/neHhsLjAwydlPvUnocO", // 12345678
      verify_token: "fake-verify-token",
      is_verify: true,
    },
  ]);
}

module.exports = { seed };
