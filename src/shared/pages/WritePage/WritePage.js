import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextEditor from 'shared/components/TextEditor/TextEditor'

function validate(values) {
  const errors = {}

  if (! values.title) {
    errors.title = 'This field is required.'
  }

  if (! values.body) {
    errors.body = 'This field is required.'
  }

  return errors
}

const renderLabel = (htmlFor, label) => <label className="sr-only" htmlFor={htmlFor}>{label}</label>

const renderError = (touched, error) => {
  if (touched && error) {
    return <span className="text-danger">{error}</span>
  }

  return null
}

const renderInput = ({ input, type, label, meta: { touched, error } }) => (
  <div className="form-group">
    {renderLabel(input.name, label)}
    <input {...input} type={type} className="form-control" placeholder={label} />
    {renderError(touched, error)}
  </div>
)

const renderEditor = ({ input, label, meta: { touched, error } }) => (
  <div className="form-group">
    {renderLabel(input.name, label)}
    <TextEditor {...input} label={label} />
    {renderError(touched, error)}
  </div>
)

const WritePage = (props) => {
  const { handleSubmit, onFormSubmit, pristine, submitting } = props

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Field type="text" name="title" label="Title" component={renderInput} />
            <Field name="body" label="Body" component={renderEditor} />
            <button type="submit" className="btn btn-default btn-block btn-lg" disabled={pristine || submitting}>Post</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default reduxForm({
  form: 'writePost',
  validate,
})(WritePage)
