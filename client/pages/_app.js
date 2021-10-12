import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <div className="app">
            <Component {...pageProps} />
        </div>
    );
}
