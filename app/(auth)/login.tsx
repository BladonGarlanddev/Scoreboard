import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Button as StockButton } from "react-native";
import PagerView from "react-native-pager-view";
import { ThemedInput, ThemedText, ThemedImage } from "@/components/";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { theme } from "@/themes/theme"; // Adjust path as needed
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { registerUser, loginUser, getUser } from "@/services/authServices"; // Adjust path as needed
import { account } from "@/lib/appClient";
import type { UserData, UserMetadata } from "@/types/types"
import LogoContainer from "@/components/LogoContainer";
import atheleteImage from "@/assets/images/greek-athelete.png";
import organizerImage from "@/assets/images/greek-organizer.png";

const { width } = Dimensions.get("window");


const Login = () => {
  console.log("Login screen should be getting rendered");
  const dispatch = useDispatch();
  const pagerRef = useRef<PagerView | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  // State
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [repassword, setRepassword] = useState<string | "">("");
  const [firstName, setFirstName] = useState<string | "">("");
  const [lastName, setLastName] = useState<string | "">("");
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [DOB, setDOB] = useState<Date | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [accountType, setAccountType] = useState<
    "athlete" | "organizer" | undefined
  >(undefined);
  const [visible, setVisible] = useState<boolean>(false);

  const [loginEmailError, setLoginEmailError] = useState<string | null>(null);
  const [loginPasswordError, setLoginPasswordError] = useState<string | null>(
    null
  );
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [repasswordError, setRepasswordError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [heightError, setHeightError] = useState<string | null>(null);
  const [DOBError, setDOBError] = useState<string | null>(null);
  const [weightError, setWeightError] = useState<string | null>(null);

  // Called when the scroll animation *finishes* on a new page
  const handlePageChange = (position: number) => {
    if (position === 2 && !accountType) {
      // If the user tries to go to Page 3 without selecting a accountType, prevent it
      setTimeout(() => pagerRef.current?.setPage(1), 0); // ✅ Reset back to Page 2
      return;
    }

    setPageIndex(position);
    // If user just arrived on the "ghost" page (index=2),
    // jump back to the real Page 1 (index=0) *without* animation.
    if (position === 3) {
      pagerRef.current?.setPageWithoutAnimation(0);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      if (user) {
        const userData = await getUser(); // Fetch user details from Appwrite

        if (!userData) {
          console.error("Failed to fetch user data.");
          return; // 🚨 Prevents undefined errors
        }

        dispatch(
          login({
            isVerified: userData.isVerified,
            isAuthenticated: true,
            userMetadata: userData.userMetadata, // Store full user info
          })
        );
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
    
  };

  const handleSignup = async () => {
    console.log("signup triggered")
    try {
      if (!email || !password || !accountType) {
        setEmailError(!email ? "Email is required" : "");
        setPasswordError(!password ? "Password is required" : "");
        console.log("Missing data in email, password, accountType");
        return;
      }

      if (accountType === "athlete" && (!height || !DOB || !weight)) {
        setHeightError(!height ? "Height is required" : "");
        setDOBError(!DOB ? "Date of Birth is required" : "");
        setWeightError(!weight ? "Weight is required" : "");
        console.log("Missing data in height, DOB, or weight");
        return;
      }

      // ✅ Ensure accountType and assumedRole are defined
      const finalAccountType = accountType || "athlete";
      const finalAssumedRole = finalAccountType; // Fixed incorrect assignment

      // ✅ Register user
      const response = await registerUser({ email, password });

      // ✅ Handle API response errors
      if (!response || response.error || !response.user) {
        handleSignupError(response?.error || "An unknown error occurred.");
        console.log("");
        return;
      }

      const userData: UserMetadata = {
        $id: response.user.$id ?? "", // Ensure user ID is properly assigned
        email: response.user.email ?? "",
        accountType: finalAccountType,
        assumedRole: finalAssumedRole,
        firstName: firstName ?? undefined, // Explicitly set undefined
        lastName: lastName ?? undefined,
        weight: weight !== undefined ? weight : undefined, // Explicitly assign undefined if missing
        height: height !== undefined ? height : undefined,
        DOB: DOB ? DOB.toISOString() : undefined, // Convert Date to string or assign undefined
        creationDate: new Date().toISOString(),
      };

      if (response.user) {
        dispatch(
          login({
            isVerified: false,
            isAuthenticated: true,
            userMetadata: userData, // Store full user info in Redux
          })
        );
      }

      console.log("User successfully registered:", response.user);
    } catch (error) {
      console.error("Unexpected error during signup:", error);
      handleSignupError("Unexpected error occurred. Please try again.");
    }
  };



  const handleSignupError = (error: any) => {
    if (!error.response) {
      console.error("Unexpected error structure:", error);
      return;
    }
    if (error.response.match(/email/i)) {
      setEmailError(error.response);
    } else if (error.response.match(/password/i)) {
      setPasswordError(error.response);
    } else {
      console.error("Unhandled error:", error);
    }
  };

  const validateLoginEmail = (text: string) => {
    if (!text.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setLoginEmailError("Invalid email format.");
    } else {
      setLoginEmailError(null);
    }
    setEmail(text);
  };

  const validateLoginPassword = (text: string) => {
    if (text.length < 6) {
      setLoginPasswordError("Password must be at least 6 characters.");
    } else {
      setLoginPasswordError(null);
    }
    setPassword(text);
  };

  const validateEmail = (text: string) => {
    if (!text.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError(null);
    }
    setEmail(text);
  };

  const validatePassword = (text: string) => {
    if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError(null);
    }
    setPassword(text);
  };

  const validateRepassword = (text: string) => {
    if (text !== password) {
      setRepasswordError("Passwords do not match.");
    } else {
      setRepasswordError(null);
    }
    setRepassword(text);
  };

  const validateHeight = (text: string) => {
    if (text.match(/^\d*$/)) {
      setHeight(Number(text) || undefined);
      setHeightError(null);
    } else {
      setHeightError("Height must be a number.");
    }
  };

  const validateWeight = (text: string) => {
    if (text.match(/^\d*$/)) {
      setWeight(Number(text) || undefined);
      setWeightError(null);
    } else {
      setWeightError("Weight must be a number.");
    }
  };

  const validateDOB = (text: string) => {
    const date = new Date(text);
    if (isNaN(date.getTime())) {
      setDOBError("Invalid date format.");
    } else {
      setDOB(date);
      setDOBError(null);
    }
  };

  useEffect(() => {
    if (accountType) {
      setTimeout(() => pagerRef.current?.setPage(2), 60); // Simulate a small delay
    }
  }, [accountType]);

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: theme.colors.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        orientation='vertical'
        onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
      >
        {/* ----------------- Page 1 (real) ----------------- */}
        <View key='page1' style={styles.page}>
          {/* logo container*/}
          <LogoContainer />

          <View style={styles.loginContainer}>
            <View style={styles.loginContent}>
              <ThemedInput
                label='Email'
                onChangeText={validateLoginEmail}
                error={!!loginEmailError}
                value={email}
                mode='outlined'
              />
              {loginEmailError && (
                <ThemedText style={{ color: "red" }}>
                  {loginEmailError}
                </ThemedText>
              )}
              <ThemedInput
                label='Password'
                onChangeText={validateLoginPassword}
                value={password}
                secureTextEntry
                error={!!loginPasswordError}
              />
              {loginPasswordError && (
                <ThemedText style={{ color: "red" }}>
                  {loginPasswordError}
                </ThemedText>
              )}
              {/* Go to page 2 on button press */}
              <Button mode='contained' onPress={handleLogin}>
                Login
              </Button>
            </View>
          </View>
        </View>
        {/* ----------------- Page 2 (real) ----------------- */}
        <View key='page2' style={styles.selectionPage}>
          <TouchableOpacity
            style={styles.selectionButtons}
            onPress={() => {
              setAccountType(undefined);
              setTimeout(() => {
                setAccountType("athlete"); // Set new accountType after delay
              }, 0);
            }}
          >
            <ThemedImage
              source={atheleteImage}
              style={[
                styles.selectionImages,
                { marginRight: theme.spacing(3) },
              ]}
              type={"image"}
            />
            <ThemedText variant='titleMedium'>Athlete</ThemedText>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              maxHeight: 60,
            }}
          >
            <View style={[styles.line, { height: 2 }]} />
            <ThemedText
              variant='titleLarge'
              style={{
                marginHorizontal: theme.spacing(1),
                fontFamily: "BebasNeue-regular",
              }}
            >
              OR
            </ThemedText>
            <View style={[styles.line, { height: 2 }]} />
          </View>

          <TouchableOpacity
            style={styles.selectionButtons}
            onPress={() => {
              setAccountType(undefined);
              setTimeout(() => {
                setAccountType("organizer"); // Set new accountType after delay
              }, 0);
            }}
          >
            <ThemedText variant='titleMedium'>Organizer</ThemedText>
            <ThemedImage
              source={organizerImage}
              style={[styles.selectionImages]}
              type={"image"}
            />
          </TouchableOpacity>
        </View>
        {/* ----------------- Page 3 (real) ----------------- */}

        <View key='page3' style={styles.signupPage}>
          {accountType === "athlete" ? (
            <>
              <ThemedInput
                label='Email'
                onChangeText={validateEmail}
                value={email}
                error={!!emailError}
              />
              {emailError && (
                <ThemedText style={{ color: "red" }}>{emailError}</ThemedText>
              )}

              <ThemedInput
                label='Password'
                onChangeText={validatePassword}
                value={password}
                secureTextEntry
                error={!!passwordError}
              />
              {passwordError && (
                <ThemedText style={{ color: "red" }}>
                  {passwordError}
                </ThemedText>
              )}

              <ThemedInput
                label='Confirm Password'
                onChangeText={validateRepassword}
                value={repassword}
                secureTextEntry
                error={!!repasswordError}
              />
              {repasswordError && (
                <ThemedText style={{ color: "red" }}>
                  {repasswordError}
                </ThemedText>
              )}

              <ThemedInput
                label='Height'
                onChangeText={validateHeight}
                value={height ? String(height) : ""}
                error={!!heightError}
              />
              {heightError && (
                <ThemedText style={{ color: "red" }}>{heightError}</ThemedText>
              )}

              <ThemedInput
                label='Weight'
                onChangeText={validateWeight}
                value={weight ? String(weight) : ""}
                error={!!weightError}
              />
              {weightError && (
                <ThemedText style={{ color: "red" }}>{weightError}</ThemedText>
              )}

              <ThemedInput
                label='DOB'
                onFocus={() => setVisible(true)}
                value={DOB ? DOB.toISOString().split("T")[0] : ""}
                error={!!DOBError}
                onChangeText={validateDOB}
              />
              {DOBError && (
                <ThemedText style={{ color: "red" }}>{DOBError}</ThemedText>
              )}

              <DatePickerModal
                
                mode='single'
                visible={visible}
                onDismiss={() => setVisible(false)}
                onConfirm={(params) => {
                  setVisible(false);
                  setDOB(params.date); // ✅ Safe Date Selection
                }}
              />

              <Button mode='contained' onPress={handleSignup}>
                Signup
              </Button>
            </>
          ) : accountType === "organizer" ? (
            <>
              <ThemedInput
                label='Email'
                onChangeText={setEmail}
                value={email}
              />
              <ThemedInput
                label='Password'
                onChangeText={setPassword}
                value={password}
              />
              <ThemedInput
                label='Confirm Password'
                onChangeText={setRepassword}
                value={repassword}
              />

              <Button
                mode='contained'
                onPress={() => pagerRef.current?.setPage(0)}
              >
                Restart
              </Button>
            </>
          ) : (
            <></>
          )}
        </View>

        {/* ----------------- Page 4 (ghost of Page 1) ----------------- */}
        <View key='ghostpage' style={styles.page}>
          {/* logo container*/}
          <LogoContainer />

          <View style={styles.loginContainer}>
            <View style={styles.loginContent}>
              <ThemedInput
                label='Email'
                onChangeText={() => {}}
                error={!!loginEmailError}
                value={email}
                mode='outlined'
              />
              {loginEmailError && (
                <ThemedText style={{ color: "red" }}>
                  {loginEmailError}
                </ThemedText>
              )}
              <ThemedInput
                label='Password'
                onChangeText={() => {}}
                value={password}
                secureTextEntry
                error={!!loginPasswordError}
              />
              {loginPasswordError && (
                <ThemedText style={{ color: "red" }}>
                  {loginPasswordError}
                </ThemedText>
              )}
              {/* Go to page 2 on button press */}
              <Button mode='contained' onPress={() => {}}>
                Login
              </Button>
            </View>
          </View>
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    alignItems: "center",
  },
  page: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: theme.colors.primary,
  },
  selectionPage: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "space-evenly",
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(10),
  },
  signupPage: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "space-evenly",
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(10),
  },
  line: {
    height: 1, // Line thickness
    backgroundColor: theme.colors.black, // Line color
    width: 60,
  },
  loginContainer: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.roundness,
    borderTopRightRadius: theme.roundness,
    width: width,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    height: "60%",
    position: "absolute",
    bottom: 0, // Anchors to the bottom
    left: 0,
    right: 0,
  },
  logoContainer: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContent: {
    justifyContent: "space-evenly",
    flex: 1,
  },
  selectionImages: {
    width: "100%",
  },
  selectionButtons: {
    flex: 1, // Takes up available space in the parent
    alignItems: "center", // ✅ Centers image and text horizontally
    justifyContent: "center", // ✅ Ensures spacing is balanced
    flexDirection: "column", // ✅ Stacks items vertically
    borderColor: "red",
    borderWidth: 1, // For debugging
    width: "100%", // ✅ Ensures full width
    height: 1,
    paddingVertical: theme.spacing(2), // Adds spacing
  },
});

export default Login;
