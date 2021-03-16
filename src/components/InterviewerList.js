import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import classNames from "classnames";

export default function InterviewerList(props) {

  let interviewerArray = props.interviewers.map((interviewer) =>
    <InterviewerList
      interviewers={interviewer.name}
      interviewer={interviewer.id}
      setInterviewer={props.setInterviewer}
    />
    )

  return (
    <ul>
      {interviewerArray}
    </ul>
  // <section className="interviewers">
  //   <h4 className="interviewers__header text--light">Interviewer</h4>
  //   <ul className="interviewers__list"></ul>
  // </section>
  )
}