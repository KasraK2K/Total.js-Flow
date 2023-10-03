async function up(knex) {
  return knex.raw(/* SQL */ `
        -- Create tags table
        CREATE TABLE IF NOT EXISTS tags(
            id                	SERIAL PRIMARY KEY,
            
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
            ON "tags"
            FOR EACH ROW
        EXECUTE PROCEDURE trg_timestamp();
        
        -- Create Index
        CREATE INDEX "tags__is_archive" ON "tags"("is_archive");
    `);
}

async function down(knex) {
  return knex.schema.dropTable("tags");
}

module.exports = { up, down };
