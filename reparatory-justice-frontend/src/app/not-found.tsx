export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found</title>
      </head>
      <body>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '3rem', color: '#0b1f3a', marginBottom: '1rem' }}>404 - Page Not Found</h1>
          <p style={{ color: '#64748b' }}>The page you are looking for could not be found.</p>
        </div>
      </body>
    </html>
  );
}
