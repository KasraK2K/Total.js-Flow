async function seed(knex) {
  // Deletes ALL existing entries
  await knex("categories").del();

  // Inserts seed entries
  await knex("categories").insert([
    {
      id: 1,
      parent_id: 0,
      name: "Uncategorized",
      description: "Default category when no category is not selected",
    },
  ]);
}

module.exports = { seed };
