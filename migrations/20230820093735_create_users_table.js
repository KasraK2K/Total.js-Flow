async function up(knex) {
  return knex.raw(/* SQL */ `
        -- Create users table
        CREATE TABLE IF NOT EXISTS users(
            id                	SERIAL PRIMARY KEY,
            
            first_name        	VARCHAR(50)  NOT NULL DEFAULT '',
            surname           	VARCHAR(50)  NOT NULL DEFAULT '',
            contact_number    	VARCHAR(50)  NOT NULL DEFAULT '',
            
            email             	VARCHAR(50)  NOT NULL UNIQUE,
            password          	VARCHAR(200) NOT NULL,
            last_token          VARCHAR(500) NOT NULL DEFAULT '',
            verify_token        VARCHAR(50)  NOT NULL,
        
            is_active         	BOOLEAN      DEFAULT TRUE,
            is_verify       	BOOLEAN      DEFAULT FALSE,
            is_block        	BOOLEAN      DEFAULT FALSE,
            is_archive        	BOOLEAN      DEFAULT FALSE,
            roles				INTEGER[]	     DEFAULT '{1}',
        
            created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            archived_at       	TIMESTAMPTZ,
            last_login_at       TIMESTAMPTZ
        );
        
        -- Update updated_at
        CREATE TRIGGER set_timestamp
            BEFORE UPDATE
            ON "users"
            FOR EACH ROW
        EXECUTE PROCEDURE trg_timestamp();
        
        -- Create Index
        CREATE INDEX "users__email" ON "users"("email");
        CREATE INDEX "users__last_token" ON "users"("last_token");
        CREATE INDEX "users__is_archive" ON "users"("is_archive");
    `);
}

async function down(knex) {
  return knex.schema.dropTable("users");
}

module.exports = { up, down };
