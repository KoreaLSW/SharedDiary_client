import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import './App.css';
import { Main } from './page/Main';
import HttpClient from './network/http';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { SocketProvider } from './socket/SocketProvider';

const queryClient = new QueryClient();
//const httpClient = new HttpClient(baseURL);

function App() {
    return (
        <SocketProvider>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <ThemeProvider theme={theme}>
                        <Main />
                    </ThemeProvider>
                </RecoilRoot>
            </QueryClientProvider>
        </SocketProvider>
    );
}

export default App;
