"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login, initialized } from "./slice/userSlice";
import type { AppDispatch } from "./store";

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    axios.get("/api/auth/checkislogin")
      .then(({ data }) => {
        if (data.islogin) {
          dispatch(login({ username: data.user.username, email: data.user.email }));
        }
      })
      .catch(() => {})
      .finally(() => dispatch(initialized()));
  }, [dispatch]);

  return null;
}
