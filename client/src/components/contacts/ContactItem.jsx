import React from 'react'
import PropTypes from 'prop-types'

const ContactItem = ({contact}) => {
  const {id, name, email, phone, type} = contact
  console.log(type)
  return (
    <div className='card bg-light'>
      <h3 className="text-dash-primary text-left">
        {name}{' '}<span className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
}

export default ContactItem;
