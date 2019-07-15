import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import ContactItem from './ContactItem'

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filteredContacts } = contactContext;

  if(contacts.length === 0) {
    return <h4>Please add a contact</h4>
  }

  return (
    <Fragment>
      <TransitionGroup>
      { filteredContacts !== null
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
    </Fragment>
  );
};

export default Contacts;
