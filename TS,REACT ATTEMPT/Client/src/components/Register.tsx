import React, { useState } from 'react';

interface RegisterProps {
  onRegister: (username: string, email: string, password: string) => void;
}

const Register = ({ onRegister }: RegisterProps) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister(username, email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor="username">Username:</label>
        <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        </form>
  );
};

export default Register;
