import {
    SECOND_PER_FLOOR,
    SECOND_PER_FLOOR_MS,
    DING_SOUND_SRC,
    ELEVATOR_WAIT_TIME_MS
} from './constants';

/**
 * Represents a floor in a building with functionality related to elevator calls.
 * Handles floor UI elements, button interactions and arrival notifications.
 */
export default class Floor {
    #isWaiting = false; //Indicates if the floor is waiting for an elevator
    #number: number; // The floor number
    #arrivalTime = 0; // Time remaining until elevator arrival (in seconds)
    private timerElement: HTMLDivElement; // Element displaying arrival time
    private buttonElement: HTMLButtonElement; // Button to call elevator
    private panelElement: HTMLDivElement; // Container for the button and timer
    #floorElement: HTMLDivElement; // Main floor element
    private timer: NodeJS.Timeout | null = null; // Timer for countdown display
    private audio: HTMLAudioElement; // Sound played when elevator arrives

    /**
     * Creates a new Floor instance.
     * @param number - The floor number (0 for ground floor, 1 for first floor, etc.)
     */
    constructor(number: number) {
        this.#number = number;
        this.timerElement = this.createTimerElement();
        this.buttonElement = this.createButtonElement();
        this.panelElement = this.createPanel();
        this.#floorElement = this.createFloorElement();
        this.audio = this.createAudioElement();
    }

    /**
     * Creates the main floor DOM element.
     * @returns The created floor element
     */
    private createFloorElement(): HTMLDivElement {
        const blackLine = document.createElement('div');
        const floorElement = document.createElement('div');
        floorElement.className = 'floor';
        blackLine.className = 'blackline';
        floorElement.appendChild(blackLine);
        floorElement.appendChild(this.panelElement);

        return floorElement;
    }

    /**
     * Creates the elevator call button element.
     * @returns The created button element
     */
    private createButtonElement(): HTMLButtonElement {
        const buttonElement = document.createElement('button');
        buttonElement.className = 'metal linear';
        buttonElement.innerText = `${this.#number}`;

        return buttonElement;
    }

    /**
     * Creates the timer display element.
     * @returns The created timer element
     */
    private createTimerElement(): HTMLDivElement {
        const timerElement = document.createElement('div');
        const time = document.createElement('div');
        timerElement.className = 'timer';
        time.className = 'timer-text';
        timerElement.appendChild(time);

        return timerElement;
    }

    /**
     * Creates the panel containing button and timer elements.
     * @returns The created panel element
     */
    private createPanel(): HTMLDivElement {
        const panelElement = document.createElement('div');
        panelElement.className = 'floor-panel';
        panelElement.appendChild(this.buttonElement);
        panelElement.appendChild(this.timerElement);

        return panelElement;
    }

    /**
     * Creates the audio element for arrival notification.
     * @returns The created audio element
     */
    private createAudioElement(): HTMLAudioElement {
        const audio = new Audio(DING_SOUND_SRC);
        return audio;
    }

    public get floorElement(): HTMLDivElement {
        return this.#floorElement;
    }

    public get number(): number {
        return this.#number;
    }

    public get isWaiting(): boolean {
        return this.#isWaiting;
    }

    public set isWaiting(value: boolean) {
        this.#isWaiting = value;
    }

    public get arrivalTime(): number {
        return this.#arrivalTime;
    }

    /** 
     * Sets the arrival time and starts the countdown timer.
     * @param time - Time in seconds until the elevator arrival
     */
    public set arrivalTime(time: number) {
        this.#arrivalTime = time;
        // set button color to green to indicate waiting for elevator
        this.buttonElement.style.color = 'rgb(23, 212, 33)'; 

        // Schedule the arrival operations when time elapses
        setTimeout(() => {
            this.arrivalOperations();
        }, this.#arrivalTime * 1000);


        this.activateTimer();
    }
    
    /**
     * Activates the countdown timer display.
     */
    private activateTimer(): void {
        const timeText = this.timerElement.querySelector('.timer-text') as HTMLDivElement;
        timeText.innerText = `${this.#arrivalTime.toFixed(1)}`;
        this.timer = setInterval(() => {
            if (this.#arrivalTime > SECOND_PER_FLOOR) {
                this.#arrivalTime -= SECOND_PER_FLOOR;
                timeText.innerText = `${this.#arrivalTime.toFixed(1)}`;
            } else {
                timeText.innerText = ''; 
                this.stopTimer();
            }
        }, SECOND_PER_FLOOR_MS);
    }

    /**
     * Stops the countdown timer.
     */
    private stopTimer(): void {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    /**
     * Handles operations when elevator arrives:
     * - Resets button color
     * - Plays ding sound
     * - Resets waiting status 
     */
    private arrivalOperations(): void {
        this.buttonElement.style.color = ''; // Reset button color
        this.audio.play(); // Play ding sound
        setTimeout(() => {
            this.isWaiting = false; 
            this.audio.pause();
            this.audio.currentTime = 0;
        }, ELEVATOR_WAIT_TIME_MS);
    }

    /**
     * Adds a click event listener to the floor button
     * @param callback - Function to call when button is clicked
     */
    public addButtonListener(callback: (floor: number) => void): void {
        this.buttonElement.addEventListener('click', () => {
            callback(this.#number);
        });
    }

}
