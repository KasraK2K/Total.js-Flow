async function up(knex) {
  return knex.raw(/* SQL */ `
        -- Create trigger function for update timestamp
        CREATE OR REPLACE FUNCTION public.trg_timestamp()
        RETURNS trigger
        LANGUAGE 'plpgsql'
        COST 100
        VOLATILE NOT LEAKPROOF
        AS $BODY$
        BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
        END;
        $BODY$;

        ALTER FUNCTION public.trg_timestamp()
        OWNER TO postgres;
    `);
}

async function down(knex) {
  return knex.raw(/* SQL */ `
        DROP FUNCTION public.trg_timestamp
    `);
}

module.exports = { up, down };
