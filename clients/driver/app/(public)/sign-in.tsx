import { useCallback } from "react";
import { router } from "expo-router";
import { H2 } from "tamagui";
import { LoginForm, LoginFormData } from "tamagui-shared-ui";
import { KeyboardAvoidingComponent } from "expo-shared-ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserGroup } from "utils/constants/user-group";
import { Alert } from "react-native";

import { useSession } from "../../providers/SessionProvider";
import { createCustomToken } from "../../services/authmgmt/customToken";
import { setToken } from "../../services/initClient";
import { whoami } from "../../services/usermgmt/user"

export default function SignIn() {
  const session = useSession();
  const onSubmit = useCallback(async (data: LoginFormData) => {
    try {
      const userCredential = await session?.signIn(data.email, data.password);
      const user = userCredential?.user;
      if (user?.uid) {
        const firebaseToken = await user.getIdToken();
        const token = await createCustomToken({
          uid: user.uid,
          firebaseToken,
          userGroup: UserGroup.DRIVER_GROUP,
        });
        const  userCredential = await session?.signInWithCustomToken(token.customToken);
        const customToken = await userCredential?.user?.getIdToken();
        if (!customToken) {
          await session?.signOut();
          throw new Error("Token is null");
        }
        setToken(customToken || "");
        await whoami();
        router.replace("/");
      } else {
        await session?.signOut();
        console.log("No user id");
        throw new Error("No user id");
      }
    } catch (error: any) {
      await session?.signOut();
      console.error(error);
      Alert.alert("Error", error.message);

    }
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <KeyboardAvoidingComponent>
        <H2 mb="$4">Driver SM</H2>
        <LoginForm onSubmit={onSubmit} title="Sign In" />
      </KeyboardAvoidingComponent>
    </SafeAreaView>
  );
}
