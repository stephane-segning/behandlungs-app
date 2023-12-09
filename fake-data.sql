INSERT INTO "patients" ("pat_id", "id_number")
VALUES (876792114, '123456789'),
       (876792116, '987654321');

INSERT INTO "flow_element_types" ("type_id", "name", "personal_name")
VALUES (876792124, 'Arrival', 'Guardian'),
       (573392125, 'Registration', 'Secretary'),
       (573392126, 'Data saving', ''),
       (573392128, 'Observation', 'Doctor'),
       (573392127, 'Treatment', '');

INSERT INTO "cases" ("case_id", "date", "arrived_by", "pat_id")
VALUES (876792113, '2023-08-29', 'car', 876792114),
       (876792115, '2023-08-29', 'ambulance', 876792114),
       (876792123, '2023-03-09', 'car', 876792116),
       (876790545, '2023-06-09', 'Feet', 876792114);

INSERT INTO "flow_chart_elements" ("flow_id", "name", "type_id")
VALUES (876790543, 'Self arrival', 876792124),
       (876792125, 'Ambulance arrival', 876792124),
       (276792125, 'Arrival by helicopter', 876792124),
       (876790554, 'Patient registration', 573392125),
       (876792555, 'After registration data save', 573392126),
       (876790549, 'Treatment', 573392127),
       (876790545, 'Patient first Observation', 573392128),
       (876790547, 'Patient second observation', 573392128);

INSERT INTO "flow_edges" ("edge_id", "name", "start_node_id", "end_node_id")
VALUES (573392129, 'To registration', 876790543, 876790554),
       (573392132, 'To registration', 276792125, 876790554),
       (573392134, 'To data save', 876790554, 876792555),
       (573392135, 'To first observation', 876792555, 876790545),
       (573392136, 'To fast registration', 876792125, 876790545),
       (571339213, 'Need more dedicated analysis', 876790545, 876790547),
       (571309311, 'Can treat', 876790547, 876790549);

INSERT INTO "case_steps" ("step_id", "data", "case_id", "flow_id")
VALUES (876790542, '{}', 876790545, 876790543),
       (876790544, '{}', 876790545, 876790545),
       (876790546, '{"save_zone": "digital", "digital_type": "kis"}', 876790545, 876790547),
       (876790548, '{"save_zone": "digital", "digital_type": "excel"}', 876790545, 876790549),
       (876790551, '{"save_zone": "papier-form"}', 876790545, 876790554),
       (876792554, '{"save_zone": "formula"}', 876790545, 876792555);
