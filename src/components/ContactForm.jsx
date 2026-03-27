import React, { useState, useCallback, memo } from 'react';
import { addContactSubmission } from '../utils/localStorageHelpers';
import { useApp } from '../context/AppContext';
import AnimatedButton from './AnimatedButton';

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const ContactForm = memo(() => {
  const { showToastMessage } = useApp();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        addContactSubmission(formData);
        showToastMessage('Message sent successfully! We will get back to you soon.');
        setFormData(INITIAL_FORM_STATE);
      } catch (error) {
        console.error('Error submitting form:', error);
        showToastMessage('Error sending message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [formData, validateForm, showToastMessage, isSubmitting]);

  const FormField = useCallback(({ label, id, type = 'text', isTextarea = false, optional = false, error, ...props }) => (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">
        {label} {!optional && '*'}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          {...props}
          className={`input-field ${error ? 'border-red-500' : ''}`}
        />
      ) : (
        <input
          type={type}
          id={id}
          {...props}
          className={`input-field ${error ? 'border-red-500' : ''}`}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  ), []);

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        Get in Touch
      </h2>

      <div className="space-y-6">
        <FormField
          label="Full Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          error={errors.name}
        />

        <FormField
          label="Email"
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          error={errors.email}
        />

        <FormField
          label="Phone"
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          optional
        />

        <FormField
          label="Message"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message here..."
          isTextarea
          rows={6}
          error={errors.message}
        />

        <div className="text-center">
          <AnimatedButton
            type="submit"
            variant="primary"
            className="w-full md:w-auto px-12"
            disabled={isSubmitting}
            ariaLabel="Send message button"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </AnimatedButton>
        </div>
      </div>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
