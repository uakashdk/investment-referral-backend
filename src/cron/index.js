import startROICron from "./roi.cron.js";

/**
 * Register All Cron Jobs
 */
const startCronJobs = () => {
  console.log("=======================================");
  console.log("Starting Cron Jobs...");
  console.log("=======================================");

  /**
   * Daily ROI Distribution Cron
   */
  startROICron();

  console.log("✓ ROI Cron Registered");
  console.log("=======================================");
};

export default startCronJobs;