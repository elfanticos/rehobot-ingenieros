CREATE DATABASE "rehobotIngenieros"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE public.project
(
    project_id serial NOT NULL,
    name character varying(120) NOT NULL,
    address character varying(200),
    duration character varying(50) NOT NULL,
    person_id_register integer,
    date_register timestamp without time zone,
    PRIMARY KEY (project_id)
);

CREATE TABLE public.client
(
    client_id integer NOT NULL DEFAULT nextval('client_client_id_seq'::regclass),
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    address character varying(250) COLLATE pg_catalog."default" NOT NULL,
    ruc character varying(17) COLLATE pg_catalog."default" NOT NULL,
    person_id_register integer,
    date_register timestamp without time zone,
    CONSTRAINT client_pkey PRIMARY KEY (client_id)
)

TABLESPACE pg_default;

CREATE TABLE public.person
(
    person_id serial NOT NULL,
    name character varying(120) NOT NULL,
    last_name character varying(120) NOT NULL,
    active boolean NOT NULL DEFAULT true,
    "user" character varying(20),
    password character varying(16),
    PRIMARY KEY (person_id)
);

CREATE TABLE public.project_x_client
(
    project_x_client_id serial NOT NULL,
    _project_id integer NOT NULL,
    _client_id integer NOT NULL,
    person_id_register integer,
    date_register timestamp without time zone,
    CONSTRAINT project_x_client_pkey PRIMARY KEY (project_x_client_id),
    CONSTRAINT "FK__client__client_id" FOREIGN KEY (_client_id)
        REFERENCES public.client (client_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK__project__project_id" FOREIGN KEY (_project_id)
        REFERENCES public.project (project_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE public.monitoring_x_project
(
    monitoring_x_project_id serial NOT NULL,
    _project_x_client_id integer NOT NULL,
    type character varying(5) NOT NULL,
    description character varying(250),
    state character varying(5) NOT NULL,
    solution character varying(250) COLLATE pg_catalog."default",
    date_response timestamp without time zone,
    person_id_register integer,
    date_register timestamp without time zone,
    PRIMARY KEY (monitoring_x_project_id),
    CONSTRAINT "FK__project_x_client__project_x_client_id" FOREIGN KEY (_project_x_client_id)
        REFERENCES public.project_x_client (project_x_client_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.role
(
    role_id serial NOT NULL,
    name character varying(60) NOT NULL,
    active boolean NOT NULL DEFAULT true,
    PRIMARY KEY (role_id)
);

INSERT INTO ROLE
(name)
VALUES
('Administrador'),
('Gerente'),
('Supervidor');

CREATE TABLE public.role_x_person
(
    _person_id integer NOT NULL,
    _role_id integer NOT NULL,
    active boolean DEFAULT true,
    PRIMARY KEY (_person_id, _role_id),
    CONSTRAINT "FK__person___person_id" FOREIGN KEY (_person_id)
        REFERENCES public.person (person_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "FK__role___rol_id" FOREIGN KEY (_role_id)
        REFERENCES public.role (role_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);