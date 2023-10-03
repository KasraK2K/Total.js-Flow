async function up(knex) {
  return knex.raw(/* SQL */ `
        -- Create categories table
        CREATE TABLE IF NOT EXISTS categories(
            id                	SERIAL PRIMARY KEY,
            parent_id           INTEGER      NOT NULL DEFAULT 0,
            
            name        	    VARCHAR(50)  NOT NULL,
            description         VARCHAR(250) NOT NULL DEFAULT '',
        
            is_archive        	BOOLEAN      DEFAULT FALSE,
        
            created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            archived_at       	TIMESTAMPTZ
        );
        
        -- Update updated_at
        CREATE TRIGGER set_timestamp
            BEFORE UPDATE
            ON "categories"
            FOR EACH ROW
        EXECUTE PROCEDURE trg_timestamp();
        
        -- Create Index
        CREATE INDEX "categories__parent_id" ON "categories"("parent_id");
        CREATE INDEX "categories__is_archive" ON "categories"("is_archive");
    `);
}

async function down(knex) {
  return knex.schema.dropTable("categories");
}

module.exports = { up, down };
