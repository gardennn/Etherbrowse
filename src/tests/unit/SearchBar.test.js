import { render, screen } from '@testing-library/react';
import SearchBar from '../../src/components/SearchBar';

test('renders SearchBar component', () => {
  render(<SearchBar />);
  expect(screen.getByPlaceholderText(/enter wallet address or transaction hash/i)).toBeInTheDocument();
});
