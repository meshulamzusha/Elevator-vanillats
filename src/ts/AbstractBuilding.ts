import Elevator from "./Elevator";
import Floor from "./Floor";
import IElevatorManager from "./ElevatorManagerInterface";

/**
 * Abstract base class representing a building with elevators and floors.
 * Handles creation of building components and rendering to the DOM. 
 */
export default abstract class AbstractBuilding {
    protected elevators: Elevator[] = [];
    protected floors: Floor[] = [];
    protected manager: IElevatorManager; // The elevator manager responsible for handling calls and managing elevators

    /**
     * Creates a new building instance with specified number of floors and elevators.
     * @param floorsCount - Number of floors in the building (starts from 0 for ground floor) 
     * @param elevatorsCount - Number of elevators in the building
     */
    constructor(protected floorsCount: number, protected elevatorsCount: number) {
        this.createFloors();
        this.createElevators();
        this.manager = this.createManager();
        this.setupSystem();
    }

    /**
     * Abstract method to create an elevator manager.
     * Must be implemented by concrete building classes.
     * @returns An instance of ElevatorManager
     */
    protected abstract createManager(): IElevatorManager;

    /**
     * Sets up the elevator system by adding event listeners to floor buttons.
     */
    private setupSystem(): void {
        this.floors.forEach(floor => {
            floor.addButtonListener(floorNum => {
                this.manager.handleElevatorCall(floorNum);
            });
        });
    }

    /**
     * Creates all floor instances for the building.
     */
    private createFloors(): void {
        for (let i = 0; i <= this.floorsCount; i++) {
            this.floors.push(new Floor(i));
        }
    }

    /**
     * Creates all elevator instances for the building.
     */
    private createElevators(): void {
        for (let i = 0; i < this.elevatorsCount; i++) {
            this.elevators.push(new Elevator());
        }
    }

    /**
     * Renders the building to the DOM by creating and appending floor and elevator elements.
     */
    public render(): void {
        const appElement = document.getElementById("app") as HTMLDivElement;
        if (!appElement) {
            console.error("App element not found");
            return;
        }
        
        // Create and append floors container
        const floorsElement = document.createElement('div');
        floorsElement.className = 'floors-container';

        this.floors.forEach(floor => {
            const floorElement = floor.floorElement;
            floorsElement.appendChild(floorElement);
        });

        // Create and append elevators container
        const elevatorsElement = document.createElement('div');
        elevatorsElement.className = 'elevators-container';

        this.elevators.forEach(elevator => {
            const elevatorElement = elevator.elevatorElement;
            elevatorsElement.appendChild(elevatorElement);
        })

        // Append both containers to the app element
        appElement.appendChild(floorsElement);
        appElement.appendChild(elevatorsElement);
    }
}