import React from "react";
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header.js';
import Empty from 'components/Appointment/Empty.js';
import Show from 'components/Appointment/Show.js';
import Form from 'components/Appointment/Form.js';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const { id, time, interview, interviewers } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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
        />
      )}
      {mode === CREATE && (
        <Form
          student=""
          interviewer={3}
          interviewers={interviewers}
          onSave={() => transition(CONFIRM)}
          onCancel={back}
        />
      )}
    </article>
  );
}