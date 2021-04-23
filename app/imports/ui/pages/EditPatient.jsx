import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField, BoolField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Patients } from '../../api/patients/Patients';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  patientName: String,
	patientID: String,
	patientEmail: String,
	patientPhone: String,
	emailPref: {type: Boolean},
	phonePref: {type: Boolean},
	recievePref: {
		type: String,
		allowedValues: ['All notifications','Daily notifications','Appointment reminders only'],
		defaultValue: 'All notifications',
	},
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class EditPatient extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { patientName, patientID, patientEmail, patientPhone, emailPref, phonePref, recievePref } = data;
    const submitter = Meteor.user().username;
    Patients.insert({ patientName, patientID, patientEmail, patientPhone, emailPref, phonePref, recievePref, submitter },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit a Patient</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
								<Grid columns={2} centered divided>
										<Grid.Column>
											<TextField name='patientName' label='Patient name:'/>
											<TextField name='patientID' label='Patient ID:'/>
											<TextField name='patientEmail' label='Patient email :'/>
											<TextField name='patientPhone' label='Patient phone number:'/>
										</Grid.Column>
										<Grid.Column>
												<Header as="h3" textAlign="center">Notification preferences</Header>
												<BoolField name='emailPref' label='Email'/>
												<BoolField name='phonePref' label='Phone'/>
												<SelectField name='recievePref' label='Recieve:'/>
												<SubmitField value='Submit' label=''/>
												<ErrorsField/>
										</Grid.Column>
								</Grid>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default EditPatient;
