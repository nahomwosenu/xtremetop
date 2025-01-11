/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useContext, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useToast } from '../../context/UseToast';
import { Server, ServerContext } from '../../context/ServerContext';
import { Game, GameContext } from '../../context/GameContext';
import Select from '../Select/Select';
import { RegionContext } from '../../context/RegionContext';
import GameServerForm from '../Servers/GameServerForm';

interface RegistrationProps { }

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  description: string;
  game: string;
  website: string;
  serverIP: string;
  serverName: string;
  serverQueryPort: string;
  serverJoinPort: string;
  hostLocation: string;
  spamCheck: boolean;
  termsAccepted: boolean;
}

const Registration: FC<RegistrationProps> = () => {
  const { register: authRegister } = useContext(AuthContext);
  const navigate = useNavigate();
  const { success, error } = useToast();
  const { register, control, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      description: '',
      game: '',
      spamCheck: false,
      termsAccepted: false,
    }
  });

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [server, setServer] = useState<Server | null>(null);
  const { register: Register } = useContext(AuthContext);
  const { addServer } = useContext(ServerContext);
  const { games } = useContext(GameContext);
  const game = watch('game');
  const [selectedGame, setSelectedGame] = useState<Game | undefined>();

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data Submitted: ", data);
    if (!recaptchaToken) {
      error("Captcha failed, please confirm you're not a robot");
      return;
    }
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((key: string) => {
        const errorMessage = errors[key as keyof typeof errors]?.message;
        if (errorMessage) {
          error(errorMessage);
        }
      });
      return;
    }
    if (data.password !== data.confirmPassword) {
      error('Password and confirm-password do not match!');
      return;
    }

    Register(data.email, data.email, data.password)
      .then((d) => {
        console.log("###>data", d);
        addServer({
          game: data.game,
          description: server?.description,
          title: server?.title,
          region: server?.region,
          server_ip: server?.server_ip,
          server_port: server?.server_port,
          server_query_port: server?.server_query_port
        }, true).then((result) => {
          console.log("###addServer", result);
          success("Registration successful, please check your email for confirmation");
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        })
          .catch((err) => {
            console.log(err);
            error(err.message);
          });
      }).catch((err) => {
        console.log(err);
        error(err.message);
      });
  };

  const onServerDetailsUpdate = (watchedVals: any) => {
    setServer((p) => ({
      ...p,
      ...watchedVals
    }));
    console.log("###>server", server);
  }

  useEffect(() => {
    if (game) {
      const g = games?.find((prop) => prop._id === game);
      console.log("###>game", g);
      setSelectedGame(g);
    }
  }, [game, games]);
  useEffect(() => {
    console.log("game updated", selectedGame);
  }, [selectedGame]);

  return (
    <div className="py-12 md:pb-40 mt-0 bg-gray-900">
      <div className="max-w-3xl mx-auto p-6 bg-darkBlue-900 bg-opacity-90 rounded-lg shadow-lg mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="flex justify-start items-start mb-6">
            <span className="text-4xl text-pink-300 font-bold">CREATE</span>
            <span className="text-4xl text-yellow-400 font-bold ms-4">ACCOUNT</span>
          </div>

          {/* Grouped Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm text-yellow-300">*Email:</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full p-3 rounded-lg bg-darkBlue-700 border border-yellow-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="email@mail.com"
                required
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-yellow-300">*Password:</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full p-3 rounded-lg bg-darkBlue-700 border border-yellow-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Type Password"
                required
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-yellow-300">*Confirm Password:</label>
              <input
                type="password"
                {...register('confirmPassword', { required: 'Confirm Password is required' })}
                className="w-full p-3 rounded-lg bg-darkBlue-700 border border-yellow-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Retype Password"
                required
              />
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            {/* Select Game */}
            <div>
              <Controller
                name='game'
                control={control}
                rules={{ required: 'Please select a game' }}
                render={({ field, fieldState }) => (
                  <Select
                    options={games.map((game) => ({
                      label: `${game.name}: ${game.description}`,
                      value: game._id
                    }))}
                    label='*Select Game:'
                    placeholder='Select Game'
                    error={fieldState.error?.message}
                    searchable={true}
                    required
                    {...field}
                  />
                )}
              />

            </div>
          </div>
          {
            selectedGame && <GameServerForm selectedGame={selectedGame} onChange={onServerDetailsUpdate} />
          }

          {/* Spam Check and Terms */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="flex items-center">
              <ReCAPTCHA
                sitekey="6LeeflEqAAAAAKwHiLhi-SGVgwh8DZoytT3ND_IA"
                onChange={onRecaptchaChange}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('termsAccepted', { required: 'You must accept the terms' })}
                className="w-5 h-5 text-yellow-500 bg-darkBlue-700 border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <label className="ml-2 text-yellow-300 text-sm">
                I agree to <a href="#" className="text-yellow-500 underline">Terms & Conditions</a>
              </label>
              {errors.termsAccepted && <p className="text-red-500">{errors.termsAccepted.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full p-3 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-4 text-center text-yellow-300 text-sm">
            Already registered?{' '}
            <Link to="/login" className="text-yellow-500 underline">
              Login Now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
