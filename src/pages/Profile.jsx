import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { Edit2, Save, X, User, Mail } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const u = auth.currentUser;
    if (u) {
      setUser(u);
      setName(u.displayName || "");
      setPhoto(u.photoURL || "");
    } else {
      const lu = JSON.parse(localStorage.getItem("skillswap_user") || "null");
      if (lu) {
        setUser(lu);
        setName(lu.displayName || "");
        setPhoto(lu.photoURL || "");
      }
    }
  }, []);

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Please enter a display name");
      return;
    }

    setIsLoading(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name.trim(),
          photoURL: photo.trim() || null,
        });
        setUser(auth.currentUser);
        toast.success("Profile updated successfully");
      } else {
        const updated = {
          ...user,
          displayName: name.trim(),
          photoURL: photo.trim() || null,
        };
        localStorage.setItem("skillswap_user", JSON.stringify(updated));
        setUser(updated);
        toast.success("Profile updated successfully");
      }
      setEditing(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-700/60">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Please login to view your profile
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-6 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm ring-1 ring-gray-200/70 dark:ring-gray-700/60 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-500 p-8 sm:p-10 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.displayName || user.email
                    )}&background=0D8ABC&color=fff`
                  }
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-white/20 object-cover"
                  alt="Profile"
                />
                {editing && (
                  <div className="absolute bottom-0 right-0 bg-red-600 rounded-full p-2 ring-2 ring-white">
                    <Edit2 className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-extrabold">
                  {user.displayName || "Anonymous User"}
                </h1>
                <p className="text-white/90 flex items-center justify-center sm:justify-start mt-2">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm">
                    Member
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Profile Information
              </h2>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm disabled:opacity-60 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isLoading ? "Saving..." : "Save Changes"}</span>
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-500 hover:bg-slate-600 text-white shadow-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {!editing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InfoField
                  label="Display Name"
                  value={user.displayName || "Not set"}
                />
                <InfoField label="Email" value={user.email} />
                <InfoField
                  label="User ID"
                  value={user.uid || "Local account"}
                />
                <InfoField
                  label="Account Type"
                  value={auth.currentUser ? "Firebase" : "Local"}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    placeholder="Enter your display name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Photo URL
                  </label>
                  <input
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    placeholder="Enter photo URL (optional)"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Provide a URL to your profile picture. Leave empty to use
                    default avatar.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </label>
      <p className="text-gray-900 dark:text-white font-medium break-all">
        {value}
      </p>
    </div>
  );
}
