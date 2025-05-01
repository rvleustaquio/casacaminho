CREATE TYPE comum.ENUM_TIPO_PESSOA AS ENUM ('F','J','O');

CREATE TABLE comum.estado_civil
(
    created_by VARCHAR(50)                            NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by VARCHAR(50)                            NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by VARCHAR(50)                            NULL,
    deleted_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id         SERIAL PRIMARY KEY,
    descricao  TEXT                                   NOT NULL,
    CONSTRAINT estado_civil_ukey UNIQUE (descricao)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.estado_civil TO usrsis;

CREATE TABLE comum.pessoas
(
    created_by        VARCHAR(50)                            NOT NULL,
    created_at        TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by        VARCHAR(50)                            NOT NULL,
    updated_at        TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by        VARCHAR(50)                            NULL,
    deleted_at        TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id                SERIAL PRIMARY KEY,
    nome              VARCHAR(100)                           NOT NULL,
    tipo              comum.ENUM_TIPO_PESSOA                 NOT NULL,
    cpf_cnpj          VARCHAR(14)                            NULL,
    dt_nascimento     DATE                                   NOT NULL,
    rg                TEXT                                   NULL,
    id_estado_civil   INT REFERENCES comum.estado_civil      NOT NULL,
    id_pessoa_conjuge INT REFERENCES comum.pessoas           NULL,
    id_pessoa_mae     INT REFERENCES comum.pessoas           NOT NULL,
    logradouro        TEXT                                   NOT NULL,
    numero            TEXT                                   NULL,
    complemento       TEXT                                   NULL,
    bairro            TEXT                                   NOT NULL,
    CONSTRAINT pessoas_ukey UNIQUE NULLS NOT DISTINCT (cpf_cnpj)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.pessoas TO usrsis;

CREATE TABLE comum.sit_assistidos
(
    created_by VARCHAR(50)                            NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by VARCHAR(50)                            NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by VARCHAR(50)                            NULL,
    deleted_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id         SERIAL PRIMARY KEY,
    descricao  TEXT                                   NOT NULL,
    CONSTRAINT sit_assistidos_ukey UNIQUE (descricao)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.sit_assistidos TO usrsis;

CREATE TABLE comum.prazos
(
    created_by VARCHAR(50)                            NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by VARCHAR(50)                            NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by VARCHAR(50)                            NULL,
    deleted_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id         SERIAL PRIMARY KEY,
    meses      SMALLINT,
    CONSTRAINT prazos_ukey UNIQUE NULLS NOT DISTINCT (meses)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.prazos TO usrsis;

CREATE TABLE comum.assistidos
(
    created_by       VARCHAR(50)                            NOT NULL,
    created_at       TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by       VARCHAR(50)                            NOT NULL,
    updated_at       TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by       VARCHAR(50)                            NULL,
    deleted_at       TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id               SERIAL PRIMARY KEY,
    id_pessoa        INT REFERENCES comum.pessoas           NOT NULL,
    dt_matricula     DATE                                   NOT NULL,
    dt_inicio        DATE                                   NOT NULL,
    id_sit_assistido INT REFERENCES comum.sit_assistidos    NOT NULL,
    id_prazo         INT REFERENCES comum.prazos            NOT NULL,
    CONSTRAINT assistidos_ukey UNIQUE NULLS NOT DISTINCT (id_pessoa)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.assistidos TO usrsis;