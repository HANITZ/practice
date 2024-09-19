import normalize from 'emotion-normalize';
import { Global, css } from '@emotion/react';
import { PageLayout } from '_tosslib/components/PageLayout';
import { KeypadPage } from 'pages/KeypadPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Loading } from 'components/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import { Error } from 'components/Error';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Global
          styles={css`
            ${normalize}
            h1, h2, h3, h4, h5, h6 {
              font-size: 1em;
              font-weight: normal;
              margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
            }
          `}
        />
        <PageLayout>
          <ErrorBoundary fallback={<Error />}>
            <Suspense fallback={<Loading />}>
              <KeypadPage />
            </Suspense>
          </ErrorBoundary>
        </PageLayout>
      </QueryClientProvider>
    </>
  );
}
