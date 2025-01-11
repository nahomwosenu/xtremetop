import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/UseToast';
import { AuthContext } from '../../context/AuthContext';
import { ServerContext } from '../../context/ServerContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { success, error } = useToast();
  const { login } = useContext(AuthContext);
  const { cached, addServer } = useContext(ServerContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      error("Username and password are required!");
      return;
    }
    login(formData.email, formData.password).then(() => {
      success("Login successful");
      const cachedServer = cached(undefined);
      if (cachedServer) {
        addServer(cachedServer, false).then((result) => {
          console.log("###>serveradded", result);
          localStorage.removeItem("cached_server");
          setTimeout(() => {
            navigate('/');
          }, 500);
        }).catch((err) => {
          console.log("err adding server", err);
          setTimeout(() => {
            navigate('/');
          }, 500);
        })
      } else {
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    }).catch((err) => error(err.message));
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center bg-black" style={{ backgroundImage: 'url("/images/hero.png")' }}>
      <div className="max-w-lg w-full bg-darkBlue-900 bg-opacity-90 rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-pink-300 font-bold">USER</h1>
          <h1 className="text-3xl text-yellow-400 font-bold">LOGIN</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm text-yellow-300 mb-1">*Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-darkBlue-700 border border-yellow-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="email@mail.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm text-yellow-300 mb-1">*Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-darkBlue-700 border border-yellow-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Type password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full p-3 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              LOGIN
            </button>
          </div>
        </form>

        {/* Forgot Password and Register */}
        <div className="mt-6 text-center">
          <p className="text-yellow-300 text-sm">
            <a href="#" className="text-yellow-500 underline">Forgot your Password?</a>
          </p>
          <p className="text-yellow-300 text-sm mt-4">
            Don’t have an account yet? <Link to="/register" className="text-yellow-500 underline">Register Now!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
