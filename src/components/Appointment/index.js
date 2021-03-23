import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDITING = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );
  
  function save(name, interviewer) {
    // console.log('student:', name, 'interviewer:', interviewer);
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    // console.log('id:', props.id, 'interview:', interview)
    props.bookInterview(props.id, interview) 
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true)); //the true implements a 'switcheroo' of the state'
  }

  function deleting() {
    transition(CONFIRM)
  }

  function confirmDelete() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }


  return (

    <article className="appointment" data-testid="appointment">
    <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)} 
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}  
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleting}
          onEdit={() => transition(EDITING)}
        />
      )}
      {mode === SAVING && (
        <Status
          message={'Saving'}
        />
      )} 
      {mode === DELETING && (
        <Status
          message={'Deleting'}
        />
      )} 
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onCancel={back}
          onConfirm={confirmDelete}
        />
      )}
      {mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={back}  
        />
      ) }
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment"
          onClose={back}   
        />
      )} 
    </article>
  )
}

