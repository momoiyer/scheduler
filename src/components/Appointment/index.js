import React from "react";
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header.js';
import Empty from 'components/Appointment/Empty.js';
import Show from 'components/Appointment/Show.js';
import Form from 'components/Appointment/Form.js';
import useVisualMode from 'hooks/useVisualMode';
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE ";
  const ERROR_DELETE = "ERROR_DELETE  ";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => {
        console.log("error: ", error);
        transition(ERROR_SAVE, true);
      });
  };

  const cancel = () => {
    transition(DELETE, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => {
        console.log("error: ", error);
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />
      }
      {mode === SHOW && (
        <Show
          key={id}
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          student=""
          interviewer={1}
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving..."
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to cancel the appointment?"
          onCancel={back}
          onConfirm={cancel}
        />
      )}
      {mode === DELETE && (
        <Status
          message="Deleting..."
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Error Saving Appointment!"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Error Deleting Appointment!"
          onClose={back}
        />
      )}

    </article>
  );
}