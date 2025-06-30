CREATE TYPE comum.ENUM_TIPO_PESSOA AS ENUM ('F', 'J', 'O');

CREATE TABLE comum.estados_civis (
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by VARCHAR(50) NULL,
    deleted_at TIMESTAMP(0) NULL,
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    CONSTRAINT estados_civis_ukey UNIQUE (descricao)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.estados_civis TO usrsis;

CREATE TABLE comum.pessoas (
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by VARCHAR(50) NULL,
    deleted_at TIMESTAMP(0) NULL,
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo comum.ENUM_TIPO_PESSOA NOT NULL,
    cpf_cnpj VARCHAR(14) NULL,
    dt_nascimento DATE NOT NULL,
    rg TEXT NULL,
    id_estado_civil INT REFERENCES comum.estados_civis NOT NULL,
    id_pessoa_conjuge INT REFERENCES comum.pessoas NULL,
    id_pessoa_mae INT REFERENCES comum.pessoas NOT NULL,
    logradouro TEXT NULL,
    numero TEXT NULL,
    complemento TEXT NULL,
    bairro TEXT NULL,
    cep VARCHAR(10) NULL,
    cidade TEXT NULL,
    uf VARCHAR(2) NULL,
    referencia TEXT NULL,
    telefone TEXT NULL,
    celular TEXT NULL,
    CONSTRAINT pessoas_ukey UNIQUE NULLS NOT DISTINCT (cpf_cnpj)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.pessoas TO usrsis;

CREATE TABLE comum.sit_assistidos (
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by VARCHAR(50) NULL,
    deleted_at TIMESTAMP(0) NULL,
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT sit_assistidos_ukey UNIQUE (descricao)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.sit_assistidos TO usrsis;

INSERT INTO comum.sit_assistidos (created_by, created_at, updated_by, updated_at, descricao, ativo)
VALUES
    ('system', CURRENT_TIMESTAMP, 'system', CURRENT_TIMESTAMP, 'Ativo', TRUE);

CREATE TABLE comum.prazos (
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by VARCHAR(50) NULL,
    deleted_at TIMESTAMP(0) NULL,
    id SERIAL PRIMARY KEY,
    meses SMALLINT,
    CONSTRAINT prazos_ukey UNIQUE NULLS NOT DISTINCT (meses)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.prazos TO usrsis;

CREATE TABLE comum.assistidos (
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by VARCHAR(50) NULL,
    deleted_at TIMESTAMP(0) NULL,
    id SERIAL PRIMARY KEY,
    id_pessoa INT REFERENCES comum.pessoas NOT NULL,
    prontuario INT NOT NULL,
    dt_matricula DATE NOT NULL,
    id_prazo INT REFERENCES comum.prazos NULL,
    observacao TEXT NULL,
    CONSTRAINT assistidos_ukey UNIQUE NULLS NOT DISTINCT (id_pessoa)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.assistidos TO usrsis;

CREATE TABLE comum.assistidos_situacoes (
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by VARCHAR(50) NULL,
    deleted_at TIMESTAMP(0) NULL,
    id SERIAL PRIMARY KEY,
    id_assistido INT REFERENCES comum.assistidos NOT NULL,
    id_sit_assistido INT REFERENCES comum.sit_assistidos NOT NULL,
    dt_movimento DATE NOT NULL,
    observacao TEXT NULL
);

CREATE TABLE comum.servicos (
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by VARCHAR(50) NULL,
    deleted_at TIMESTAMP(0) NULL,
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    CONSTRAINT servicos_ukey UNIQUE (descricao)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.servicos TO usrsis;

CREATE TABLE comum.assistidos_servicos (
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_by VARCHAR(50) NULL,
    deleted_at TIMESTAMP(0) NULL,
    id SERIAL PRIMARY KEY,
    id_assistido INT REFERENCES comum.assistidos NOT NULL,
    id_servico INT REFERENCES comum.servicos NOT NULL,
    dt_inicio DATE NOT NULL,
    dt_fim DATE NULL,
    observacao TEXT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON comum.assistidos_servicos TO usrsis;