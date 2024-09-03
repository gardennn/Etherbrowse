import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';

// Mock the react-router-dom module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SearchBar', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate);
  });

  test('navigates to account page on valid wallet address', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText(/Search by Address \/ Txn hash/i);
    fireEvent.change(inputElement, { target: { value: '0x2b6FB7D197C4402928240b81d26C633340664eD1' } });
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(mockNavigate).toHaveBeenCalledWith('/account/0x2b6FB7D197C4402928240b81d26C633340664eD1');
  });

  test('shows alert on invalid input', () => {
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText(/Search by Address \/ Txn hash/i);
    fireEvent.change(inputElement, { target: { value: 'invalid-input' } });
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(window.alert).toHaveBeenCalledWith('請輸入有效 Account Address 或 Txn Hash');
  });
});
