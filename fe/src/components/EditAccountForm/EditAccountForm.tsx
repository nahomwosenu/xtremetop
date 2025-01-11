import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GameContext } from "../../context/GameContext";
import { ServerContext } from "../../context/ServerContext";
import { useTranslation } from "../../context/TranslationContext";

const EditAccountForm: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { servers } = useContext(ServerContext);
  const { games } = useContext(GameContext);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: user?.username || "email@mail.com",
    currentPassword: "",
    newPassword: "",
    newsletter: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form validation
    if (formData.currentPassword !== "Password") {
      setError(t("account_settings.error_incorrect_password"));
    } else {
      setError("");
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        {/* Table Header */}
        <h2 className="bg-yellow-500 text-black text-lg font-bold px-6 py-4 rounded-t-lg">
          {t("account_settings.title")}
        </h2>

        {/* Table Form */}
        <form onSubmit={handleSubmit}>
          <table className="w-full table-fixed border-collapse border border-gray-700 text-yellow-300">
            <tbody>
              {/* Email Row */}
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2 font-semibold">{t("account_settings.email")}</td>
                <td className="px-4 py-2">{formData.email}</td>
              </tr>

              {/* Password Row */}
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2 font-semibold">{t("account_settings.password")}</td>
                <td className="px-4 py-2">******</td>
              </tr>

              {/* Current Password Input */}
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2 font-semibold">{t("account_settings.type_current_password")}</td>
                <td className="px-4 py-2">
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-yellow-300 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder={t("account_settings.password")}
                  />
                </td>
              </tr>

              {/* New Password Input */}
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2 font-semibold">{t("account_settings.type_new_password")}</td>
                <td className="px-4 py-2">
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-yellow-300 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder={t("account_settings.password")}
                  />
                </td>
              </tr>

              {/* Newsletter Checkbox */}
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2 font-semibold">{t("account_settings.newsletter")}</td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 focus:ring-yellow-500 rounded"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Submit Button */}
          <div className="px-6 py-4">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {t("account_settings.save_button")}
            </button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 max-w-4xl mx-auto bg-red-600 text-white px-4 py-3 rounded-lg shadow">
          <span className="font-semibold">{t("account_settings.error_prefix")}</span> {error}
        </div>
      )}
    </div>
  );
};

export default EditAccountForm;