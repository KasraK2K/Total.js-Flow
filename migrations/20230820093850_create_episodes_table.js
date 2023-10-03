async function up(knex) {
  return knex.raw(/* SQL */ `
        -- Create episode table
        CREATE TABLE IF NOT EXISTS episodes(
            id                	SERIAL PRIMARY KEY,

            owner_id            INTEGER      NOT NULL,
            owner_type          INTEGER      NOT NULL,              -- 0: User, 1: Admin

            category_id         INTEGER      NOT NULL DEFAULT 1,    -- I have to seed row 1 as uncategorized
            tag                 INTEGER[]    NOT NULL DEFAULT '{}',
            attachments         INTEGER[]    NOT NULL DEFAULT '{}',
        
            title        	    VARCHAR(50)  NOT NULL,
            description         VARCHAR(250) NOT NULL DEFAULT '',
            content             TEXT         NOT NULL DEFAULT '',

            video               VARCHAR(100),
            cover               VARCHAR(100),
            exam_id             INTEGER,
        
            is_archive        	BOOLEAN      DEFAULT FALSE,
        
            created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            archived_at       	TIMESTAMPTZ
        );
        
        -- Update updated_at
        CREATE TRIGGER set_timestamp
            BEFORE UPDATE
            ON "episodes"
            FOR EACH ROW
        EXECUTE PROCEDURE trg_timestamp();
        
        -- Create Index
        CREATE INDEX "episodes__is_archive" ON "episodes"("is_archive");
    `);
}

async function down(knex) {
  return knex.schema.dropTable("episodes");
}

module.exports = { up, down };
