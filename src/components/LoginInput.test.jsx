/**
 * Skenario pengujian
 *
 * - Komponen LoginInput
 *   - Harus menangani input email dengan benar
 *   - Harus menangani input kata sandi dengan benar
 *   - Harus memanggil fungsi login ketika tombol login diklik
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('Komponen LoginInput', () => {
  afterEach(() => {
    cleanup();
  });

  it('harus menangani input email dengan benar', async () => {
    // Persiapan
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Tindakan
    await userEvent.type(emailInput, 'dimastest@gmail.com');

    // Periksa
    expect(emailInput).toHaveValue('dimastest@gmail.com');
  });

  it('harus menangani input kata sandi dengan benar', async () => {
    // Persiapan
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Tindakan
    await userEvent.type(passwordInput, 'dimastest');

    // Periksa
    expect(passwordInput).toHaveValue('dimastest');
  });

  it('harus memanggil fungsi login ketika tombol login diklik', async () => {
    // Persiapan
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'dimastest@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'dimastest');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Tindakan
    await userEvent.click(loginButton);

    // Periksa
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'dimastest@gmail.com',
      password: 'dimastest',
    });
  });
});
