import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Tab, Loader } from 'semantic-ui-react';
import CourseList from '/imports/ui/components/CourseList';
import QuestionList from '/imports/ui/components/QuestionList';
import Logo from '/imports/ui/components/Logo';
import { Courses } from '../../api/course/course.js';
import { Questions } from '../../api/question/question.js';

class Landing extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const panes = [

      {
        menuItem: 'Courses', render: () => (<Tab.Pane><CourseList
            courses={this.props.courses}
            ready={this.props.ready}/></Tab.Pane>),
      },
      {
        menuItem: 'Questions', render: () => (<Tab.Pane><QuestionList
            questions={this.props.questions}
            ready={this.props.ready}/></Tab.Pane>),
      },
    ];

    const animationStyle = {
      background: `url(${'/images/papers2.png'})`,
      backgroundPosition: '20% 10%',
      backgroundSize: '800px 1000px',
      backgroundRepeat: 'no-repeat',
    };

    const animationBack = {
      background: `url(${'/images/university-of-hawaii-manoa-low.jpg'})`,
      backgroundSize: '400px 400px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };

    return (
        <Container>
          <div className="tech-slideshow" style={animationBack}>
            <div className="mover-1" style={animationStyle}></div>
          </div>
          <Logo/>
          <p>ManoaOverflow provides a platform for technical questions and answers
            specific to the UH Manoa ICS community and categorized by course number.</p>
          <p>To view questions or ask questions pertaining to a course navigate to the course page below or click on
            the questions tab to browse all questions.</p>
          <Tab panes={panes}/>
        </Container>
    );
  }
}

Landing.propTypes = {
  courses: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(function () {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Courses');
  const subscription2 = Meteor.subscribe('Questions');
  return {
    courses: Courses.find({}).fetch(),
    questions: Questions.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(Landing);
