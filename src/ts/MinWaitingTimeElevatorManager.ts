import Elevator from "./Elevator";
import Floor from "./Floor";
import IElevatorManager from "./ElevatorManagerInterface";
import {
    SECOND_PER_FLOOR,
    ELEVATOR_WAIT_TIME
} from './constants'

/**
 * Elevator manager implementation that selects elevators based on minimum waiting time algorithm.
 * This class implements the IElevatorManager interface, providing concrete implementations for:
 * - handleElevatorCall(): Handling elevator calls from floors
 * - elevatorChoice(): Selecting the optimal elevator
 * 
 * Key responsibilities:
 * - Tracks all elevators and floors in the building
 * - Implements elevator selection logic to minimize passenger waiting time
 * - Handles elevator calls and schedules elevator movements
 */
export default class MinWaitingTimeElevatorManager implements IElevatorManager {
    private elevators: Elevator[] = []; 
    private floors: Floor[] = [];
    
    /**
     * Creates a new MinWaitingTimeElevatorManager instance.
     * @param elevators - Array of elevator instances to manage
     * @param floors - Array of floor instances in the building
     */
    constructor(elevators: Elevator[], floors: Floor[]) {
        this.elevators = elevators;
        this.floors = floors;
    }
    
    /**
     * Selects the optimal elevator to serve a floor call based on minimum total waiting time.
     * The algorithm considers:
     * - Current availability time of each elevator
     * - Time needed to travel to the called floor
     * @param floor - The floor number that called the elevator
     * @returns Index of the selected elevator in the elevators array
     */
    public elevatorChoice = (floor: number): number => {
        
        let closestElevator = -1;
        let minTime = Infinity;
    
        for (let i = 0; i < this.elevators.length; i++) {    
            const time = this.elevators[i].availabilityTime;
            // Calculate the time to reach the floor from the elevator's final destination
            const totalTime = time + Math.abs((floor - this.elevators[i].finalDestination) * SECOND_PER_FLOOR);
            if (totalTime < minTime) {
                minTime = totalTime;
                closestElevator = i;
            }
        }
        return closestElevator;
    }
    
    /**
     * Handles an elevator call from a specific floor (implementation of IElevatorManager interface).
     * The method:
     * 1. Checks if the floor is already being served
     * 2. Selects the optimal elevator
     * 3. Updates the elevator's final destination and availability time
     * 4. Updates the floor's waiting status and arrival time
     * 5. Initiates the elevator movement after calculated delay
     * @param floor - The floor number that called the elevator
     */
    public handleElevatorCall(floor: number): void {
        // Skip if floor is already being served
        if (this.floors[floor].isWaiting || this.elevators.some(elevator => elevator.finalDestination === floor)) {
            return;
        }

        // Select the best elevator
        const elevator = this.elevators[this.elevatorChoice(floor)];

        // Calculate movement parameters
        const currentTime = elevator.availabilityTime;
        const floorsToMove = Math.abs(floor - elevator.finalDestination); 
        const updateTime = currentTime + (floorsToMove * SECOND_PER_FLOOR);

        // Update elevator fields
        elevator.availabilityTime = updateTime + ELEVATOR_WAIT_TIME;
        elevator.finalDestination = floor;
        
        // Update floor fields
        this.floors[floor].arrivalTime = updateTime;
        this.floors[floor].isWaiting = true;
        
        // Call the elevator's move method after the calculated delay
        setTimeout(() => {
            elevator.move(floor, floorsToMove);
        }, currentTime * 1000); // convert to milliseconds
    }
}