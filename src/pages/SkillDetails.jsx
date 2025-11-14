import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import skills from "../data/skills.json";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function SkillDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const s = skills.find((x) => String(x.skillId) === String(id));
    setSkill(s);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👥</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Skill not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The skill you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-blue-400 mb-6 transition-colors duration-200"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform duration-200">
          ←
        </span>
        <span>Back</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="relative">
          <img
            src={skill.image}
            className="w-full h-72 sm:h-80 md:h-96 object-cover"
            alt={skill.skillName}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-sm">
              {skill.skillName}
            </h1>
            <p className="text-white/90 text-lg drop-shadow-sm">
              By {skill.providerName}
            </p>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-lg shadow-md">
            ${skill.price}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-gray-50 dark:bg-gray-700/50 p-4 md:p-6 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white font-semibold text-lg">
                {skill.providerName.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {skill.providerName}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {skill.providerEmail}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full">
                <span className="text-lg">⭐</span>
                <span className="font-semibold">{skill.rating}</span>
              </div>
              <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full">
                <span className="text-lg">👥</span>
                <span>{skill.slotsAvailable} slots</span>
              </div>
              <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">
                <span className="text-lg">📍</span>
                <span>Local</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transform transition-transform hover:scale-105 duration-300">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Category
              </div>
              <div className="font-semibold text-gray-900 dark:text-white text-lg">
                {skill.category}
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transform transition-transform hover:scale-105 duration-300">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Duration
              </div>
              <div className="font-semibold text-gray-900 dark:text-white text-lg">
                1-2 hours
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transform transition-transform hover:scale-105 duration-300">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Level
              </div>
              <div className="font-semibold text-gray-900 dark:text-white text-lg">
                All levels
              </div>
            </div>
          </div>

          <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-orange-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-2">
                ℹ️
              </span>
              About this skill
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {skill.description}
            </p>
          </div>

          <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mr-2">
                📚
              </span>
              What you'll learn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 text-lg flex-shrink-0">
                    ✓
                  </span>
                  <span>Fundamental techniques and principles</span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 text-lg flex-shrink-0">
                    ✓
                  </span>
                  <span>Practical applications and real-world examples</span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 text-lg flex-shrink-0">
                    ✓
                  </span>
                  <span>
                    Collaborative exercises to enhance teamwork skills
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 text-lg flex-shrink-0">
                    ✓
                  </span>
                  <span>
                    Techniques to boost creativity and problem-solving
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 text-lg flex-shrink-0">
                    ✓
                  </span>
                  <span>Real-world projects to build your portfolio</span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 text-lg flex-shrink-0">
                    ✓
                  </span>
                  <span>
                    Access to exclusive tools and software used by professionals
                  </span>
                </div>
              </div>
            </div>
          </div>

          <BookingForm
            skillName={skill.skillName}
            providerName={skill.providerName}
          />
        </div>
      </div>
    </motion.div>
  );
}

function BookingForm({ skillName, providerName }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if user is logged in before allowing booking
    const user = localStorage.getItem("skillswap_user");
    if (!user) {
      toast.error("Please login to book a session");
      // Store the current booking attempt and redirect to login
      localStorage.setItem("post_login_redirect", window.location.pathname);
      localStorage.setItem(
        "pending_booking",
        JSON.stringify({ name, email, date, skillName })
      );
      navigate("/login");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Booking request sent successfully!");
      setName("");
      setEmail("");
      setDate("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-md border border-blue-100 dark:border-gray-600">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
        <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mr-2">
          🗓️
        </span>
        Book a Session
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 ml-10">
        Reserve your spot for{" "}
        <span className="font-semibold text-orange-600 dark:text-orange-400">
          {skillName}
        </span>{" "}
        with{" "}
        <span className="font-semibold text-orange-600 dark:text-orange-400">
          {providerName}
        </span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preferred Date
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
              📅
            </span>
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-1"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : null}
          {isLoading ? "Processing..." : "Book Session"}
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          You'll receive a confirmation email with session details
        </p>
      </form>
    </div>
  );
}
