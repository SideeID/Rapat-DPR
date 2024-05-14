/**
 * Skenario pengujian
 *
 * - Komponen RegisterInput
 *   - Harus menangani input nama dengan benar
 *   - Harus menangani input email dengan benar
 *   - Harus menangani input kata sandi dengan benar
 *   - Harus memanggil fungsi register ketika tombol register diklik
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('Komponen RegisterInput', () => {
  afterEach(() => {
    cleanup();
  });

  it('harus menangani input nama dengan benar', async () => {
    // Persiapan
    render(<RegisterInput register={() => {}} />);
    const nameInput = screen.getByPlaceholderText('Name');

    // Tindakan
    await userEvent.type(nameInput, 'John Doe');

    // Periksa
    expect(nameInput).toHaveValue('John Doe');
  });

  it('harus menangani input email dengan benar', async () => {
    // Persiapan
    render(<RegisterInput register={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');

    // Tindakan
    await userEvent.type(emailInput, 'johndoe@example.com');

    // Periksa
    expect(emailInput).toHaveValue('johndoe@example.com');
  });

  it('harus menangani input kata sandi dengan benar', async () => {
    // Persiapan
    render(<RegisterInput register={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // Tindakan
    await userEvent.type(passwordInput, 'password123');

    // Periksa
    expect(passwordInput).toHaveValue('password123');
  });

  it('harus memanggil fungsi register ketika tombol register diklik', async () => {
    // Persiapan
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'John Doe');
    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'johndoe@example.com');
    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password123');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    // Tindakan
    await userEvent.click(registerButton);

    // Periksa
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });
  });
});
