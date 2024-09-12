import normalize from 'emotion-normalize';
import { Global, css } from '@emotion/react';
import { PageLayout } from '_tosslib/components/PageLayout';
import { KeypadPage } from 'pages/KeypadPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
          <KeypadPage />
        </PageLayout>
      </QueryClientProvider>
    </>
  );
}
