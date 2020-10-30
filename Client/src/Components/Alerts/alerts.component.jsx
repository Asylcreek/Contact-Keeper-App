import { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeFirstAlert } from '../../Redux/app/app.actions';

const Alerts = ({ alerts, removeFirstAlert }) => {
  useEffect(() => {
    if (alerts.length) return setTimeout(removeFirstAlert, 5000);
  }, [alerts, removeFirstAlert]);

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
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
