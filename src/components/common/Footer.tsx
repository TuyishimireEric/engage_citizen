export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} myVoice. All rights reserved. |
            Designed with <i className="fas fa-heart text-red-500"></i> for
            better communities
          </p>
        </div>
      </div>
    </footer>
  );
};
