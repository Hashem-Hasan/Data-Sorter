import './globals.css';
export const metadata = {
  title: 'Rowcraft | Your data, in order.',
  description:
    'A local-first CSV and JSON workbench. Import, sort, filter, deduplicate and export without uploading your data.',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
