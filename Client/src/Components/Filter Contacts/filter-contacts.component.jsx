import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  clearFilter,
  filterContacts,
} from '../../Redux/contact/contact.actions';

const FilterContacts = ({ filterContacts, clearFilter }) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter) return filterContacts(filter);

    clearFilter();
  }, [filter, filterContacts, clearFilter]);

  return (
    <form>
      <input
        type="search"
        name="filter"
        placeholder="Filter Contacts..."
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  filterContacts: (filter) => dispatch(filterContacts(filter)),
  clearFilter: () => dispatch(clearFilter()),
});

export default connect(null, mapDispatchToProps)(FilterContacts);
