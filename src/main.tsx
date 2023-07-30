import { createRoot } from 'react-dom/client';
import App from './app/App';
import './shared/styles/index.scss';

const root = createRoot(document.getElementById('root')!);

if (process.env.MODE === 'development') {
    // When development, setup the MSW.
    // import the worker (under the browser.ts file)
    import('./tests/mocks/browser')
        .then(({ worker }) => {
            // Start the worker.
            worker.start({
                onUnhandledRequest: 'bypass',
            });
        })
        .then(() => {
            // Render the application.
            root.render(<App />);
        });
} else {
    // Render the application in production without the MSW.
    root.render(<App />);
}
