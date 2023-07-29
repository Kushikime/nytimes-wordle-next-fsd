import { Game } from '../widget/Game/ui/Game';
import { Header } from '../widget/Header/ui/Header';

function App() {
    return (
        <div className={['app', 'dark'].join(' ')}>
            <Header />
            <Game />
        </div>
    );
}

export default App;
