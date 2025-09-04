import { useState, useEffect } from 'react';

export const useTrustedContacts = (initialContacts = []) => {
  const [contacts, setContacts] = useState(initialContacts);

  useEffect(() => {
    const savedContacts = localStorage.getItem('zaraRightsTrustedContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  const saveContacts = (newContacts) => {
    setContacts(newContacts);
    localStorage.setItem('zaraRightsTrustedContacts', JSON.stringify(newContacts));
    
    // Also update the main user object
    const savedUser = localStorage.getItem('zaraRightsUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      user.trustedContacts = newContacts;
      localStorage.setItem('zaraRightsUser', JSON.stringify(user));
    }
  };

  const addContact = (contact) => {
    const newContact = {
      id: Date.now().toString(),
      name: contact.name.trim(),
      phone: contact.phone.trim(),
      relationship: contact.relationship || 'Emergency Contact',
      createdAt: new Date().toISOString()
    };
    
    const updatedContacts = [...contacts, newContact];
    saveContacts(updatedContacts);
    return newContact;
  };

  const updateContact = (contactId, updates) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId
        ? { ...contact, ...updates, updatedAt: new Date().toISOString() }
        : contact
    );
    saveContacts(updatedContacts);
  };

  const removeContact = (contactId) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    saveContacts(updatedContacts);
  };

  const validateContact = (contact) => {
    const errors = {};
    
    if (!contact.name || contact.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }
    
    if (!contact.phone || contact.phone.trim().length < 10) {
      errors.phone = 'Phone number must be at least 10 digits';
    }
    
    // Basic phone number validation (US format)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = contact.phone?.replace(/\D/g, '');
    if (cleanPhone && !phoneRegex.test(cleanPhone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return {
    contacts,
    addContact,
    updateContact,
    removeContact,
    validateContact,
    formatPhoneNumber
  };
};
