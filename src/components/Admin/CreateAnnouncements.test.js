import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import CreateAnnouncements from './CreateAnnouncements';
import '@testing-library/jest-dom/extend-expect';

// Mocking axios.post
jest.mock('axios');

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: key => key })
  }));
  
describe('CreateAnnouncements', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

 
  test('should render the form', () => {
    const originalCheckIfAdmin = require('./checkIfAdmin').checkIfAdmin;
    require('./checkIfAdmin').checkIfAdmin = jest.fn(() => true);

    render(<CreateAnnouncements />);
  
    // Assert that the form elements are rendered
    expect(screen.getByText('Write an Announcement')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByText('support.Message')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Text')).toBeInTheDocument();
    expect(screen.getByText('support.Send')).toBeInTheDocument();

    // Restore the original checkIfAdmin function
    require('./checkIfAdmin').checkIfAdmin = originalCheckIfAdmin;
  });

  test('should submit the form with valid values', async () => {
    const originalCheckIfAdmin = require('./checkIfAdmin').checkIfAdmin;
    require('./checkIfAdmin').checkIfAdmin = jest.fn(() => true);

    render(<CreateAnnouncements />);

    // Fill in the form fields
    const titleInput = screen.queryAllByPlaceholderText('Title')[0];
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });

    const textInput = screen.queryAllByPlaceholderText('Text')[0];
    fireEvent.change(textInput, { target: { value: 'Test Text' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'support.Send' });
    fireEvent.click(submitButton);

    // Wait for the form submission to complete
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Assert that the form was submitted correctly
    expect(axios.post).toHaveBeenCalledWith(
      'http://127.0.0.1:8000/api/announcements',
      { title: 'Test Title', text: 'Test Text' }
    );

    // Restore the original checkIfAdmin function
    require('./checkIfAdmin').checkIfAdmin = originalCheckIfAdmin;
  });


  test('should display "NotAllowedAdmin" component when not an admin', () => {
    // Mock checkIfAdmin to return false
    jest.mock('./checkIfAdmin', () => ({
      checkIfAdmin: () => false,
    }));

    render(<CreateAnnouncements />);


  });
});
