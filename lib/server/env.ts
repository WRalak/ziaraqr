import "server-only";

const loggedConfigurationIssues = new Set<string>();

function logConfigurationIssue(message: string, variableNames: string[]) {
  const key = `${message}:${variableNames.join(",")}`;
  if (loggedConfigurationIssues.has(key)) return;
  loggedConfigurationIssues.add(key);
  console.error(`[config] ${message}`, { variables: variableNames });
}

export class ServerConfigurationError extends Error {
  constructor(public readonly variableNames: string[]) {
    super("Server configuration is incomplete.");
    this.name = "ServerConfigurationError";
  }
}

export function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD?.trim() ?? "";
  if (!password) {
    logConfigurationIssue("Missing admin authentication environment variable.", [
      "ADMIN_PASSWORD",
    ]);
  }
  return password;
}

export function getSubmissionStorageMode(): "local" | "supabase" {
  const configuredMode = process.env.SUBMISSION_STORAGE?.trim().toLowerCase();

  if (process.env.VERCEL) {
    if (configuredMode === "local") {
      logConfigurationIssue(
        "Local submission storage is not persistent on Vercel; using Supabase.",
        ["SUBMISSION_STORAGE"]
      );
    }
    return "supabase";
  }

  if (!configuredMode) return "local";
  if (configuredMode === "local" || configuredMode === "supabase") {
    return configuredMode;
  }

  logConfigurationIssue("Invalid submission storage mode.", ["SUBMISSION_STORAGE"]);
  throw new ServerConfigurationError(["SUBMISSION_STORAGE"]);
}

export function getSupabaseServerConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
  const missing = [
    !url && "NEXT_PUBLIC_SUPABASE_URL",
    !serviceRoleKey && "SUPABASE_SERVICE_ROLE_KEY",
  ].filter((name): name is string => Boolean(name));

  if (missing.length) {
    logConfigurationIssue("Missing Supabase server environment variables.", missing);
    throw new ServerConfigurationError(missing);
  }

  return { url, serviceRoleKey };
}
