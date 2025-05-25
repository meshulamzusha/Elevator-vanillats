import MinWaitingTimeElevatorManager from './MinWaitingTimeElevatorManager';
import AbstractBuilding from './AbstractBuilding';

/**
 * Concrete implementation of an office building with elevator management.
 * 
 * This class as part of the factory method pattern:
 * - Provides the concrete factory method implementation required by AbstractBuilding
 * - Uses the minimum waiting time elevator strategy
 */ 
export default class OfficeBuilding extends AbstractBuilding {
    /**
     * Factory method implementation that creates the elevator manager.
     * This is where the building specifies its preferred elevator management strategy.
     * 
     * @returns A new MinWaitingTimeElevatorManager instance configured with this building's
     *          elevators and floors
     */
    protected createManager(): MinWaitingTimeElevatorManager {
        return new MinWaitingTimeElevatorManager(this.elevators, this.floors);
    }
}
