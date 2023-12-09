INSERT INTO "patients" ("pat_id", "id_number")
VALUES (02, '123456789'),
       (01, '987654321');

INSERT INTO "flow_element_types" ("type_id", "name", "personal_name")
VALUES (01, 'Ankunft', ''),
       (02, 'Registrierung', 'Patientenverwaltung'),
       (03, 'Anamnese', 'Arzt'),
       (04, 'Untersuchung', 'Arzt'),
       (05, 'Radiologie', 'MRTA'),
       (06, 'Schriftlicher Befund', 'Chefarzt'),
       (07, 'Diagnosestellung & Codierung', 'Assistentarzt'),
       (08, 'Behandlungsplan', 'Assistentarzt & Arzt'),
       (09, 'Aufklärungsbogen', 'Arzt'),
       (10, 'Narkoseprotokoll', 'Anästhesist'),
       (11, 'Beatmung während der OP', 'Assistentarzt'),
       (12, 'Behandlung', 'Arzt'),
       (13, 'Pflege & Dokumentation', 'Pflegepersonal'),
       (14, 'Entlassung', 'Arzt & Schreibdienst')
;

INSERT INTO "cases" ("case_id", "date", "arrived_by", "pat_id")
VALUES (01, '2023-08-29', 'car', 01),
       (02, '2023-06-09', 'Feet', 02)
;

INSERT INTO "flow_chart_elements" ("flow_id", "name", "type_id")
VALUES (01, 'Ankunft', 01),
       (101, 'Krankenwagen', 01),
       (201, 'Hubschrauber', 01),
       (02, 'Registrierung', 02),
       (102, 'Post-Registrierung Datenspeicherung', 02),
       (03, 'Anamnese', 03),
       (04, 'Untersuchung', 04),
       (05, 'Radiologie', 05),
       (06, 'Schriftlicher Befund', 06),
       (07, 'Diagnosestellung', 07),
       (08, 'Codierung', 07),
       (09, 'Behandlungsplan', 08),
       (10, 'Aufklärungsbogen', 09),
       (11, 'Narkoseprotokoll', 10),
       (12, 'Beatmung', 11),
       (13, 'Behandlung', 12),
       (14, 'Pflege', 13),
       (15, 'Dokumentation', 13),
       (16, 'Entlassung', 14);

INSERT INTO "flow_edges" ("edge_id", "name", "start_node_id", "end_node_id")
VALUES (01, 'Zur Registrierung', 01, 02),
       (02, 'Zur Registrierung', 201, 02),
       (03, 'Zur Dataspeicherung', 02, 102),
       (04, 'Zur ersten Beobachtung', 102, 14),
       (05, 'Zur schnellen Registrierung', 101, 14),
       (07, 'Kann behandeln', 14, 13),
       (100, 'Zur Notaufnahme', 02, 03),
       (101, 'Zur Untersuchung', 03, 04),
       (102, 'Zur Radiologische Untersuchung', 04, 05),
       (103, '', 05, 06),
       (104, 'Zum Assistentarzt senden', 06, 07),
       (105, '', 07, 08),
       (106, 'Plan erklären', 08, 09),
       (107, 'Plan unterschreiben', 09, 10),
       (108, 'Bogen unterschreiben', 10, 11),
       (109, 'Protokoll unterschreiben', 11, 12),
       (110, '', 12, 13),
       (111, '', 13, 14),
       (112, '', 14, 15),
       (113, '', 15, 16)

;

INSERT INTO "case_steps" ("step_id", "data", "case_id", "flow_id")
VALUES (01, '{}', 02, 01),
       (02, '{}', 02, 14),
       (03, '{"speicher_ort": "kis", "digital_type": "kis"}', 02, 14),
       (04, '{"speicher_ort": "kis", "digital_type": "excel"}', 02, 13),
       (05, '{"speicher_ort": "papier-form"}', 02, 02),
       (06, '{"speicher_ort": "formula"}', 02, 102),
       --
       (101, '{}', 01, 01),
       (102, '{"speicher_ort": "papier-form", "data": "Einweisungspapier"}', 01, 02),
       (103, '{"speicher_ort": "kis", "Dokumentation": "KIS"}', 01, 03),
       (104, '{"speicher_ort": "kis", "Dokumentation": "KIS"}', 01, 04),
       (105, '{"speicher_ort": "kis", "Dokumentation": "KIS / PACS / RIS"}', 01, 05),
       (106, '{"speicher_ort": "kis", "Dokumentation": "KIS"}', 01, 06),
       (107, '{"speicher_ort": "kis", "Dokumentation": "KIS"}', 01, 07),
       (108, '{"speicher_ort": "kis", "Dokumentation": "KIS"}', 01, 08),
       (109, '{"speicher_ort": "kis", "Dokumentation": "KIS"}', 01, 09),
       (110, '{"speicher_ort": "kis", "Dokumentation": "KIS"}', 01, 10),
       (111, '{"speicher_ort": "digital", "Dokumentation": "Im Andok"}', 01, 11),
       (112, '{"speicher_ort": "kis", "data": "Beatmungsparameter"}', 01, 12),
       (113, '{}', 01, 13),
       (114, '{}', 01, 14),
       (115, '{"speicher_ort": "papier-form", "data": "Pflegedurchführungsnachweise"}', 01, 15),
       (116, '{"speicher_ort": "kis", "data": "Entlassungsbericht"}', 01, 16)
;
