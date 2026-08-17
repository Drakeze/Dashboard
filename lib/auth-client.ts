import { createAuthClient } from 'better-auth/react';

// No baseURL — defaults to same-origin requests, correct for this single-app setup.
export const authClient = createAuthClient();

export const { signIn, signOut, useSession } = authClient;
