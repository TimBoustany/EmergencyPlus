import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

const Providers = () => {
    return (
        // We wrap everything with <AuthProvider> (that contains all functions we will use)
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
};

export default Providers;


