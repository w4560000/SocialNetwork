-- Table: public.test

-- DROP TABLE IF EXISTS public."test";

CREATE TABLE IF NOT EXISTS public."test"
(
    "testid" integer NOT NULL,
    "testname" character varying COLLATE pg_catalog."default",
    CONSTRAINT "test_pkey" PRIMARY KEY ("testid")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."test"
    OWNER to superuser;

INSERT INTO public.test
SELECT 1, 'test' UNION
SELECT 2, 'qqq'