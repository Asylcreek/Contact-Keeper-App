import { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeFirstAlert } from '../../Redux/app/app.actions';

const Alerts = ({ alerts, removeFirstAlert }) => {
  useEffect(() => {
    let timeOut;
    if (alerts.length) {
      timeOut = setTimeout(removeFirstAlert, 5000);
    }

    return () => clearTimeout(timeOut);
  }, [alerts, removeFirstAlert]);

  return (
    alerts.length > 0 &&
    alerts.map((alert, i) => (
      <div key={i} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.message}
      </div>
    ))
  );
};

const mapStateToProps = (state) => ({
  alerts: state.app.alerts,
});

const mapDispatchToProps = (dispatch) => ({
  removeFirstAlert: () => dispatch(removeFirstAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
