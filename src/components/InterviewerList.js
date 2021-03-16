import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss'

export default function InterviewerList(props) {


  let interviewerArray = props.interviewers.map((interviewer) =>
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.interviewer === interviewer.id}
      setInterviewer={props.setInterviewer}
    />
    )

  return (
     <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewerArray}</ul>
  </section>
  )
}