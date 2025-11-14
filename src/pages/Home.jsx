import React, { useMemo, useState } from "react";
import skillsData from "../data/skills.json";
import eventsData from "../data/events.json";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { Search, Filter, Star, Users, Calendar } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(skillsData.map((s) => s.category)))],
    []
  );

  const filtered = skillsData.filter(
    (s) =>
      (category === "All" || s.category === category) &&
      (s.skillName.toLowerCase().includes(query.toLowerCase()) ||
        s.providerName.toLowerCase().includes(query.toLowerCase()))
  );

  // Derive top providers from JSON data (skills.json)
  const topProviders = useMemo(() => {
    const bestByProvider = new Map();
    for (const s of skillsData) {
      const prev = bestByProvider.get(s.providerName);
      if (!prev || s.rating > prev.rating) {
        bestByProvider.set(s.providerName, {
          name: s.providerName,
          title: s.skillName,
          rating: s.rating,
          reviews: undefined,
        });
      }
    }
    return Array.from(bestByProvider.values())
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }, []);

  return (
    <div className="space-y-18">
      <Hero setQuery={setQuery} />

      <section
        id="popular"
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 my-10"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Top Skills
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills or providers..."
                className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 w-full lg:w-80 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl appearance-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No skills found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <SkillCard key={s.skillId} skill={s} />
            ))}
          </div>
        )}
      </section>

      <section className="grid lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Top Rated Providers
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Hand-picked professionals with excellent reviews and ratings
          </p>
          <div className="space-y-4">
            {topProviders.map((p) => (
              <ProviderCard
                key={p.name}
                name={p.name}
                title={p.title}
                rating={p.rating}
                reviews={p.reviews}
              />
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Events & Meetups
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join workshops, meetups, and skill-swap sessions near you
          </p>
          <div className="space-y-4">
            {eventsData.map((e) => (
              <EventCard
                key={e.title}
                title={e.title}
                time={e.time}
                location={e.location}
                icon={e.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTA />
    </div>
  );
}

function SkillCard({ skill }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={skill.image}
          alt={skill.skillName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          ${skill.price}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
              {skill.skillName}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {skill.providerName}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm">
            <span className="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-orange-700 dark:text-blue-300 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {skill.rating}
            </span>
            <span className="inline-flex items-center text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4 mr-1" />
              {skill.slotsAvailable} slots
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link
            to={`/skill/${skill.skillId}`}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            View Details
          </Link>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
            {skill.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Hero({ setQuery }) {
  return (
    <div className="relative bg-gradient-to-br from-orange-500 via-orange-700 to-red-600 rounded-2xl p-8 lg:p-12 overflow-hidden">
      <div className="relative z-10 flex flex-col gap-7 items-center justify-between">
        <div className="lg:w-1/2 mb-8 lg:mb-0 ">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Unlock Your Potential
            <br />
            Through Skill Exchange.
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-lg ">
            Build real connections, explore new talents, and empower others
            through shared learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for 'web', 'painting', 'language'..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="w-full ">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4000 }}
            className="rounded-xl overflow-hidden "
          >
            <SwiperSlide>
              <div
                className="relative h-80 rounded-xl overflow-hidden text-white group"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="relative z-10 p-8 flex flex-col justify-center h-full">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Try a Free Session
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Experience learning with no commitment
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="relative h-80 rounded-xl overflow-hidden text-white group"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                <div className="relative z-10 p-8 flex flex-col items-start justify-center h-full">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-1">
                    Join a Live Workshop
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Learn hands-on skills directly from local experts
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="relative h-80 rounded-xl overflow-hidden text-white group"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                <div className="relative z-10 p-8 flex flex-col justify-center h-full">
                  <div className="w-14 h-14 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-1">
                    Exchange Your Skills
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Trade what you know and learn something new
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="relative h-80 rounded-xl overflow-hidden text-white group"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/60 via-black/50 to-transparent group-hover:from-indigo-800/70 transition-all duration-300"></div>
                <div className="relative z-10 p-8 flex flex-col justify-center h-full">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Learn Anytime, Anywhere
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Join flexible online sessions that fit your schedule
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
    </div>
  );
}

function ProviderCard({ name, title, rating, reviews }) {
  return (
    <div className="flex   items-center space-x-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
      <div className="flex-1 text-center space-y-6">
        <div className="font-semibold text-gray-900 dark:text-white">
          {name}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
        <div className="flex items-center space-x-2 mt-1 justify-center">
          <div className="flex items-center ">
            <Star className="w-4 h-4 text-amber-500 fill-current" />
            <span className="text-sm font-medium ml-1">{rating}</span>
          </div>
          {reviews != null && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {reviews} reviews
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EventCard({ title, time, location, icon }) {
  return (
    <div className="flex flex-col gap-6 items-center space-x-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white text-xl">
        {icon}
      </div>
      <div className="flex-1 text-center">
        <div className="font-semibold text-gray-900 dark:text-white">
          {title}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2 mt-1">
          <span>{time}</span>
          <span className="text-gray-400">•</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Hear From Our Learners
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Discover what our community loves about SkillSwap
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TestimonialCard
          name="Liam Chen"
          role="Photography Student"
          text="I found an amazing photography mentor nearby! The lessons are hands-on and easy to follow. Truly inspiring."
          avatar="L"
        />
        <TestimonialCard
          name="Sofia Morales"
          role="Language Learner"
          text="Learning Spanish has never been so interactive. The platform made it easy to connect with native speakers and practice every week."
          avatar="S"
        />
        <TestimonialCard
          name="Arjun Mehta"
          role="Fitness Coach"
          text="I love offering yoga sessions here. The community is supportive, and I get to meet learners who are genuinely motivated."
          avatar="A"
        />
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, text, avatar }) {
  return (
    <div className="bg-orange-500  p-6 rounded-xl border border-gray-100 ">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-700 flex items-center justify-center text-white font-semibold">
          {avatar}
        </div>
        <div className="ml-4">
          <div className="font-semibold text-gray-900 ">{name}</div>
          <div className="text-sm text-gray-600 ">{role}</div>
        </div>
      </div>
      <p className="text-gray-700  ">"{text}"</p>
    </div>
  );
}

function CTA() {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8 lg:p-12 rounded-2xl text-white mt-10">
      <div className="flex flex-col gap-10  items-center justify-between">
        <div className="lg:w-2/3 mb-6 lg:mb-0">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Kickstart Your Learning Adventure Today!
          </h3>
          <p className="text-blue-100 text-lg">
            Become part of our vibrant community today. Set up your profile,
            share your skills, or book your first session in just a few minutes.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/signup"
            className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            Create Account
          </a>
          <a
            href="#popular"
            className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200 text-center"
          >
            Browse Skills
          </a>
        </div>
      </div>
    </div>
  );
}
