"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type RegisterFormData = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    console.log("Register Data:", data);
    // TODO: Add registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-foreground">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background-lighter border border-border p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl text-foreground font-bold mb-6 text-center">Register</h2>

        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
            {errors.username && (
              <span className="text-red-500 text-xs float-end">
                {errors.username.message}
              </span>
            )}
          </label>
          <input
            id="username"
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            className="w-full px-3 py-2 bg-transparent border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
            placeholder="JohnDoe"
          />
        </div>

        {/* First Name Field */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name
            {errors.firstName && (
              <span className="text-red-500 text-xs float-end">
                {errors.firstName.message}
              </span>
            )}
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName", {
              required: "First name is required",
            })}
            className="w-full px-3 py-2 bg-transparent border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
            placeholder="John"
          />
        </div>

        {/* Last Name Field */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last Name
            {errors.lastName && (
              <span className="text-red-500 text-xs float-end">
                {errors.lastName.message}
              </span>
            )}
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName", {
              required: "Last name is required",
            })}
            className="w-full px-3 py-2 bg-transparent border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
            placeholder="Doe"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
            {errors.email && (
              <span className="text-red-500 text-xs float-end">
                {errors.email.message}
              </span>
            )}
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address",
              },
            })}
            className="w-full px-3 py-2 bg-transparent border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
            placeholder="johndoe@email.com"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
            {errors.password && (
              <span className="text-red-500 text-xs float-end">
                {errors.password.message}
              </span>
            )}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-2 bg-transparent border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
              placeholder="•••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                <EyeOff className="text-gray-400 hover:text-accent-blue" />
              ) : (
                <Eye className="text-gray-400 hover:text-accent-blue" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-accent-blue"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
