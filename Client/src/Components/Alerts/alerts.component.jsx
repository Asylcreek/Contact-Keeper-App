import { useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { removeOldestAlert } from '../../Redux/app/app.actions';

const Alerts = ({ alerts, removeOldestAlert }) => {
  useEffect(() => {
    let timeOut;
    if (alerts.length) {
      timeOut = setTimeout(removeOldestAlert, 5000);
    }

    return () => clearTimeout(timeOut);
  }, [alerts, removeOldestAlert]);

  return (
    <TransitionGroup className="alert-container">
      {alerts.length > 0 &&
        alerts.map((alert, i) => (
          <CSSTransition key={i} classNames="alert" timeout={200}>
            <div key={i} className={`alert alert-${alert.type}`}>
              <i className="fas fa-info-circle" /> {alert.message}
            </div>
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.app.alerts,
});

const mapDispatchToProps = (dispatch) => ({
  removeOldestAlert: () => dispatch(removeOldestAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
