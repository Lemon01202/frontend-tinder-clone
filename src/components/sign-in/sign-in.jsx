const SignIn = () => {
  const handleLoginClick = () => {
    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_API_TOKEN}&redirect_uri=${process.env.REACT_APP_BASE_URL}auth/google/callback&scope=openid%20email%20profile`;

    window.open(url, 'Google Login', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`);
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="p-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">React Google Login</h2>
          <button onClick={handleLoginClick} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
            Login with Google
          </button>
        </div>
      </div>
  );
}

export default SignIn;
