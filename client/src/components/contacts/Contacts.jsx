import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import ContactItem from './ContactItem'
import Loading from '../layout/Loading'

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filteredContacts, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts()
    // eslint-disable-next-line
  }, [])

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>
  }

  return (
    <Fragment>
      {contacts !== null && !loading ?
        (
          <TransitionGroup>
            {filteredContacts !== null
              ? filteredContacts.map(contact => (
                <CSSTransition key={contact._id} timeout={200} classNames='item'>
                  <ContactItem contact={contact}/>
                </CSSTransition>
              ))
              : contacts.map(contact => (
                <CSSTransition key={contact._id} timeout={500} classNames='item'>
                  <ContactItem contact={contact}/>
                </CSSTransition>
              ))
            }
          </TransitionGroup>
        )
        : <Loading/>
      }
    </Fragment>
  );
};

export default Contacts
