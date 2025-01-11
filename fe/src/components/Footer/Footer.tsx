import React, { FC, useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTelegramPlane,
  FaTwitterSquare,
  FaDiscord,
  FaFacebookSquare
} from 'react-icons/fa';
import { RiDiscordFill, RiFacebookCircleFill, RiInstagramFill, RiTelegramFill, RiTwitterFill, RiYoutubeFill } from 'react-icons/ri';

interface FooterProps { }

const Footer: FC<FooterProps> = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 5,
    minutes: 30,
  });

  const [serverCount, setServerCount] = useState(21345);
  useEffect(() => {
    // Countdown Logic
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        let { days, hours, minutes } = prev;

        if (minutes > 0) {
          minutes -= 1;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
        } else {
          clearInterval(countdownInterval); // Stop countdown if time reaches 0
        }

        return { days, hours, minutes };
      });
    }, 60000); // Update every minute
    const countUp = setInterval(() => setServerCount(serverCount + (Math.floor(Math.random() * 9) + 1)), 500);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(countUp);
    }
  }, []);

  return (
    <footer className='w-full text-[#687b92] font-roman'>
      {/* Top section */}
      <div className='bg-[#133155] py-4 w-full h-auto'>
        <div className='flex justify-between items-center mx-auto px-4 md:px-8'>
          <div className='flex justify-between items-center'>
            <p className='text-sm text-white flex-1 md:text-left px-2'>
              Connect With Us
            </p>

            <div className='flex space-x-4 px-2'>
              <a href='#' className='hover:text-white'>
                <RiFacebookCircleFill size={20} />
              </a>
              <a href='#' className='hover:text-white'>
                <RiInstagramFill size={20} />
              </a>
              <a href='#' className='hover:text-white'>
                <RiYoutubeFill size={20} />
              </a>
              <a href='#' className='hover:text-white'>
                <RiTelegramFill size={20} />
              </a>
              <a href='#' className='hover:text-white'>
                <RiTwitterFill size={20} />
              </a>
              <a href='#' className='hover:text-white'>
                <RiDiscordFill size={20} />
              </a>
            </div>
          </div>
          <div className='flex-1 text-sm md:text-right mt-2 md:mt-0'>
            <a href='#' className='hover:text-blue-500 text-white mr-4'>
              Forum
            </a>
            <span className='mr-2 text-white'>|</span>
            <a href='#' className='hover:text-blue-500 text-white mr-4'>
              Terms
            </a>
            <span className='mr-2 text-white'>|</span>
            <a href='#' className='hover:text-blue-500 text-white mr-4'>
              Privacy
            </a>
            <span className='mr-2 text-white'>|</span>
            <a href='#' className='hover:text-blue-500 text-white mr-4'>
              FAQ
            </a>
            <span className='mr-2 text-white'>|</span>
            <a href='#' className='hover:text-blue-500 text-white'>
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className='bg-[#161b33] flex items-center justify-center py-4 px-4 md:px-8 w-full h-auto border-t border-t-[#F6B723]'>
        <div className='flex justify-between items-center mx-auto px-2 md:px-1 w-full'>
          <div className='flex-1 text-center md:text-left text-white text-sm'>
            © {new Date().getFullYear()} All Rights Reserved || XTREAMETOP
          </div>
          <div className='flex-1 text-center text-sm text-white'>
            Toplist reset in{' '}
            <span>
              {timeRemaining.days} days, {timeRemaining.hours} hours, and{" "}
              {timeRemaining.minutes} minutes
            </span>
          </div>
          <div className='flex-1 text-center md:text-right text-sm text-white'>
            Tracking {serverCount.toLocaleString()} servers
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
