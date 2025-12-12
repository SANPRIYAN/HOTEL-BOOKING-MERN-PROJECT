import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, beforeEach, test, expect } from 'vitest';
import axios from 'axios';
import Login from './Login';

// Mock dependencies
vi.mock('axios');
vi.mock('./Navbar', () => ({
    default: () => <div data-testid="navbar-mock">Navbar</div>
}));
const mockNavigate = vi.fn();

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Login Component White Box Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    // Path 1: Hardcoded Admin
    test('Path 1: Should redirect to dashboard for hardcoded admin', () => {
        render(<Login />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'Sanjay' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'sanjay07' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        expect(axios.post).not.toHaveBeenCalled(); // Verifies shortcut taken
    });

    // Path 2: Standard User (API)
    test('Path 2: Should redirect to home for standard user via API', async () => {
        axios.post.mockResolvedValue({ data: 'Success' });
        render(<Login />);

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'User' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Pass' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/home');
        });
    });

    // Path 3: Database Admin (API)
    test('Path 3: Should redirect to dashboard for DB admin via API', async () => {
        axios.post.mockResolvedValue({ data: 'Admin Success' });
        render(<Login />);

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'DBAdmin' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'DBPass' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    // Path 4: Invalid Credentials
    test('Path 4: Should display error for invalid credentials', async () => {
        axios.post.mockResolvedValue({ data: 'Invalid Credentials' });
        render(<Login />);

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'Wrong' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Wrong' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText('Invalid Credentials')).toBeInTheDocument();
        });
    });

    // Path 5: Network Error
    test('Path 5: Should handle network errors gracefully', async () => {
        axios.post.mockRejectedValue(new Error('Network Error'));
        render(<Login />);

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'User' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Pass' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText('Login failed. Check your credentials.')).toBeInTheDocument();
        });
    });
});
