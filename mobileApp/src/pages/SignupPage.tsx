import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../navcomponents/StackNav'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const C = {
  primary: '#000000',
  onPrimary: '#ffffff',
  secondary: '#555555',
  outlineVariant: '#cfc4c5',
  background: '#f9f9f9',
  error: '#ef4444',
}

export default function SignupPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameFocused, setNameFocused] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmFocused, setConfirmFocused] = useState(false)

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerLabel}>Get started</Text>
            <Text style={styles.headerTitle}>Create Account</Text>
          </View>

          <View style={styles.form}>
            <View style={[styles.fieldShadow, nameFocused && styles.fieldShadowFocused]}>
              <View
                style={[
                  styles.fieldContainer,
                  {
                    transform: [
                      { translateX: nameFocused ? -8 : -4 },
                      { translateY: nameFocused ? -8 : -4 },
                    ],
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="account-outline"
                  size={20}
                  color={nameFocused ? C.primary : C.secondary}
                  style={styles.fieldIcon}
                />
                <TextInput
                  style={styles.fieldInput}
                  value={username}
                  onChangeText={setUsername}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  placeholder="Username"
                  placeholderTextColor={C.secondary}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={[styles.fieldShadow, emailFocused && styles.fieldShadowFocused]}>
              <View
                style={[
                  styles.fieldContainer,
                  {
                    transform: [
                      { translateX: emailFocused ? -8 : -4 },
                      { translateY: emailFocused ? -8 : -4 },
                    ],
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={emailFocused ? C.primary : C.secondary}
                  style={styles.fieldIcon}
                />
                <TextInput
                  style={styles.fieldInput}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="Email address"
                  placeholderTextColor={C.secondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={[styles.fieldShadow, passwordFocused && styles.fieldShadowFocused]}>
              <View
                style={[
                  styles.fieldContainer,
                  {
                    transform: [
                      { translateX: passwordFocused ? -8 : -4 },
                      { translateY: passwordFocused ? -8 : -4 },
                    ],
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color={passwordFocused ? C.primary : C.secondary}
                  style={styles.fieldIcon}
                />
                <TextInput
                  style={styles.fieldInput}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="Password"
                  placeholderTextColor={C.secondary}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  activeOpacity={0.6}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={C.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.fieldShadow, confirmFocused && styles.fieldShadowFocused]}>
              <View
                style={[
                  styles.fieldContainer,
                  {
                    transform: [
                      { translateX: confirmFocused ? -8 : -4 },
                      { translateY: confirmFocused ? -8 : -4 },
                    ],
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color={confirmFocused ? C.primary : C.secondary}
                  style={styles.fieldIcon}
                />
                <TextInput
                  style={styles.fieldInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setConfirmFocused(true)}
                  onBlur={() => setConfirmFocused(false)}
                  placeholder="Confirm password"
                  placeholderTextColor={C.secondary}
                  secureTextEntry={!showConfirm}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirm(!showConfirm)}
                  style={styles.eyeButton}
                  activeOpacity={0.6}
                >
                  <MaterialCommunityIcons
                    name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={C.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.8}
          >
            <Text style={styles.submitText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.signupText}>
            Already have an account?{' '}
            <Text style={styles.signupLink} onPress={() => navigation.goBack()}>Sign in</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 96,
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  header: {
    marginBottom: 48,
    borderLeftWidth: 4,
    borderLeftColor: C.primary,
    paddingLeft: 24,
  },
  headerLabel: {
    fontSize: 12,
    letterSpacing: 2.4,
    fontWeight: '500',
    color: C.secondary,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    lineHeight: 38.4,
    letterSpacing: -0.64,
    fontWeight: '700',
    color: C.primary,
    textTransform: 'uppercase',
  },
  form: {
    gap: 32,
  },
  fieldShadow: {
    height: 56,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  fieldShadowFocused: {
    backgroundColor: C.primary,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 2,
    borderColor: C.primary,
    backgroundColor: C.background,
  },
  fieldIcon: {
    marginLeft: 20,
  },
  fieldInput: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 8,
    height: '100%',
    fontSize: 16,
    color: C.primary,
  },
  eyeButton: {
    paddingRight: 20,
    paddingLeft: 12,
    paddingVertical: 18,
  },
  submitButton: {
    width: '100%',
    height: 56,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  submitText: {
    color: C.onPrimary,
    fontSize: 12,
    letterSpacing: 0.6,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: C.outlineVariant,
  },
  dividerText: {
    fontSize: 12,
    letterSpacing: 2.4,
    fontWeight: '500',
    color: C.secondary,
    textTransform: 'uppercase',
    marginHorizontal: 16,
  },
  signupText: {
    textAlign: 'center',
    fontSize: 16,
    color: C.secondary,
  },
  signupLink: {
    color: C.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
})
