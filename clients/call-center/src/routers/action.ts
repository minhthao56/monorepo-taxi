import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { authWeb } from "utils/firebase/web";
import {UserGroup} from "schema/constants/user-group"
import { createCustomToken } from "../services/authmgmt/customToken";

export async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") || "";
  const password = formData.get("password") || "";

  if (!email) {
    return {
      error: "You must provide a email to log in",
    };
  }

  if (!password) {
    return {
      error: "You must provide a password to log in",
    };
  }

  try {
    const userCredential = await authWeb.signIn(
      email.toString(),
      password.toString()
    );
    if (!userCredential) {
      return {
        error: "Invalid login attempt",
      };
    }
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    const uid = user.uid;
    const resp = await createCustomToken({
      firebaseToken: idToken,
      uid: uid,
      userGroup: UserGroup.ADMIN_GROUP,
    });
    await authWeb.signInWithCustomToken(resp.customToken);
  } catch (error) {
    console.error("--error login--", error);
    await authWeb.signOut();
    return {
      error: "Invalid login attempt",
    };
  }

  const redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

export async function logoutAction() {
  await authWeb.signOut();
  return redirect("/");
}
