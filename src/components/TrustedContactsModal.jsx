import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  User, 
  Heart,
  AlertCircle,
  Check
} from 'lucide-react';
import { useTrustedContacts } from '../hooks/useTrustedContacts';

const TrustedContactsModal = ({ isOpen, onClose, initialContacts = [] }) => {
  const {
    contacts,
    addContact,
    updateContact,
    removeContact,
    validateContact,
    formatPhoneNumber
  } = useTrustedContacts(initialContacts);

  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: 'Family'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const relationships = [
    'Family',
    'Friend',
    'Spouse/Partner',
    'Parent',
    'Sibling',
    'Attorney',
    'Emergency Contact',
    'Other'
  ];

  useEffect(() => {
    if (!isOpen) {
      setIsAddingContact(false);
      setEditingContact(null);
      setFormData({ name: '', phone: '', relationship: 'Family' });
      setFormErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateContact(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      if (editingContact) {
        updateContact(editingContact.id, formData);
      } else {
        addContact(formData);
      }

      // Reset form
      setFormData({ name: '', phone: '', relationship: 'Family' });
      setIsAddingContact(false);
      setEditingContact(null);
      setFormErrors({});
    } catch (error) {
      console.error('Error saving contact:', error);
      setFormErrors({ submit: 'Failed to save contact. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship
    });
    setIsAddingContact(true);
  };

  const handleDelete = (contactId) => {
    if (window.confirm('Are you sure you want to remove this contact?')) {
      removeContact(contactId);
    }
  };

  const cancelForm = () => {
    setIsAddingContact(false);
    setEditingContact(null);
    setFormData({ name: '', phone: '', relationship: 'Family' });
    setFormErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-effect rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Trusted Contacts</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Add Contact Form */}
          {isAddingContact && (
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-white mb-4">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    className={`w-full bg-white/10 border text-white rounded-lg px-4 py-3 
                             focus:outline-none focus:ring-2 placeholder-white/50 ${
                               formErrors.name 
                                 ? 'border-danger focus:ring-danger/30' 
                                 : 'border-white/20 focus:ring-white/30'
                             }`}
                  />
                  {formErrors.name && (
                    <p className="text-danger text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{formErrors.name}</span>
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className={`w-full bg-white/10 border text-white rounded-lg px-4 py-3 
                             focus:outline-none focus:ring-2 placeholder-white/50 ${
                               formErrors.phone 
                                 ? 'border-danger focus:ring-danger/30' 
                                 : 'border-white/20 focus:ring-white/30'
                             }`}
                  />
                  {formErrors.phone && (
                    <p className="text-danger text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{formErrors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Relationship Field */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Relationship
                  </label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => handleInputChange('relationship', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white 
                             rounded-lg px-4 py-3 focus:outline-none focus:ring-2 
                             focus:ring-white/30"
                  >
                    {relationships.map((rel) => (
                      <option key={rel} value={rel} className="text-gray-900">
                        {rel}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-success hover:bg-success/90 disabled:bg-white/10 
                             disabled:text-white/50 text-white font-medium py-3 px-4 
                             rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        <span>{editingContact ? 'Update Contact' : 'Add Contact'}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white 
                             rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {formErrors.submit && (
                  <p className="text-danger text-sm flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{formErrors.submit}</span>
                  </p>
                )}
              </form>
            </div>
          )}

          {/* Add Contact Button */}
          {!isAddingContact && (
            <button
              onClick={() => setIsAddingContact(true)}
              className="w-full bg-accent hover:bg-accent/90 text-white font-medium 
                       py-3 px-4 rounded-lg transition-colors flex items-center 
                       justify-center space-x-2 mb-6"
            >
              <Plus className="h-5 w-5" />
              <span>Add Trusted Contact</span>
            </button>
          )}

          {/* Contacts List */}
          <div className="space-y-3">
            {contacts.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-white/50 mx-auto mb-4" />
                <p className="text-white/70 mb-2">No trusted contacts yet</p>
                <p className="text-white/50 text-sm">
                  Add contacts who should be notified in case of emergency
                </p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white/10 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-white">{contact.name}</h3>
                      <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                        {contact.relationship}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-white/70 text-sm">
                      <Phone className="h-4 w-4" />
                      <span>{formatPhoneNumber(contact.phone)}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-2 bg-danger/20 hover:bg-danger/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-danger" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-accent/20 border border-accent/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="text-sm text-white/90">
                <p className="font-medium mb-1">Emergency Alert Information</p>
                <p>
                  When you use the emergency recording feature, these contacts will 
                  receive an SMS alert with your location and a message that you're 
                  in a situation requiring documentation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20">
          <button
            onClick={onClose}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-medium 
                     py-3 px-4 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustedContactsModal;
