import { Game } from '../widget/Game/ui/Game';
import { Header } from '../widget/Header/ui/Header';

function App() {
    return (
        <div id="app" className={['app', 'dark'].join(' ')}>
            <Header />
            <Game />
        </div>
    );
}

export default App;
