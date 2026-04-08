import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#d4af37' }}>Hoppala! Bir şeyler yanlış gitti.</h1>
          <p>Sayfayı yenilemeyi deneyebilir misiniz? Eğer sorun devam ederse lütfen bizimle iletişime geçin.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#d4af37',
              border: 'none',
              borderRadius: '5px',
              color: '#000',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Sayfayı Yenile
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
