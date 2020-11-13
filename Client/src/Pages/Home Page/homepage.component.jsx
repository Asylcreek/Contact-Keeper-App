import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import Contacts from '../../Components/Contacts/contacts.component';
import ContactForm from '../../Components/Contact Form/contact-form.component';
import FilterContacts from '../../Components/Filter Contacts/filter-contacts.component';

import {
  loadLessStart,
  loadMoreStart,
} from '../../Redux/contact/contact.actions';

const HomePage = ({
  contacts,
  totalContacts,
  totalResults,
  currentPage,
  loadMoreContacts,
  loadingMoreContacts,
  loadLessContacts,
  filteredContacts,
  filter,
}) => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        {(filteredContacts || contacts.length > 1) && <FilterContacts />}
        <Contacts />
        <div
          className="show-more u-flex-x-y-center"
          style={{ flexDirection: 'column', marginBottom: '1rem' }}
        >
          {totalContacts > 0 && (
            <p style={{ marginBottom: '1rem' }}>
              Showing {totalResults} out of {totalContacts}
            </p>
          )}
          {totalContacts > 5 ? (
            <div className="btn">
              {!loadingMoreContacts ? (
                totalContacts > totalResults ? (
                  <span
                    onClick={() =>
                      loadMoreContacts({ pageNo: currentPage + 1, filter })
                    }
                  >
                    Load More
                  </span>
                ) : (
                  <span onClick={() => loadLessContacts({ pageNo: 1, filter })}>
                    Load Less
                  </span>
                )
              ) : (
                <Loader
                  className="u-flex-x-y-center"
                  type="Oval"
                  color="#003699"
                  height={20}
                  width={20}
                />
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
  totalContacts: state.contacts.totalContacts,
  totalResults: state.contacts.totalResults,
  currentPage: state.contacts.currentPage,
  loadingMoreContacts: state.contacts.loadingMore,
  filteredContacts: state.contacts.filteredContacts,
  filter: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  loadMoreContacts: ({ pageNo, filter }) =>
    dispatch(loadMoreStart({ pageNo, filter })),
  loadLessContacts: ({ pageNo, filter }) =>
    dispatch(loadLessStart({ pageNo, filter })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
