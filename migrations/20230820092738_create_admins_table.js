async function up(knex) {
  return knex.raw(/* SQL */ `
        -- Create admins table
        CREATE TABLE IF NOT EXISTS admins(
            id                	SERIAL PRIMARY KEY,
            
            first_name        	VARCHAR(50)  NOT NULL DEFAULT '',
            surname           	VARCHAR(50)  NOT NULL DEFAULT '',
            contact_number    	VARCHAR(50)  NOT NULL DEFAULT '',
            
            email             	VARCHAR(50)  NOT NULL UNIQUE,
            password          	VARCHAR(200) NOT NULL,
            last_token          VARCHAR(500) NOT NULL DEFAULT '',
        
            is_active         	BOOLEAN      DEFAULT TRUE,
            is_block        	BOOLEAN      DEFAULT FALSE,
            is_archive        	BOOLEAN      DEFAULT FALSE,
            is_superuser        BOOLEAN      DEFAULT FALSE,
            roles				INTEGER[]	 DEFAULT '{}',
        
            created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            archived_at       	TIMESTAMPTZ,
            last_login_at       TIMESTAMPTZ
        );

        -- Update updated_at
        CREATE TRIGGER set_timestamp
            BEFORE UPDATE
            ON "admins"
            FOR EACH ROW
        EXECUTE PROCEDURE trg_timestamp();

        -- Create Index
        CREATE INDEX "admins__email" ON "admins"("email");
        CREATE INDEX "admins__last_token" ON "admins"("last_token");
        CREATE INDEX "admins__is_archive" ON "admins"("is_archive");
    `);
}

async function down(knex) {
  return knex.schema.dropTable("admins");
}

module.exports = { up, down };
