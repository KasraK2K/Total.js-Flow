async function up(knex) {
  return knex.raw(/* SQL */ `
        -- Create roles table
        CREATE TABLE IF NOT EXISTS roles(
            id                	SERIAL PRIMARY KEY,
            
            name        	    VARCHAR(50)  NOT NULL DEFAULT '',
            description         VARCHAR(250) NOT NULL DEFAULT '',
            permissions			INTEGER[]	     DEFAULT '{}',
        
            created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            archived_at       	TIMESTAMPTZ
        );
        
        -- Update updated_at
        CREATE TRIGGER set_timestamp
            BEFORE UPDATE
            ON "roles"
            FOR EACH ROW
        EXECUTE PROCEDURE trg_timestamp();
    `);
}

async function down(knex) {
  return knex.schema.dropTable("roles");
}

module.exports = { up, down };
