import { createContext } from 'react';
import { DateTime } from 'luxon';


const CurrentTimeContext = createContext(DateTime.now());
export default CurrentTimeContext;
