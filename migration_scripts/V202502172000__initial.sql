DO
$$
    BEGIN
        IF NOT EXISTS(SELECT * FROM pg_catalog.pg_roles WHERE rolname = 'usrsis') THEN
            CREATE USER usrsis;
        END IF;
    END
$$;

CREATE SCHEMA comum;

GRANT USAGE ON SCHEMA comum TO usrsis;