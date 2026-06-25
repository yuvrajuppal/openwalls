import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Mail, Lock, User, Eye, EyeOff, RefreshCw } from "lucide-react-native";
import { router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { useUser } from "../../context/UserContext";

export default function SignupScreen() {
  const { signup } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    setError("");
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await signup(username, email, password);
      toast.show("Account created successfully", { type: "success" });
      router.back();
    } catch (err: any) {
      const message = err.response?.data?.error || "Signup failed. Please try again.";
      setError(message);
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-6 pt-12 pb-8 justify-center min-h-screen">
        <View className="max-w-md w-full self-center">
          <View className="border-l-4 border-white pl-4 mb-12">
            <Text className="text-xs text-neutral-400 uppercase tracking-[0.2em] mb-2">Get started</Text>
            <Text className="text-3xl font-bold text-white tracking-tight uppercase">Create Account</Text>
          </View>

          <View className="gap-6">
            <View>
              <View className="flex-row items-center border-2 border-white">
                <View className="pl-4">
                  <User size={20} color="#737373" />
                </View>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Username"
                  placeholderTextColor="#737373"
                  autoCapitalize="none"
                  className="flex-1 h-14 px-4 text-white"
                />
              </View>
            </View>

            <View>
              <View className="flex-row items-center border-2 border-white">
                <View className="pl-4">
                  <Mail size={20} color="#737373" />
                </View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email address"
                  placeholderTextColor="#737373"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 h-14 px-4 text-white"
                />
              </View>
            </View>

            <View>
              <View className="flex-row items-center border-2 border-white">
                <View className="pl-4">
                  <Lock size={20} color="#737373" />
                </View>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#737373"
                  secureTextEntry={!showPassword}
                  className="flex-1 h-14 px-4 text-white"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pr-4">
                  {showPassword ? <EyeOff size={20} color="#737373" /> : <Eye size={20} color="#737373" />}
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <View className="flex-row items-center border-2 border-white">
                <View className="pl-4">
                  <Lock size={20} color="#737373" />
                </View>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm password"
                  placeholderTextColor="#737373"
                  secureTextEntry={!showConfirm}
                  className="flex-1 h-14 px-4 text-white"
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} className="pr-4">
                  {showConfirm ? <EyeOff size={20} color="#737373" /> : <Eye size={20} color="#737373" />}
                </TouchableOpacity>
              </View>
            </View>

            {error && <Text className="text-xs text-red-500">{error}</Text>}

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              className="h-14 bg-white items-center justify-center active:opacity-80"
            >
              {loading ? (
                <RefreshCw size={16} color="black" />
              ) : (
                <Text className="text-sm font-semibold text-black uppercase tracking-wider">Create Account</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-4 my-10">
            <View className="flex-1 h-px bg-neutral-700" />
            <Text className="text-xs text-neutral-400 uppercase tracking-[0.2em]">or</Text>
            <View className="flex-1 h-px bg-neutral-700" />
          </View>

          <TouchableOpacity onPress={() => router.back()} className="items-center">
            <Text className="text-sm text-neutral-400">
              Already have an account? <Text className="text-white font-bold underline">Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
