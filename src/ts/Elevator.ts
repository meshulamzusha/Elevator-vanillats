import {
    SECOND_PER_FLOOR,
    SECOND_PER_FLOOR_MS,
    ELEVATOR_IMAGE_SRC,
    FLOOR_HEIGHT
} from './constants';

/**
 * Represents an elevator in a building.
 * Handles elevator movement, availability, and visual representation.
 */
export default class Elevator {
    #finalDestination = 0; // The last floor the elevator was called to
    #availabilityTime = 0; // Time when the elevator will be available (in seconds)
    #elevatorElement: HTMLImageElement; // DOM element representing the elevator
    #timer: NodeJS.Timeout | null = null; // Timer for availability countdown
    
    constructor() {
        this.#elevatorElement = this.createElevator();
    }
   
    /**
     * Creates the elevator DOM element.
     * @returns The created elevator image element
     */
    private createElevator(): HTMLImageElement {
        const elevatorImgElement = document.createElement('img');
        elevatorImgElement.src = ELEVATOR_IMAGE_SRC;
        elevatorImgElement.alt = 'elevator';
        elevatorImgElement.className = 'elevator-image';

        return elevatorImgElement;
    }
    
    public get finalDestination(): number {
        return this.#finalDestination;
    }

    public set finalDestination(floor: number) {
        this.#finalDestination = floor;
    }

    public get availabilityTime(): number {
        return this.#availabilityTime;
    }
    
    public get elevatorElement(): HTMLImageElement {
        return this.#elevatorElement;
    }

    /** 
     * Sets the availability time and manages the countdown timer.
     * @param time - Time in seconds when elevator will be available
     */
    public set availabilityTime(time: number) {
        this.#availabilityTime = time;

        // Clear the existing timer if it's running
        this.stopTimer();

        this.activateTimer();
    }

    /**
     * Moves the elevator to the specified floor.
     * @param floor - The target floor number
     * @param floorsToMove - Number of floors to travel (used for animation)
     */
    public move(floor: number, floorsToMove: number): void {
        const newPosition = floor * FLOOR_HEIGHT;
        this.elevatorElement.style.transform = `translateY(${-newPosition}px)`;
        this.elevatorElement.style.transition = `transform ${SECOND_PER_FLOOR * floorsToMove}s linear`;
    }

    /**
     * Activates the availability countdown timer.
     */
    private activateTimer(): void {
        this.#timer = setInterval(() => {
            if (this.#availabilityTime > 0) {
                this.#availabilityTime -= SECOND_PER_FLOOR;
            } else {
                this.stopTimer();
            }
        }, SECOND_PER_FLOOR_MS);
    }

    /**
     * Stops the availability countdown timer.
     */
    private stopTimer(): void {
        if (this.#timer !== null) {
            clearInterval(this.#timer);
            this.#timer = null;
        }
    }
}
