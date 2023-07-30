import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should render App', () => {
        const { container } = render(<App />);

        expect(container.getElementsByClassName('app').length).toBe(1);
    });
});
