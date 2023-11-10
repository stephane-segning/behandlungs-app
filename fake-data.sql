-- Adminer 4.8.1 PostgreSQL 16.0 (Debian 16.0-1.pgdg120+1) dump

\connect "kis";

DROP TABLE IF EXISTS "case_steps";
CREATE TABLE "public"."case_steps"
(
    "step_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "data"    text                            NOT NULL,
    "case_id" uuid                            NOT NULL,
    "flow_id" uuid                            NOT NULL,
    CONSTRAINT "PK_4a6f4cea8874ccb390c45394967" PRIMARY KEY ("step_id")
) WITH (oids = false);

INSERT INTO "case_steps" ("step_id", "data", "case_id", "flow_id")
VALUES ('9643f767-dcc6-46de-af31-cd92fa3996f9', '{}', '47562302-7ba3-41e1-8716-d8d24171ec79',
        '8206ec19-fd58-4e4f-a3d9-6ae9d9933b52'),
       ('f81f25d9-c9a1-43da-aa0e-56f13b7ee234', '{}', '47562302-7ba3-41e1-8716-d8d24171ec79',
        'ec4223cc-4e36-42fe-a91c-5e3f55eee3ab'),
       ('be94dc90-1261-464b-bff5-ead145d8ed0b', '{}', '47562302-7ba3-41e1-8716-d8d24171ec79',
        '463da1f2-a570-46e1-92c4-1e36c7e517d9'),
       ('46c5f7b4-d58c-4ab8-b968-169e8810cbb1', '{}', '47562302-7ba3-41e1-8716-d8d24171ec79',
        '4547ea5b-c0ed-4edf-9968-de509de64876'),
       ('b9d24473-2e8f-4ed0-b4b6-ec94209e02cb', '{"save_zone": "papier-form"}', '47562302-7ba3-41e1-8716-d8d24171ec79',
        '1520396e-871a-4a6a-bae8-af607643dfe5'),
       ('1a8ca5d6-4466-492d-ba8e-2bdbdd770ff6', '{"save_zone": "formula"}', '47562302-7ba3-41e1-8716-d8d24171ec79',
        '0bc1d891-62b2-417f-abaa-2aa2beff641e');

DROP TABLE IF EXISTS "cases";
CREATE TABLE "public"."cases"
(
    "case_id"    uuid DEFAULT uuid_generate_v4() NOT NULL,
    "date"       date                            NOT NULL,
    "arrived_by" character varying               NOT NULL,
    "pat_id"     uuid,
    CONSTRAINT "PK_b8dcf802997909e8a6c413bf8d6" PRIMARY KEY ("case_id")
) WITH (oids = false);

INSERT INTO "cases" ("case_id", "date", "arrived_by", "pat_id")
VALUES ('1d1d012b-3e86-4e3f-b01c-db10ad2886c6', '2023-08-29', 'car', 'b4641eaa-3857-415d-9c72-8d0f03c09017'),
       ('e12a4146-448e-4396-a4b4-0cff0dcd35be', '2023-08-29', 'ambulance', 'b4641eaa-3857-415d-9c72-8d0f03c09017'),
       ('e488f320-7f63-4d23-827c-7ff24f20a444', '2023-03-09', 'car', '4fa0f9ab-49b8-4db3-a715-abbae4545c68'),
       ('47562302-7ba3-41e1-8716-d8d24171ec79', '2023-06-09', 'Feet', 'b4641eaa-3857-415d-9c72-8d0f03c09017');

DROP VIEW IF EXISTS "flow_case_step_views";
CREATE TABLE "flow_case_step_views"
(
    "data"               text,
    "case_id"            uuid,
    "flow_id"            uuid,
    "flow_name"          character varying(50),
    "type_name"          character varying(50),
    "type_personal_name" character varying(50),
    "pat_id"             uuid
);


DROP TABLE IF EXISTS "flow_chart_elements";
CREATE TABLE "public"."flow_chart_elements"
(
    "flow_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "name"    character varying(50)           NOT NULL,
    "type_id" uuid,
    CONSTRAINT "PK_1c3c642ff3a250dedd9c2159be3" PRIMARY KEY ("flow_id")
) WITH (oids = false);

INSERT INTO "flow_chart_elements" ("flow_id", "name", "type_id")
VALUES ('8206ec19-fd58-4e4f-a3d9-6ae9d9933b52', 'Self arrival', '955d560d-4723-4deb-a831-572f79875ba2'),
       ('1d819a72-7749-47ac-a320-d9848907f775', 'Ambulance arrival', '955d560d-4723-4deb-a831-572f79875ba2'),
       ('52c1d5be-26f5-415e-ab42-28a440774142', 'Arrival by helicopter', '955d560d-4723-4deb-a831-572f79875ba2'),
       ('1520396e-871a-4a6a-bae8-af607643dfe5', 'Patient registration', '984d77cf-1402-4b10-ae60-2e92cd583b61'),
       ('0bc1d891-62b2-417f-abaa-2aa2beff641e', 'After registration data save', '82587f74-18b4-4a4b-9cbf-63722dd55ba3'),
       ('4547ea5b-c0ed-4edf-9968-de509de64876', 'Treatment', '93257d82-f8f3-4503-a3d9-1871b3790834'),
       ('ec4223cc-4e36-42fe-a91c-5e3f55eee3ab', 'Patient first Observation', '8ee08e38-9146-4959-8a0b-907714c0977e'),
       ('463da1f2-a570-46e1-92c4-1e36c7e517d9', 'Patient second observation', '8ee08e38-9146-4959-8a0b-907714c0977e');

DROP TABLE IF EXISTS "flow_edges";
CREATE TABLE "public"."flow_edges"
(
    "edge_id"       uuid DEFAULT uuid_generate_v4() NOT NULL,
    "name"          character varying(50)           NOT NULL,
    "start_node_id" uuid,
    "end_node_id"   uuid,
    CONSTRAINT "PK_4455f5d98ef7ecaa74a15740e5c" PRIMARY KEY ("edge_id")
) WITH (oids = false);

INSERT INTO "flow_edges" ("edge_id", "name", "start_node_id", "end_node_id")
VALUES ('38bf9a92-dd47-457a-b6da-030b885e7a1f', 'To registration', '8206ec19-fd58-4e4f-a3d9-6ae9d9933b52',
        '1520396e-871a-4a6a-bae8-af607643dfe5'),
       ('17f58a44-1ac2-4560-a43c-3d5dceb919c5', 'To registration', '52c1d5be-26f5-415e-ab42-28a440774142',
        '1520396e-871a-4a6a-bae8-af607643dfe5'),
       ('ad892300-3f43-4066-aefd-b67d224e3051', 'To data save', '1520396e-871a-4a6a-bae8-af607643dfe5',
        '0bc1d891-62b2-417f-abaa-2aa2beff641e'),
       ('39e606ef-6a2b-4de7-815c-39f342801b83', 'To first observation', '0bc1d891-62b2-417f-abaa-2aa2beff641e',
        'ec4223cc-4e36-42fe-a91c-5e3f55eee3ab'),
       ('da26d64e-70a6-413b-9bb5-486bd2a222ec', 'To fast registration', '1d819a72-7749-47ac-a320-d9848907f775',
        'ec4223cc-4e36-42fe-a91c-5e3f55eee3ab'),
       ('42d1840d-bd48-4eda-955c-d2fa29fd25a9', 'Need more dedicated analysis', 'ec4223cc-4e36-42fe-a91c-5e3f55eee3ab',
        '463da1f2-a570-46e1-92c4-1e36c7e517d9'),
       ('2c3a28fa-11cc-4102-b6e7-bc7c44bbce76', 'Can treat', '463da1f2-a570-46e1-92c4-1e36c7e517d9',
        '4547ea5b-c0ed-4edf-9968-de509de64876'),
       ('ed21fcb7-15f5-4c79-8085-49961f967165', 'Can treat simply', 'ec4223cc-4e36-42fe-a91c-5e3f55eee3ab',
        '4547ea5b-c0ed-4edf-9968-de509de64876');

DROP TABLE IF EXISTS "flow_element_types";
CREATE TABLE "public"."flow_element_types"
(
    "type_id"       uuid DEFAULT uuid_generate_v4() NOT NULL,
    "name"          character varying(50)           NOT NULL,
    "personal_name" character varying(50)           NOT NULL,
    CONSTRAINT "PK_90f4912d596fa06b5ed50513f0b" PRIMARY KEY ("type_id")
) WITH (oids = false);

INSERT INTO "flow_element_types" ("type_id", "name", "personal_name")
VALUES ('955d560d-4723-4deb-a831-572f79875ba2', 'Arrival', ''),
       ('984d77cf-1402-4b10-ae60-2e92cd583b61', 'Registration', 'Secretary'),
       ('82587f74-18b4-4a4b-9cbf-63722dd55ba3', 'Data saving', ''),
       ('8ee08e38-9146-4959-8a0b-907714c0977e', 'Observation', 'Doctor'),
       ('93257d82-f8f3-4503-a3d9-1871b3790834', 'Treatment', '');

DROP TABLE IF EXISTS "patients";
CREATE TABLE "public"."patients"
(
    "pat_id"    uuid DEFAULT uuid_generate_v4() NOT NULL,
    "id_number" character varying               NOT NULL,
    CONSTRAINT "PK_109c6d622a2f6740a3e6c4b2ef5" PRIMARY KEY ("pat_id")
) WITH (oids = false);

INSERT INTO "patients" ("pat_id", "id_number")
VALUES ('b4641eaa-3857-415d-9c72-8d0f03c09017', 'HF1316'),
       ('4fa0f9ab-49b8-4db3-a715-abbae4545c68', 'AK8001');

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

-- 2023-11-10 04:23:57.941473+00
