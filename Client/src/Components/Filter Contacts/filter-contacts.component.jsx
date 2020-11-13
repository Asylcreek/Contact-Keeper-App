import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  clearFilter,
  filterContactsStart,
  getAllContactsStart,
} from '../../Redux/contact/contact.actions';

const FilterContacts = ({
  filterContacts,
  clearFilter,
  getContacts,
  filteredContacts,
}) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter) return filterContacts(filter);

    if (filteredContacts) {
      //Clear filters
      clearFilter();

      //Get all contacts afresh
      getContacts();
    }
  }, [filter, filterContacts, clearFilter, getContacts, filteredContacts]);

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

const mapStateToProps = (state) => ({
  filteredContacts: state.contacts.filteredContacts,
});

const mapDispatchToProps = (dispatch) => ({
  filterContacts: (filter) => dispatch(filterContactsStart(filter)),
  clearFilter: () => dispatch(clearFilter()),
  getContacts: () => dispatch(getAllContactsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterContacts);
