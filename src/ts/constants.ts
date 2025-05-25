/**
 * Constants used throughout the elevator simulation system.
 * @file This file contains all the configuration constants for the elevator system.
 */

/** Time in seconds for the elevator to move one floor */
export const SECOND_PER_FLOOR = 0.5;

/** Path to the elevator image file */
export const ELEVATOR_IMAGE_SRC = 'elv.jpg';

/** Height in pixels for each floor representation */
export const FLOOR_HEIGHT = 80;

/** Time in seconds the elevator waits at a floor before moving again */
export const ELEVATOR_WAIT_TIME = 2;

/** Time in milliseconds the elevator waits at a floor before moving again (converted from seconds) */
export const ELEVATOR_WAIT_TIME_MS = ELEVATOR_WAIT_TIME * 1000;

/** Time in milliseconds for the elevator to move one floor (converted from seconds) */
export const SECOND_PER_FLOOR_MS = SECOND_PER_FLOOR * 1000;

/** Path to the sound file played when elevator arrives at a floor */
export const DING_SOUND_SRC = 'ding.mp3';