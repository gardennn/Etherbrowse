// src/tests/unit/HomePage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom'; // 确保导入这个组件
import HomePage from '../../pages/HomePage';

describe('HomePage', () => {
  test('renders the Etherbrowse title and logo', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const titleElement = screen.getByText(/Etherbrowse/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the SearchBar component', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search by Address \/ Txn hash/i);
    expect(searchInput).toBeInTheDocument();
  });
});
