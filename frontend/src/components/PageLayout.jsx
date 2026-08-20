import Navbar from './Navbar';

const PageLayout = ( children ) => {
  return (
    <div className="app-shell">
      <Navbar />
      {children}
    </div>
  );
};

export default PageLayout;
