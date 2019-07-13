import React, { useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = props => {
  const contactContext = useContext(ContactContext)
  const { filterContacts, clearFilter, filteredContacts } = contactContext
  const textRef = useRef(null)

  useEffect(() => {
    if(filteredContacts === null) {
      textRef.current.value = ''
    }
  })

  const onChange = e => {
    if(textRef.current.value !== '') {
      filterContacts(e.target.value)
    } else {
      clearFilter()
    }
  }

  return (
    <form>
      <input ref={textRef} type="text" placeholder='Filter contacts ...' onChange={onChange}/>
    </form>
  );
};

ContactFilter.propTypes = {

}

export default ContactFilter
