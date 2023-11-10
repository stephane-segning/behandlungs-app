import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { DatabaseFormValues } from '../models/db-form'

const validationSchema = Yup.object().shape({
  type: Yup.string().required('Datenbanktyp erforderlich'),
  host: Yup.string(),
  port: Yup.number().positive().integer(),
  username: Yup.string(),
  password: Yup.string(),
  database: Yup.string()
})

interface Props {
  onSubmit: (values: DatabaseFormValues) => void
}

export const DatabaseLoginForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik<DatabaseFormValues>
      initialValues={{
        type: '',
        host: '',
        port: '',
        username: '',
        password: '',
        database: ''
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4">
          <Field name="type" as="select" className="select select-bordered w-full select-sm">
            <option value="" disabled>
              Datenbanktyp
            </option>
            <option value="postgres">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="sqlite">SQLite</option>
          </Field>
          <ErrorMessage name="type" component="div" className="text-red-500" />

          <Field
            name="host"
            type="text"
            placeholder="Server"
            className="input input-bordered w-full input-sm"
          />
          <ErrorMessage name="host" component="div" className="text-red-500" />

          <Field
            name="port"
            type="number"
            placeholder="Port"
            className="input input-bordered w-full input-sm"
          />
          <ErrorMessage name="port" component="div" className="text-red-500" />

          <Field
            name="username"
            type="text"
            placeholder="Benuztername"
            className="input input-bordered w-full input-sm"
          />
          <ErrorMessage name="username" component="div" className="text-red-500" />

          <Field
            name="password"
            type="password"
            placeholder="Passwort"
            className="input input-bordered w-full input-sm"
          />
          <ErrorMessage name="password" component="div" className="text-red-500" />

          <Field
            name="database"
            type="text"
            placeholder="Datenbankname"
            className="input input-bordered w-full input-sm"
          />
          <ErrorMessage name="database" component="div" className="text-red-500" />

          <button type="submit" className="btn btn-sm btn-primary" disabled={isSubmitting}>
            Verbinden
          </button>
        </Form>
      )}
    </Formik>
  )
}
