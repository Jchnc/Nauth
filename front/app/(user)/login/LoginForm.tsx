"use client";
import { Eye, EyeOff, LogIn } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/app/lib/utils";

type LoginFormData = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log("Login Data:", data);
    // TODO: Add login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-0 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-dark-3 p-8 border bg-background-lighter border-border  rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
                <EyeOff className="text-foreground-muted hover:text-accent-blue" />
              ) : (
                <Eye className="text-foreground-muted hover:text-accent-blue" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={cn(
            "w-full bg-accent-blue text-white py-2 px-4 rounded-md hover:bg-accent-blue-muted focus:outline-none focus:ring-2 focus:ring-accent-blue",
            "flex items-center gap-2 justify-center"
          )}
        >
          <LogIn size={20} />
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
