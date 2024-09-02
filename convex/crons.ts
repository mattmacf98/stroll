import { cronJobs } from "convex/server";
import {api} from "./_generated/api"

const crons = cronJobs();

crons.daily(
    "reset strolling status",
    {hourUTC: 4, minuteUTC: 0}, //12am EDT
    api.users.resetStrollStatus
);

crons.daily(
    "clear all strolls daily",
    {hourUTC: 4, minuteUTC: 0}, //12am EDT
    api.strolls.deleteAllStrolls
);

crons.daily(
    "update streaks daily",
    {hourUTC: 4, minuteUTC: 0}, //12am EDT
    api.users.updateAllStreaks
)

export default crons;