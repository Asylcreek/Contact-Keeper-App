import { useEffect } from 'react';
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
  filter,
}) => {
  useEffect(() => {
    if (filteredContacts && !filter) {
      //Clear filters
      clearFilter();

      //Get all contacts afresh
      getContacts();
    }
  }, [clearFilter, getContacts, filteredContacts, filter]);

  return (
    <form>
      <input
        type="search"
        name="filter"
        placeholder="Filter Contacts..."
        value={filter}
        onChange={(event) => filterContacts(event.target.value)}
      />
    </form>
  );
};

const mapStateToProps = (state) => ({
  filteredContacts: state.contacts.filteredContacts,
  filter: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  filterContacts: (filter) => dispatch(filterContactsStart(filter)),
  clearFilter: () => dispatch(clearFilter()),
  getContacts: () => dispatch(getAllContactsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterContacts);
