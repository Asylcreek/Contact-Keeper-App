import { useEffect, useState } from 'react';
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
  totalPages,
  currentPage,
  loadMoreContacts,
  loadingMoreContacts,
  loadLessContacts,
}) => {
  const [moreContacts, setMoreContacts] = useState(true);

  useEffect(() => {
    if (totalPages && currentPage >= totalPages && !loadingMoreContacts)
      return setMoreContacts(false);

    if (totalPages && currentPage === 1 && !loadingMoreContacts)
      return setMoreContacts(true);
  }, [currentPage, setMoreContacts, totalPages, loadingMoreContacts]);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        {contacts.length > 1 && <FilterContacts />}
        <Contacts />
        <div
          className="show-more u-flex-x-y-center"
          style={{ flexDirection: 'column', marginBottom: '1rem' }}
        >
          <p style={{ marginBottom: '1rem' }}>
            Showing {totalResults} out of {totalContacts}
          </p>
          {totalPages > 1 ? (
            <div className="btn">
              {!loadingMoreContacts ? (
                moreContacts ? (
                  <span onClick={() => loadMoreContacts(currentPage + 1)}>
                    Load More
                  </span>
                ) : (
                  <span onClick={() => loadLessContacts(currentPage)}>
                    Show Less
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
  totalPages: state.contacts.pages,
  currentPage: state.contacts.currentPage,
  loadingMoreContacts: state.contacts.loadingMore,
});

const mapDispatchToProps = (dispatch) => ({
  loadMoreContacts: (pageNo) => dispatch(loadMoreStart(pageNo)),
  loadLessContacts: (pageNo) => dispatch(loadLessStart(pageNo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
