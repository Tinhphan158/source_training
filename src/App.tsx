import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import '@/styles/_customUI.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Loading } from './components/loading';
import Notfound from './components/notfound';
import ModalProvider from './context/contextStore';
import { LanguageProvider } from './context/languages';
import { browserRouter } from './routes';

const queryClient = new QueryClient();

export default function App() {
  return (
    <ConfigProvider>
      <LanguageProvider>
        <ModalProvider>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loading />}>
              <RouterProvider
                router={browserRouter}
                fallbackElement={<Notfound />}
              />
            </Suspense>
          </QueryClientProvider>
          <ToastContainer
            style={{
              zIndex: '10005',
            }}
          />
        </ModalProvider>
      </LanguageProvider>
    </ConfigProvider>
  );
}
