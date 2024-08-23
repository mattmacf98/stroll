import { cronJobs } from "convex/server";
import {api} from "./_generated/api"

const crons = cronJobs();

crons.daily(
    "reset strolling status",
    {hourUTC: 4, minuteUTC: 0}, //12am EDT
    api.users.resetStrollStatus
)