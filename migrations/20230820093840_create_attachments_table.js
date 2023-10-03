async function up(knex) {
  return knex.raw(/* SQL */ `
        -- Create attachments table
        CREATE TABLE IF NOT EXISTS attachments(
            id                	SERIAL PRIMARY KEY,
            user_id             INTEGER      NOT NULL,
            
            name        	    VARCHAR(100) NOT NULL,
            description         VARCHAR(250) NOT NULL DEFAULT '',
            format              VARCHAR(10)  NOT NULL,
            type                INTEGER      NOT NULL DEFAULT 0,
            url                 VARCHAR(150) NOT NULL,
        
            is_approved         BOOLEAN      DEFAULT FALSE,
        
            created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            archived_at       	TIMESTAMPTZ
        );
        
        -- Update updated_at
        CREATE TRIGGER set_timestamp
            BEFORE UPDATE
            ON "attachments"
            FOR EACH ROW
        EXECUTE PROCEDURE trg_timestamp();
        
        -- Create Index
        CREATE INDEX "attachments__user_id" ON "attachments"("user_id");
    `);
}

async function down(knex) {
  return knex.schema.dropTable("attachments");
}

module.exports = { up, down };
