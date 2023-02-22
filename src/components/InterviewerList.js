import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem.js';

export default function InterviewerList(props) {

  const { interviewers, value, onChange } = props;


  const interviewerList = interviewers.map(currentInterviewer => {
    return (
      <InterviewerListItem
        key={currentInterviewer.id}
        name={currentInterviewer.name}
        avatar={currentInterviewer.avatar}
        setInterviewer={() => onChange(currentInterviewer.id)}
        selected={value === currentInterviewer.id}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>

  );
}