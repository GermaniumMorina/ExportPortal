import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Admin from './Admin';
import alertify from 'alertifyjs';

// Mocking alertify module
jest.mock('alertifyjs', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe('Admin Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('handles Admin Mode button click', () => {
    const { getByText } = render(<Admin />);
    const adminButton = getByText('Admin Mode');

    fireEvent.click(adminButton);

    expect(localStorage.getItem('isAdmin')).toBe('true');
    expect(alertify.success).toHaveBeenCalledWith('You are now in Admin Mode');
  });

  test('handles User Mode button click', () => {
    localStorage.setItem('isAdmin', true);
    const { getByText } = render(<Admin />);
    const userButton = getByText('User Mode');

    fireEvent.click(userButton);

    expect(localStorage.getItem('isAdmin')).toBeNull();
    expect(alertify.error).toHaveBeenCalledWith('You are now in User Mode');
  });

  test('handles Write newsletter button click', () => {
    const { getByText } = render(<Admin />);
    const newsletterButton = getByText('Write newsletter');
  
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });
  
    fireEvent.click(newsletterButton);
  
    expect(window.location.href).toBe('/admin/newsletter');
  });
  

  test('handles Write success stories button click', () => {
    const { getByText } = render(<Admin />);
    const successStoriesButton = getByText('Write success stories');

    fireEvent.click(successStoriesButton);

    expect(window.location.href).toBe('/admin/success');
  });

  test('handles Write an Announcement button click', () => {
    const { getByText } = render(<Admin />);
    const announcementButton = getByText('Write an Announcement');

    fireEvent.click(announcementButton);

    expect(window.location.href).toBe('/admin/announcements');
  });

  test('handles Edit a company button click', () => {
    const { getByText } = render(<Admin />);
    const companyButton = getByText('Edit a company');

    fireEvent.click(companyButton);

    expect(window.location.href).toBe('/admin/search-company');
  });

  test('handles Edit a User button click', () => {
    const { getByText } = render(<Admin />);
    const userButton = getByText('Edit a User');

    fireEvent.click(userButton);

    expect(window.location.href).toBe('/admin/search-user');
  });
});
