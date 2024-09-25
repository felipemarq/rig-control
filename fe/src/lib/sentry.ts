import * as Sentry from "@sentry/react";

Sentry.init({
  enabled: import.meta.env.PROD,
  dsn: "https://b44023fbcbdc7213605016570776d3b9@o4508013759102976.ingest.us.sentry.io/4508013767819264",
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [/^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
