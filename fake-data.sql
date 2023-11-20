-- Adminer 4.8.1 PostgreSQL 16.0 (Debian 16.0-1.pgdg120+1) dump

DROP TABLE IF EXISTS "case_steps";
DROP SEQUENCE IF EXISTS case_steps_step_id_seq;
CREATE SEQUENCE case_steps_step_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."case_steps"
(
  "step_id" integer DEFAULT nextval('case_steps_step_id_seq') NOT NULL,
  "data"    text                                              NOT NULL,
  "case_id" integer                                           NOT NULL,
  "flow_id" integer                                           NOT NULL,
  CONSTRAINT "PK_4a6f4cea8874ccb390c45394967" PRIMARY KEY ("step_id")
) WITH (oids = false);

INSERT INTO "case_steps" ("step_id", "data", "case_id", "flow_id")
VALUES (876790542, '{}', 876790545, 876790543),
       (876790544, '{}', 876790545, 876790545),
       (876790546, '{"save_zone": "digital", "digital_type": "kis"}', 876790545, 876790547),
       (876790548, '{"save_zone": "digital", "digital_type": "excel"}', 876790545, 876790549),
       (876790551, '{"save_zone": "papier-form"}', 876790545, 876790554),
       (876792554, '{"save_zone": "formula"}', 876790545, 876792555);

DROP TABLE IF EXISTS "cases";
DROP SEQUENCE IF EXISTS cases_case_id_seq;
CREATE SEQUENCE cases_case_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."cases"
(
  "case_id"    integer DEFAULT nextval('cases_case_id_seq') NOT NULL,
  "date"       date                                         NOT NULL,
  "arrived_by" character varying                            NOT NULL,
  "pat_id"     integer,
  CONSTRAINT "PK_b8dcf802997909e8a6c413bf8d6" PRIMARY KEY ("case_id")
) WITH (oids = false);

INSERT INTO "cases" ("case_id", "date", "arrived_by", "pat_id")
VALUES (876792113, '2023-08-29', 'car', 876792114),
       (876792115, '2023-08-29', 'ambulance', 876792114),
       (876792123, '2023-03-09', 'car', 876792116),
       (876790545, '2023-06-09', 'Feet', 876792114);

DROP VIEW IF EXISTS "flow_case_step_views";
CREATE TABLE "flow_case_step_views"
(
  "data"               text,
  "case_id"            integer,
  "flow_id"            integer,
  "flow_name"          character varying(50),
  "type_name"          character varying(50),
  "type_personal_name" character varying(50),
  "pat_id"             integer
);


DROP TABLE IF EXISTS "flow_chart_elements";
DROP SEQUENCE IF EXISTS flow_chart_elements_flow_id_seq;
CREATE SEQUENCE flow_chart_elements_flow_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."flow_chart_elements"
(
  "flow_id" integer DEFAULT nextval('flow_chart_elements_flow_id_seq') NOT NULL,
  "name"    character varying(50)                                      NOT NULL,
  "type_id" integer,
  CONSTRAINT "PK_1c3c642ff3a250dedd9c2159be3" PRIMARY KEY ("flow_id")
) WITH (oids = false);

INSERT INTO "flow_chart_elements" ("flow_id", "name", "type_id")
VALUES (876790543, 'Self arrival', 876792124),
       (876792125, 'Ambulance arrival', 876792124),
       (276792125, 'Arrival by helicopter', 876792124),
       (876790554, 'Patient registration', 573392125),
       (876792555, 'After registration data save', 573392126),
       (876790549, 'Treatment', 573392127),
       (876790545, 'Patient first Observation', 573392128),
       (876790547, 'Patient second observation', 573392128);

DROP TABLE IF EXISTS "flow_edges";
DROP SEQUENCE IF EXISTS flow_edges_edge_id_seq;
CREATE SEQUENCE flow_edges_edge_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."flow_edges"
(
  "edge_id"       integer DEFAULT nextval('flow_edges_edge_id_seq') NOT NULL,
  "name"          character varying(50)                             NOT NULL,
  "start_node_id" integer,
  "end_node_id"   integer,
  CONSTRAINT "PK_4455f5d98ef7ecaa74a15740e5c" PRIMARY KEY ("edge_id")
) WITH (oids = false);

INSERT INTO "flow_edges" ("edge_id", "name", "start_node_id", "end_node_id")
VALUES (573392129, 'To registration', 876790543, 876790554),
       (573392132, 'To registration', 276792125, 876790554),
       (573392134, 'To data save', 876790554, 876792555),
       (573392135, 'To first observation', 876792555, 876790545),
       (573392136, 'To fast registration', 876792125, 876790545),
       (571339213, 'Need more dedicated analysis', 876790545, 876790547),
       (571309311, 'Can treat', 876790547, 876790549),
       (571309315, 'Can treat simply', 876790545, 876790549);

DROP TABLE IF EXISTS "flow_element_types";
DROP SEQUENCE IF EXISTS flow_element_types_type_id_seq;
CREATE SEQUENCE flow_element_types_type_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."flow_element_types"
(
  "type_id"       integer DEFAULT nextval('flow_element_types_type_id_seq') NOT NULL,
  "name"          character varying(50)                                     NOT NULL,
  "personal_name" character varying(50)                                     NOT NULL,
  CONSTRAINT "PK_90f4912d596fa06b5ed50513f0b" PRIMARY KEY ("type_id")
) WITH (oids = false);

INSERT INTO "flow_element_types" ("type_id", "name", "personal_name")
VALUES (876792124, 'Arrival', ''),
       (573392125, 'Registration', 'Secretary'),
       (573392126, 'Data saving', ''),
       (573392128, 'Observation', 'Doctor'),
       (573392127, 'Treatment', '');

DROP TABLE IF EXISTS "patients";
DROP SEQUENCE IF EXISTS patients_pat_id_seq;
CREATE SEQUENCE patients_pat_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."patients"
(
  "pat_id"    integer DEFAULT nextval('patients_pat_id_seq') NOT NULL,
  "id_number" character varying                              NOT NULL,
  CONSTRAINT "PK_109c6d622a2f6740a3e6c4b2ef5" PRIMARY KEY ("pat_id")
) WITH (oids = false);

INSERT INTO "patients" ("pat_id", "id_number")
VALUES (876792114, '123456789'),
       (876792116, '987654321');

DROP TABLE IF EXISTS "typeorm_metadata";
CREATE TABLE "public"."typeorm_metadata"
(
  "type"     character varying NOT NULL,
  "database" character varying,
  "schema"   character varying,
  "table"    character varying,
  "name"     character varying,
  "value"    text
) WITH (oids = false);

INSERT INTO "typeorm_metadata" ("type", "database", "schema", "table", "name", "value")
VALUES ('VIEW', NULL, 'public', NULL, 'flow_case_step_views', 'SELECT cs.data,
             cs.case_id,
             f.flow_id,
             f.name          AS flow_name,
             t.name          AS type_name,
             t.personal_name AS type_personal_name,
             c.pat_id
      FROM case_steps cs
               LEFT JOIN flow_chart_elements f ON f.flow_id = cs.flow_id
               LEFT JOIN flow_element_types t ON t.type_id = f.type_id
               LEFT JOIN cases c ON c.case_id = cs.case_id;');

ALTER TABLE ONLY "public"."case_steps"
  ADD CONSTRAINT "FK_a307648116e63cca3eb3a326034" FOREIGN KEY (case_id) REFERENCES cases (case_id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."case_steps"
  ADD CONSTRAINT "FK_f081c7cd18098825b521853b8ed" FOREIGN KEY (flow_id) REFERENCES flow_chart_elements (flow_id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."cases"
  ADD CONSTRAINT "FK_afa746e280cfb58511ae1470956" FOREIGN KEY (pat_id) REFERENCES patients (pat_id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."flow_chart_elements"
  ADD CONSTRAINT "FK_88f320ddd43ebf0d2eda7a24663" FOREIGN KEY (type_id) REFERENCES flow_element_types (type_id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."flow_edges"
  ADD CONSTRAINT "FK_7c4fc165416f0d2f3b2f95d64e5" FOREIGN KEY (end_node_id) REFERENCES flow_chart_elements (flow_id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."flow_edges"
  ADD CONSTRAINT "FK_ce94c87ca1f566079a3babe2e08" FOREIGN KEY (start_node_id) REFERENCES flow_chart_elements (flow_id) NOT DEFERRABLE;

DROP TABLE IF EXISTS "flow_case_step_views";
CREATE VIEW "flow_case_step_views" AS
SELECT cs.data,
       cs.case_id,
       f.flow_id,
       f.name          AS flow_name,
       t.name          AS type_name,
       t.personal_name AS type_personal_name,
       c.pat_id
FROM (((case_steps cs
  LEFT JOIN flow_chart_elements f ON ((f.flow_id = cs.flow_id)))
  LEFT JOIN flow_element_types t ON ((t.type_id = f.type_id)))
  LEFT JOIN cases c ON ((c.case_id = cs.case_id)));

-- 2023-11-19 23:58:55.183252+00
